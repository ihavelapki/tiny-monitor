#!/bin/bash
set -Eeuo pipefail

readonly SCRIPT_VERSION="1.0.0"
SCRIPT_PATH="$(readlink -f "${BASH_SOURCE[0]}")"
SCRIPT_NAME="$(basename "$SCRIPT_PATH")"

readonly PROJECT_LIB="/usr/local/lib/${SCRIPT_NAME}"

source "${PROJECT_LIB}/header.sh"
source "${PROJECT_LIB}/hostmonitor.sh"
source "${PROJECT_LIB}/procmonitor.sh"

# -------------------------------------------------------------------------------
main() {
    start_time=$(date +%s.%N)
    user="$(whoami)"
    home="$(eval echo "~$user")"
    dt="$(timestamp)"
    date="$(date '+%Y%m%d')"
    host="$(hostname -f)"
    logdir="${home}/tinymonitor/logs"

    # Create log directory if it doesn't exist
    mkdir -p "$logdir"

    parse_args "$@"
    validate_args
    load_env_file

    # Get server info
    run_host_metrics "$dt" "$host" "$logdir/$date-$host-host.jsonl"

    # Get process info (top 10)
    run_process_metrics "$dt" "$host" "$CNT_PROC" "$logdir/$date-$host-process.jsonl"

    # Get container info
    # getContainerInfo
    end_time=$(date +%s.%N)
    elapsed=$(echo "($end_time - $start_time) * 1000" | bc)
    log_debug "Metrics collected in ${elapsed} ms"
}

main "$@"