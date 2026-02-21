#!/bin/bash

export READLINK=$(readlink -f "$0")
export SCRIPT_DIR=$(dirname "${READLINK}")
echo "Readlink: ${READLINK}"
echo "SCRIPT_DIR: ${SCRIPT_DIR}"

#source ${SCRIPT_DIR}/utils/header.sh
# ------------------------------------- output parameters -----------------------------------------------------
OUTPUT_PARAMS="NUM|DATE|TIME|HOST|PID|PPID|RSS(MB)|VSZ(MB)|MEM|CPU|MMC|MAPS|BALLOON|CMD"

## ------------------------------------ awk scripts -----------------------------------------------------------
awk_to_csv='{if (NR > 1) {"wc -l < /proc/"$1"/maps" | getline map; close("wc -l < /proc/"$1"/maps"); printf "%3d|%s|%s|%s|%s|%s|%d|%d|%s|%s|%s|%s|%s|%s\n", NR-1, date, time, host, $1, $2, $3/1024, $4/1024, $5, $6, mmc, map, balloon, $7 }}'

awk_to_json='{if (NR > 1) {"wc -l < /proc/"$1"/maps" | getline map; close("wc -l < /proc/"$1"/maps"); printf "{\"N\":\"%3d\",\"DATE\":\"%s\",\"TIME\":\"%s\",\"HOST\":\"%s\",\"PID\":\"%s\",\"PPID\":\"%s\",\"RSS\":\"%d\",\"VSZ\":\"%d\",\"MEM\":\"%s\",\"CPU\":\"%s\",\"MAXMAPCOUNT\":\"%s\",\"MAPS\":\"%s\",\"BALLOON\":\"%s\",\"CMD\":\"%s\"}\n", NR-1, $1, $2, date, time, host, int($3/1024), int($4/1024), $5, $6, mmc, map,  balloon, $7 }}'

## ------------------------------------ main function ---------------------------------------------------------
getProcesesInfo() {
    local CNT=$1
    ps -Ao pid,ppid,rss,vsz,%mem,%cpu,cmd --sort=-%mem | head -n $CNT
}

## ------------------------------------ setup default parameters ----------------------------------------------
PROCESSCOUNT=$(( "${PROCESSCOUNT:-10}"+1 ))
TESTRUN="${TESTRUN:-false}"
OUTTYPE="${OUTTYPE:-csv}"
if [ "$OUTTYPE" = "json" ]; then
  awk_script="$awk_to_json"
else
  awk_script="$awk_to_csv"
fi

## ------------------------------------ setup variables -------------------------------------------------------
start_time=$(date +%s.%N)
user="$(whoami)"
host="$(hostname)"
time="$(date '+%H:%M:%S')"
date="$(date '+%Y-%m-%d')"
logname="${date}_${host}_tinymonitor.csv"
basedir="/home/${user}/tinymonitor"
logdir="$basedir/logs"
outfile="$logdir/$logname"
mmc=$(< /proc/sys/vm/max_map_count)
balloon="$(vmware-toolbox-cmd stat balloon 2>/dev/null || echo "N/A")"

if [ "$TESTRUN" = "true" ]; then
  mid_time=$(date +%s.%N)
  elapsed=$(echo "($mid_time - $start_time) * 1000" | bc)
  echo "Операция заняла ${elapsed} мс"
  echo -e "${user}\n${host}\n${logname}\n${basedir}\n${logdir}\n${outfile}\n"	

  echo "${OUTPUT_PARAMS}" 
  
  getProcesesInfo $PROCESSCOUNT | awk -v date="$date" -v time="$time" -v mmc="$mmc" -v balloon="$balloon" -v host="$host" "$awk_script"
  end_time=$(date +%s.%N)
  elapsed=$(echo "($end_time - $mid_time) * 1000" | bc)
  echo "Операция заняла ${elapsed} мс"
else
  mkdir -p "$logdir"
  if [[ "$OUTTYPE" = "csv" && ! -f "$outfile" ]]; then
    echo "${OUTPUT_PARAMS}" >> "$outfile"
  fi
  getProcesesInfo $PROCESSCOUNT | awk -v date="$date" -v time="$time" -v mmc="$mmc" -v balloon="$balloon" -v host="host" "$awk_script" >> "$outfile"
fi