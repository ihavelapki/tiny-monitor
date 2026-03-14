#!/bin/bash
set -Eeuo pipefail

collect_process_metrics_raw() {
    local cnt="${1:?process count is required}"
    local awk_script='BEGIN { OFS="\t" } {print NR, $1, $2, $3, $4, $5, $6, $7}'

    case "$cnt" in
        ''|*[!0-9]*)
            die "process count must be a positive integer"
            ;;
    esac

    [ "$cnt" -gt 0 ] || {
        die "process count must be greater than 0"
    }

    ps -Ao pid=,ppid=,rss=,vsz=,pmem=,pcpu=,comm= --sort=-pmem \
      | head -n "$cnt" \
      | awk "$awk_script"
}

serialize_process_metrics_jsonl() {
    local dt="${1:?timestamp is required}"
    local host="${2:?host is required}"

    while IFS=$'\t' read -r rank pid ppid rss_kb vsz_kb mem_percent cpu_percent command; do
        printf '{"rank":"%s","timestamp":"%s","host":"%s","metric_type":"process","pid":"%s","ppid":"%s","rss_kb":"%s","vsz_kb":"%s","mem_percent":"%s","cpu_percent":"%s","command":"%s"}\n' \
            "$rank" "$dt" "$host" "$pid" "$ppid" "$rss_kb" "$vsz_kb" "$mem_percent" "$cpu_percent" "$command"
    done
}

run_process_metrics() {
    local dt="${1:?timestamp is required}"
    local host="${2:?host is required}"
    local cnt_proc="${3:?process count is required}"
    local log_file="${4:?log file is required}"
    
    collect_process_metrics_raw "$cnt_proc" | serialize_process_metrics_jsonl "$dt" "$host" >> "$log_file"
}