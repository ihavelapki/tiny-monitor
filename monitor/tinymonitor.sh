#!/bin/bash
#!/bin/bash
set -Eeuo pipefail

readonly SCRIPT_VERSION="1.0.0"
SCRIPT_PATH="$(readlink -f "${BASH_SOURCE[0]}")"
SCRIPT_NAME="$(basename "$SCRIPT_PATH")"

readonly PROJECT_LIB="/usr/local/lib/${SCRIPT_NAME}"

source "${PROJECT_LIB}/header.sh"
source "${PROJECT_LIB}/dockermonitor.sh"
source "${PROJECT_LIB}/processmonitor.sh"
source "${PROJECT_LIB}/servermonitor.sh"



#
## ------------------------------------ setup variables -------------------------------------------------------


main() {
    start_time=$(date +%s.%N)
    user="$(whoami)"
    host="$(hostname)"
    date="$(date '+%Y-%m-%d')"
    time="$(date '+%H:%M:%S')"
    logdir="/opt/rtl/var/log/tinymonitor"
    # Create log directory if it doesn't exist

    parse_args "$@"
    validate_args
    mkdir -p "$logdir"

    # Get server info
    getServerInfo

    # Get process info (top 10)
    getProcesesInfo 10

    # Get container info
    getContainerInfo
}

main "$@"