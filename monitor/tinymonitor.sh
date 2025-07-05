#!/bin/bash

getProcInfo() {
	# Запрос процессов
	ps -Ao pid,rss,vsz,%mem,%cpu,cmd --sort=-%mem | head -n 6 | \
	awk -v date="$date" -v time="$time" -v mmc="$max_map_count" -v balloon="$balloon" '
	BEGIN { OFS="|" }
	NR > 1 {
		pid=$1
		cmd=$6
		# Получение числа MAPS для процесса
		"wc -l < /proc/"pid"/maps" | getline maps
		close("wc -l < /proc/"pid"/maps")
		print NR-1, date, time, pid, int($2/1024), int($3/1024), $4, $5, cmd, mmc, maps, balloon
	}'

}


getContainerInfo() {

	docker ps -a --format "{{.Names}}" | while IFS= read -r line; do
	  # Действия со строкой $line
	  echo "Обработка строки: $line"
	  name = $line
	#  docker top $line | awk 'NR > 1 {print $0}'
	  
	  docker top $line | while IFS= read -r line; do
		((i++))
		if [[ $i -eq 1 ]]; then
			continue
		fi
	#	echo $line | awk '{print $2}'
		ps -p $(echo $line | awk '{print $2}') -o pid,rss,vsz,%mem,%cpu --sort=-%mem | awk -v name="${name}" 'NR > 1 {print $0, name}'
	  done;

	done; 
}

export READLINK=$(readlink -f "$0")
export SCRIPT_DIR=$(dirname "${READLINK}")
export SCRIPT_NAME=$(basename "${READLINK}")
echo "Readlink: ${READLINK}"
echo "SCRIPT_DIR: ${SCRIPT_DIR}"
echo "Script name: ${SCRIPT_NAME}"

source ${SCRIPT_DIR}/utils/header.sh

user="$(whoami)"
host="$(hostname)"
time="$(date '+%H:%M:%S')"
date="$(date '+%Y-%m-%d')"
logname="${date}_${host}_tinymonitor.csv"
basedir="/home/${user}/memory_monitor"
logdir="$basedir/logs"
outfile="$logdir/$logname"
max_map_count=$(< /proc/sys/vm/max_map_count)
balloon="$(vmware-toolbox-cmd stat balloon 2>/dev/null || echo "N/A")"




mkdir -p "$logdir"

# Добавить заголовок, если файла нет
if [ ! -e "$outfile" ]; then
    echo "NUM|DATE|TIME|PID|RSS(MB)|VSZ(MB)|%MEM|%CPU|CMD|MAXMAPCOUNT|MAPS|BALLOON" >> "$outfile"
fi