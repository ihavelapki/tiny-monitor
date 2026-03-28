# **tiny-monitor agent**

Lightweight shell-based monitoring agent for Linux hosts.

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
{"timestamp":"2026-03-03T23:56:02Z","host":"myhost.domain","balloon":"N/A","max_map_count":"65530","mem_total":"15988","mem_free":"384","mem_available":"5890","buffers":"167","cached":"5538"}
{"timestamp":"2026-03-03T23:57:02Z","host":"myhost.domain","balloon":"N/A","max_map_count":"65530","mem_total":"15988","mem_free":"372","mem_available":"5879","buffers":"167","cached":"5538"}
```
- log for process metrics
```jsonl
{"rank":"1","timestamp":"2026-03-03T23:59:02Z","host":"myhost.domain","pid":"414017","ppid":"413993","rss":"2107","vsz":"14710","mem":"13.1","cpu":"0.7","cmd":"java-1.jar"}
{"rank":"2","timestamp":"2026-03-03T23:59:02Z","host":"myhost.domain","pid":"4002481","ppid":"4002460","rss":"1433","vsz":"9541","mem":"8.9","cpu":"0.5","cmd":"java-2.jar"}
{"rank":"3","timestamp":"2026-03-03T23:59:02Z","host":"myhost.domain","pid":"3138820","ppid":"3138799","rss":"933","vsz":"7827","mem":"5.8","cpu":"1.5","cmd":"java-3.jar"}
```
- log for docker containers metrics
```jsonl
```


### **Logfile name convention**

Log filename pattern consists of three parts: `current date`-`hostname`-`metric type`.jsonl
One file per metric group per day. Files must not mix record types

Where:
- current date is in `YYYYMMDD` format 
- hostname is the result of the `hostname -f` command
- metric type is one of the following values: `process`, `host`, `container`

Examples:
- `20260308-myhost.domain-host.jsonl`
- `20260308-myhost.domain-process.jsonl`
- `20260308-myhost.domain-container.jsonl`


### **Fields names conventions**

Current schema version: `v1`.
- All field names in JSONL records must follow a snake_case naming convention.
- In v1 all fields are are serialized as JSON strings. 
- Changing types will be on backend level
- `timestamps` are strings in "YYYY-mm-dd HH:MM:SS" format
- `n`, `pid`, `ppid`, `max_map_count` are integer-like strings
- `rss`, `vsz`, `mem_total`, `mem_free`, `mem_available`, `buffers`, `cached`, `balloon` are numeric strings in MB unless stated otherwise
- `mem` and `cpu` are numeric strings representing percent values
- missing or unavailable optional values may be represented as `"N/A"`

Is it necessary param?: 
- [x] - yes
- [ ] - no

#### **host metrics**
- [x] `timestamp`: Timestamp of the main call
- [x] `host`: FQDN of the current host
- [x] `metric_type`: Type of metrics file. Always equal `host` in hosts metrics log files
- [x] `mem_free` - necessary: yes, MB
- [x] `mem_total`
- [x] `mem_available`
- [x] `buffers`
- [x] `cached`
- [ ] `max_map_count` - max maps count on the current server
- [ ] `balloon`
- [ ] `virtualization`

#### **process metrics**
- [x] `rank`: ranked row number. rank of the process by mem utility
- [x] `timestamp`: Timestamp of the main call
- [x] `host`: FQDN of the current host
- [x] `metric_type`: Type of metrics file. Always equal `process` in process metrics log files
- [x] `pid` - process pid
- [x] `ppid` - parent process pid
- [x] `rss`
- [x] `vsz`
- [x] `mem`
- [x] `cpu`
- [x] `cmd`

#### **containers metrics**
container metrics not yet defined

## Failure handling

The agent should support partial failure behavior.

Rules for v1:
- failure to collect one optional metric group must not necessarily fail the entire run
- required metric groups and fatal write failures must result in a non-zero exit code
- operational errors must be written to service logs, not to metric files

## Security assumptions

The v1 agent assumes:
- local configuration files are trusted
- metric output files are stored as plaintext
- metric files may contain process names and host identifiers
- debug or operational logs must not contain secrets
- the agent is intended for trusted single-tenant or small-team environments