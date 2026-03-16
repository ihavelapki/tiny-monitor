#!/bin/bash
set -Eeuo pipefail

collect_host_metrics_raw() {

  local balloon
  local mem_total mem_free mem_available buffers cached

  balloon="$(vmware-toolbox-cmd stat balloon 2>/dev/null || printf 'N/A')"

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

  printf '{"timestamp":"%s","host":"%s","metric_type":"host","balloon":"%s","mem_total":"%s","mem_free":"%s","mem_available":"%s","buffers":"%s","cached":"%s"}\n' \
    "$dt" "$host" "$balloon" "$mem_total" "$mem_free" "$mem_available" "$buffers" "$cached"
}

run_host_metrics() {
  local dt="${1:?timestamp is required}"
  local host="${2:?host is required}"
  local log_file="${3:?log file is required}"

  collect_host_metrics_raw | serialize_host_metrics_jsonl "$dt" "$host" >> "$log_file"
}