# **tiny-monitor agent**

Lightweight sh-based monitoring agent for Linux hosts.

This component is responsible for:

- collecting host/process/container metrics
- writing metrics to log files in JSON Lines format
- running periodically via systemd service + timer
- serving as a lightweight data source for the central tiny-monitor backend

---

## **Goals**

The agent is designed to be:

- simple to install
- easy to audit
- lightweight in resource usage
- transparent in behavior
- suitable for use in home lab, pet projects, demos, and small production-like environments

This agent is ***not*** intended to replace Prometheus Node Exporter, Telegraf, or other mature monitoring agents in large-scale environments. Its purpose is to provide a small, understandable, hackable monitoring pipeline for learning, portfolio, and practical operational tasks.

---

## **Responsibilities**

The agent performs the following tasks:

1. reads runtime configuration
2. validates environment and dependencies
3. collects metrics from the local host
4. serializes metrics as JSON Lines
5. writes metrics to local log files
6. exits successfully or with a meaningful non-zero exit code

The agent does **not**:

- provide HTTP APIs
- render charts
- aggregate historical data
- store data in a database
- send alerts by itself
- act as a full-featured monitoring platform

---

## **Data format**

The agent writes metrics in **JSON Lines** format.

Rules:

- one line = one JSON object
- file extension should be `.jsonl`
- each record must be valid JSON
- records must be UTF-8 encoded
- each record must contain a timestamp
- field names must be stable and documented

Example:

- log for hosts metrics
```jsonl
{"DT":"2026-03-03T23:56:02Z","HOST":"myhost.domain","BALLOON":"N/A","MMC":"65530","MemTotal":"15988","MemFree":"384","MemAvailable":"5890","Buffers":"167","Cached":"5538"}
{"DT":"2026-03-03T23:57:02Z","HOST":"myhost.domain","BALLOON":"N/A","MMC":"65530","MemTotal":"15988","MemFree":"372","MemAvailable":"5879","Buffers":"167","Cached":"5538"}
```
- log for process metrics
```jsonl
{"N":"1","DT":"2026-03-03T23:59:02Z","HOST":"myhost.domain","PID":"414017","PPID":"413993","RSS":"2107","VSZ":"14710","MEM":"13.1","CPU":"0.7","CMD":"java-1.jar"}
{"N":"2","DT":"2026-03-03T23:59:02Z","HOST":"myhost.domain","PID":"4002481","PPID":"4002460","RSS":"1433","VSZ":"9541","MEM":"8.9","CPU":"0.5","CMD":"java-2.jar"}
{"N":"3","DT":"2026-03-03T23:59:02Z","HOST":"myhost.domain","PID":"3138820","PPID":"3138799","RSS":"933","VSZ":"7827","MEM":"5.8","CPU":"1.5","CMD":"java-3.jar"}
```
- log for docker containers metrics
```jsonl
```