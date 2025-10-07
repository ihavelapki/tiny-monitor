#!/bin/bash

# ------------------------------------- output parameters -----------------------------------------------------
OUTPUT_PARAMS="NUM|DATE|TIME|HOST|MEM|CPU|MMC|MAPS|BALLOON"

## ------------------------------------ awk scripts -----------------------------------------------------------
awk_to_csv='{if (NR > 1) {"wc -l < /proc/"$1"/maps" | getline map; close("wc -l < /proc/"$1"/maps"); printf "%3d|%s|%s|%s|%s|%s|%d|%d|%s|%s|%s|%s|%s|%s\n", NR-1, date, time, host, $1, $2, $3/1024, $4/1024, $5, $6, mmc, map, balloon, $7 }}'

awk_to_json='{if (NR > 1) {"wc -l < /proc/"$1"/maps" | getline map; close("wc -l < /proc/"$1"/maps"); printf "{\"N\":\"%3d\",\"DATE\":\"%s\",\"TIME\":\"%s\",\"HOST\":\"%s\",\"PID\":\"%s\",\"PPID\":\"%s\",\"RSS\":\"%d\",\"VSZ\":\"%d\",\"MEM\":\"%s\",\"CPU\":\"%s\",\"MAXMAPCOUNT\":\"%s\",\"MAPS\":\"%s\",\"BALLOON\":\"%s\",\"CMD\":\"%s\"}\n", NR-1, $1, $2, date, time, host, int($3/1024), int($4/1024), $5, $6, mmc, map,  balloon, $7 }}'

## ------------------------------------ setup default parameters ----------------------------------------------
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
host="$(hostname -f)"
time="$(date '+%H:%M:%S')"
date="$(date '+%Y-%m-%d')"
logname="${date}_${host}_server.csv"
basedir="/home/${user}/tinymonitor"
logdir="$basedir/server"
outfile="$logdir/$logname"
mmc=$(< /proc/sys/vm/max_map_count)
balloon="$(vmware-toolbox-cmd stat balloon 2>/dev/null || echo "N/A")"