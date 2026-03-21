#!/bin/bash
set -Eeuo pipefail

detect_virtualization() {
  systemd-detect-virt 2>/dev/null || printf "unknown"
}

get_balloon() {
  case "$(detect_virtualization)" in
    vmware)
      vmware-toolbox-cmd stat balloon 2>/dev/null || printf "N/A"
      ;;
    *)
      printf "N/A"
      ;;
  esac
}

collect_host_metrics_raw() {

  local balloon
  local mem_total mem_free mem_available buffers cached

  virt=$(detect_virtualization)
  balloon="$(get_balloon)"

  read -r mem_total mem_free mem_available buffers cached < <(
    awk '
      /^MemTotal:/     { mem_total = $2 }
      /^MemFree:/      { mem_free = $2 }
      /^MemAvailable:/ { mem_available = $2 }
      /^Buffers:/      { buffers = $2 }
      /^Cached:/       { cached = $2 }
      END {
        printf "%s %s %s %s %s\n", mem_total, mem_free, mem_available, buffers, cached
      }
    ' /proc/meminfo
  )

  printf '%s\t%s\t%s\t%s\t%s\t%s\n' \
    "$balloon" "$mem_total" "$mem_free" "$mem_available" "$buffers" "$cached"
}

serialize_host_metrics_jsonl() {
  local dt="${1:?timestamp is required}"
  local host="${2:?host is required}"

  local balloon mem_total mem_free mem_available buffers cached

  IFS=$'\t' read -r balloon mem_total mem_free mem_available buffers cached

  printf '{"timestamp":"%s","host":"%s","metric_type":"host","mem_total":"%s","mem_free":"%s","mem_available":"%s","buffers":"%s","cached":"%s","balloon":"%s","virtualization":"%s"}\n' \
    "$dt" "$host" "$mem_total" "$mem_free" "$mem_available" "$buffers" "$cached" "$balloon" "$virt"
}

run_host_metrics() {
  local dt="${1:?timestamp is required}"
  local host="${2:?host is required}"
  local log_file="${3:?log file is required}"

  collect_host_metrics_raw | serialize_host_metrics_jsonl "$dt" "$host" >> "$log_file"
}