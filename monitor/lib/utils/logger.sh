timestamp() {
  date '+%Y-%m-%d %H:%M:%S'
}

get_caller() {
  # FUNCNAME[0] = get_caller
  # FUNCNAME[1] = log
  # FUNCNAME[2] = log_debug ...

  if [[ "${#FUNCNAME[@]}" -ge 3 ]]; then
    printf '%s' "${FUNCNAME[3]}"
  else
    printf 'main'
  fi
}

log() {
  local level="$1"
  shift

  local ts
  ts="$(timestamp)"

  if [[ "${DEBUG:-0}" -eq 1 ]]; then
    local caller
    caller="$(get_caller)"

    printf '[ %s ][ %-5s ][ %-16s ] %s\n' \
      "$ts" "$level" "$caller" "$*"
  else
    printf '[ %s ][ %-5s ] %s\n' \
      "$ts" "$level" "$*"
  fi
}

log_debug() {
  case "$LOG_LEVEL" in
    DEBUG)
    log DEBUG "$@"
  esac
}

log_info() {
  case "$LOG_LEVEL" in
    DEBUG|INFO)
    log INFO "$@"
  esac
}

log_warn() {
  case "$LOG_LEVEL" in
    DEBUG|INFO|WARN)
    log WARN "$@"
  esac
}

log_error() {
  log ERROR "$@" >&2
}

die() {
  log_error "$@"
  exit 1
}