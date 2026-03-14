#!/bin/bash

ACTION=""
ENTITY=""
SHOW_HELP=0
SHOW_VERSION=0
LOG_FILE=""
ENV_FILE=""

usage() {
  cat <<'EOF'
Usage:
  tinymonitor [options]
  tinymonitor -h | --help
  tinymonitor -v | --version

Examples:
  tinymonitor --help
  tinymonitor --version
  tinymonitor --env-file .env
  tinymonitor --log-file app.log --env-file .env

Options:
  -h, --help              Show help
  -v, --version           Show version
  -f <logfile>            Path to log file
  --env-file <path>       Path to .env file
  --cnt-proc <number>     Number of processes to monitor (default: 10)
  --dry-run, -C           Run in dry-run mode (no changes made)
  --log-level <level>     Set log level (default: ERROR)
EOF
}

print_version() {
  printf '%s\n' "$SCRIPT_VERSION"
}
timestamp() {
  date '+%Y-%m-%d %H:%M:%S'
}

log() {
  local level="$1"
  shift

  printf '[ %s ][ %-5s ] %s\n' \
    "$(timestamp)" \
    "$level" \
    "$*"
}

log_info() {
  log INFO "$@"
}

log_warn() {
  log WARN "$@"
}

log_error() {
  log ERROR "$@" >&2
}

die() {
  log_error "$@"
  exit 1
}

parse_args() {
  LOG_FILE=""
  ENV_FILE=""
  SHOW_HELP=0
  SHOW_VERSION=0

  # 1. Если аргументов нет вообще
  if [[ "$#" -eq 0 ]]; then
    usage >&2
    die "action and entity are required"
  fi

  # 2. Глобальные флаги без action/entity
  case "${1:-}" in
    -h|--help)
      SHOW_HELP=1
      return 0
      ;;
    -v|--version)
      SHOW_VERSION=1
      return 0
      ;;
  esac

  # 3. Разбираем опции
  while [[ "$#" -gt 0 ]]; do
    case "$1" in
      -h|--help)
        SHOW_HELP=1
        shift
        ;;
      -v|--version)
        SHOW_VERSION=1
        shift
        ;;
      -f|--log-file)
        [[ "$#" -ge 2 ]] || die "option -f requires an argument"
        LOG_FILE="$2"
        shift 2
        ;;
      --env-file)
        [[ "$#" -ge 2 ]] || die "option --env-file requires an argument"
        ENV_FILE="$2"
        shift 2
        ;;
      --cnt-proc)
        [[ "$#" -ge 2 ]] || die "option --cnt-proc requires an argument"
        CNT_PROC="${2:-10}"
        shift 2
        ;;
      --dry-run|-C)
        DRY_RUN=1
        shift
        ;;
      --log-level)
        [[ "$#" -ge 2 ]] || die "option --log-level requires an argument"
        LOG_LEVEL="${2:-ERROR}"
        shift 2
        ;;
      *)
        die "unknown argument: $1"
        ;;
    esac
  done
}

validate_args() {
  if [[ "$SHOW_HELP" -eq 1 ]]; then
    usage
    exit 0
  fi

  if [[ "$SHOW_VERSION" -eq 1 ]]; then
    print_version
    exit 0
  fi
}

load_env_file() {
  local env_file="$1"

  if [[ -f "$env_file" ]]; then 
    log_info "Loading env file: $env_file"
    source "$env_file"

    ENVABS="$(realpath "$env_file")"
    export ENVABS

    log_info "Loaded env file: $ENVABS"
  else
    log_warn ".env file not found at: $env_file"
  fi
  
}
