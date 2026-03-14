#!/bin/bash
set -Eeuo pipefail

start_time=$(date +%s.%N)
user="$(whoami)"
host="$(hostname)"
date="$(date '+%Y-%m-%d')"
time="$(date '+%H:%M:%S')"
logdir="/opt/rtl/var/log/tinymonitor"

# ******* PROC ************************************************************************************************
## ------------------------------------ main function ---------------------------------------------------------
getProcesesInfo() {
    local CNT=$1
    ps -Ao pid,ppid,rss,vsz,%mem,%cpu,cmd --sort=-%mem | head -n $CNT
}
## ------------------------------------- output parameters ----------------------------------------------------
PROC_OUTPUT_PARAMS="NUM|DATE|TIME|HOST|PID|PPID|RSS(MB)|VSZ(MB)|MEM|CPU|MMC|MAPS|CMD"

## ------------------------------------ awk scripts -----------------------------------------------------------
proc_awk_to_csv='{if (NR > 1) {"wc -l < /proc/"$1"/maps" | getline map; close("wc -l < /proc/"$1"/maps"); printf "%3d|%s|%s|%s|%s|%s|%d|%d|%s|%s|%s|%s|%s\n", NR-1, date, time, host, $1, $2, $3/1024, $4/1024, $5, $6, mmc, map, $7 }}'

proc_awk_to_json='{if (NR > 1) {"wc -l < /proc/"$1"/maps" | getline map; close("wc -l < /proc/"$1"/maps"); printf "{\"N\":\"%3d\",\"DATE\":\"%s\",\"TIME\":\"%s\",\"HOST\":\"%s\",\"PID\":\"%s\",\"PPID\":\"%s\",\"RSS\":\"%d\",\"VSZ\":\"%d\",\"MEM\":\"%s\",\"CPU\":\"%s\",\"MAXMAPCOUNT\":\"%s\",\"MAPS\":\"%s\",\"CMD\":\"%s\"}\n", NR-1, date, time, host, $1, $2, int($3/1024), int($4/1024), $5, $6, mmc, map, $7 $8 $9 $10}}'


# ******* SERV ************************************************************************************************
## ------------------------------------ main function ---------------------------------------------------------
## ------------------------------------- output parameters ----------------------------------------------------
SERV_OUTPUT_PARAMS="NUM|DATE|TIME|HOST|MemTotal|MemFree|MemAvailable|Buffers|Cached|CPU|BALLOON"
## ------------------------------------ awk scripts -----------------------------------------------------------
serv_awk_to_csv='{printf "%s|%s|%s|%s|%s|%s|%d|%d|%s|%s|%s|%s|%s|%s\n", NR-1, date, time, host, $1, $2, $3/1024, $4/1024, $5, $6, mmc, map, balloon, $7}'

serv_awk_to_json='{printf "{\"N\":\"%s\",\"DATE\":\"%s\",\"TIME\":\"%s\",\"HOST\":\"%s\",\"BALLOON\":\"%s\",\"MemTotal\":\"%s\",\"MemFree\":\"%s\",\"MemAvailable\":\"%s\",\"Buffers\":\"%s\",\"Cached\":\"%s\"}\n", NR, date, time, host, balloon, int($1/1024), int($2/1024), int($3/1024), int($4/1024), int($5/1024)}'


# ******* DCKR ************************************************************************************************
## ------------------------------------- output parameters ----------------------------------------------------
getContainerInfo() {
  docker ps --format "{{.Names}}" | while IFS= read -r name; do
    docker top "$name" 2>/dev/null | tail -n +2 | while IFS= read -r line; do
      pid=$(echo "$line" | awk '{print $2}')
      ps -p "$pid" -o pid,ppid,rss,vsz,%mem,%cpu --sort=-%mem | awk -v name="$name" 'NR > 1 {print $0, name}'
    done
  done
}

getContainerInfo() {
  ps --ppid 1 -f | grep /usr/bin/containerd-shim-runc-v2 | awk '{print $2}' | while IFS= read -r pid; do 
  # echo $pid
    ps --ppid "${pid}" -o pid,ppid,%mem,%cpu,cmd | tail -n +2
  done
}
# ------------------------------------ awk scripts -----------------------------------------------------------
awk_to_csv='{ printf "%3d|%s|%s|%s|%s|%d|%d|%s|%s|%s|%s\n", NR, $1, $2, date, time, $3/1024, $4/1024, $5, $6, mmc, balloon, $7 }'

awk_test='{printf "%3d | PID: %s | RSS: %4dMB | VSZ: %4dMB | MEM: %s%% | CPU: %s%% | CONTAINER: %s\n", NR, $1, int($2/1024), int($3/1024), $4, $5, $6 }'



# START SCRIPT ************************************************************************************************
## ------------------------------------ setup default parameters ----------------------------------------------
PROCESSCOUNT=$(( "${PROCESSCOUNT:-10}"+1 ))
TESTRUN="${TESTRUN:-false}"
OUTTYPE="${OUTTYPE:-json}"
if [ "$OUTTYPE" = "csv" ]; then
  serv_awk_script="${serv_awk_to_csv}"
  proc_awk_script="${proc_awk_to_csv}"
  dckr_awk_script="${dckr_awk_to_csv}"
  proc_logname="${date}_${host}_proc.csv"
  serv_logname="${date}_${host}_serv.csv"
  dckr_logname="${date}_${host}_dckr.csv"
else
  serv_awk_script="${serv_awk_to_json}"
  proc_awk_script="${proc_awk_to_json}"
  dckr_awk_script="${dckr_awk_to_json}"
  proc_logname="${date}_${host}_proc.json"
  serv_logname="${date}_${host}_serv.json"
  dckr_logname="${date}_${host}_dckr.json"
fi

## ------------------------------------ setup variables -------------------------------------------------------

mmc=$(< /proc/sys/vm/max_map_count)
balloon="$(vmware-toolbox-cmd stat balloon 2>/dev/null || echo "N/A")"
MemTotal=$(cat /proc/meminfo | grep -E "^MemTotal" | tr -s " " | cut -d " " -f2)
MemFree=$(cat /proc/meminfo | grep -E "^MemFree" | tr -s " " | cut -d " " -f2)
MemAvailable=$(cat /proc/meminfo | grep -E "^MemAvailable" | tr -s " " | cut -d " " -f2)
Buffers=$(cat /proc/meminfo | grep -E "^Buffers" | tr -s " " | cut -d " " -f2)
Cached=$(cat /proc/meminfo | grep -E "^Cached" | tr -s " " | cut -d " " -f2)


if [ "$TESTRUN" = "true" ]; then
  mid_time=$(date +%s.%N)
  elapsed=$(echo "($mid_time - $start_time) * 1000" | bc)
  echo "Операция заняла ${elapsed} мс"
  echo -e "${user}\n${host}\n${logname}\n${basedir}\n${logdir}\n${outfile}\n"	

  echo "${OUTPUT_PARAMS}" 
  
  getProcesesInfo $PROCESSCOUNT | awk -v date="$date" -v time="$time" -v mmc="$mmc" -v host="$host" "$awk_script"
  end_time=$(date +%s.%N)
  elapsed=$(echo "($end_time - $mid_time) * 1000" | bc)
  echo "Операция заняла ${elapsed} мс"
else
  mkdir -p "$logdir"
  if [[ "$OUTTYPE" = "csv" ]]; then
    if [[ ! -f "$logdir/$proc_logname" ]]; then
      echo "${PROC_OUTPUT_PARAMS}" >> "$logdir/$proc_logname"
    fi
    if [[ ! -f "$logdir/$serv_logname" ]]; then
      echo "${SERV_OUTPUT_PARAMS}" >> "$logdir/$serv_logname"
    fi
    if [[ ! -f "$logdir/$dckr_logname" ]]; then
      echo "${DCKR_OUTPUT_PARAMS}" >> "$logdir/$dckr_logname"
    fi
  fi
  getProcesesInfo $PROCESSCOUNT | awk -v date="$date" -v time="$time" -v mmc="$mmc" -v host="$host" "$proc_awk_script" >> "$logdir/$proc_logname"
  echo "$MemTotal $MemFree $MemAvailable $Buffers $Cached" | awk -v date="$date" -v time="$time" -v host="$host" -v balloon="$balloon" "$serv_awk_script" >> "$logdir/$serv_logname"
fi