#!/bin/bash

REQUIRED_VARS=("CNT")
export READLINK=$(readlink -f "$0")
export SCRIPT_DIR=$(dirname "${READLINK}")
echo "Readlink: ${READLINK}"
echo "SCRIPT_DIR: ${SCRIPT_DIR}"

source ${SCRIPT_DIR}/utils/header.sh
# ------------------------------------- output parameters -----------------------------------------------------
OUTPUT_PARAMS="NUM|DATE|TIME|PID|PPID|RSS(MB)|VSZ(MB)|%MEM|%CPU|CMD|MAXMAPCOUNT|MAPS|BALLOON"

## ------------------------------------ awk scripts -----------------------------------------------------------
awk_to_csv='{{"wc -l < /proc/"$1"/maps" | getline map; close("wc -l < /proc/"$1"/maps"); printf "%3d|%s|%s|%s|%s|%d|%d|%s|%s|%s|%s|%s|%s\n", NR, $1, $2, date, time, $3/1024, $4/1024, $5, $6, mmc, balloon, map, $7 }}'

awk_to_json='{ printf "{\"N\":\"%3d\",\"PID\":\"%s\",\"PPID\":\"%s\",\"DATE\":\"%s\",\"TIME\":\"%s\",\"RSS\":\"%4dMB\",\"VSZ\":\"%4dMB\",\"MEM\":\"%s%%\",\"CPU\":\"%s%%\",\"MAXMAPCOUNT\":\"%s\",\"BALLOON\":\"%s\",\"CONTAINER\":\"%s\"}\n", NR, $1, $2, date, time, int($3/1024), int($4/1024), $5, $6, mmc, balloon, $7 }'


## ------------------------------------ main function ---------------------------------------------------------
getProcesesInfo() {
    local CNT=$1
    ps -Ao pid,ppid,rss,vsz,%mem,%cpu,cmd --sort=-%mem | head -n $CNT
}


## ------------------------------------ setup default parameters ----------------------------------------------
# Добавить заголовок, если файла нет
if [ -z "$OUTTYPE" ]; then
	OUTTYPE="csv"
fi

if [ "$OUTTYPE" = "json" ]; then
  awk_script="$awk_to_json"
else
  if [ ! -e "$outfile" ]; then
    echo "${OUTPUT_PARAMS}" #>> "$outfile"
  fi
  awk_script="$awk_to_csv"
fi

if [ -z "$CNT" ]; then
    CNT=10
fi

TESTRUN="${TESTRUN:-true}"
## ------------------------------------------------------
start_time=$(date +%s.%N)
user="$(whoami)"
host="$(hostname)"
time="$(date '+%H:%M:%S')"
date="$(date '+%Y-%m-%d')"
logname="${date}_${host}_tinymonitor.csv"
basedir="/home/${user}/memory_monitor"
logdir="$basedir/logs"
outfile="$logdir/$logname"
mmc=$(< /proc/sys/vm/max_map_count)
balloon="$(vmware-toolbox-cmd stat balloon 2>/dev/null || echo "N/A")"


if [ "$TESTRUN" = "true" ]; then
  echo "${user}"
  echo "${host}"
  echo "${logname}"
  echo "${basedir}"
  echo "${logdir}"
  echo "${outfile}"
  
  getProcesesInfo $CNT | awk -v date="$date" -v time="$time" -v mmc="$mmc" -v balloon="$balloon" "$awk_script"
  end_time=$(date +%s.%N)
  elapsed=$(echo "($end_time - $start_time) * 1000" | bc)
  echo "Операция заняла ${elapsed} мс"

else
  mkdir -p "$logdir"
  getProcesesInfo $CNT | awk -v date="$date" -v time="$time" -v mmc="$mmc" -v balloon="$balloon" "$awk_script" >> "$outfile"
fi
