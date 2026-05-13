# **tiny-monitor**

## **Table of contents**
- [Intro](#intro)
- [Project Goals](#project-goals)
- [Architecture Overview](#architecture-overview)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Project Status](#project-status)
- [License](#license)
  - [Documentation License](#documentation-license)
  - [Trademark and Branding](#trademark-and-branding)
- [Contributing](#contributing)



## **Intro**

Tinymonitor is a lightweight, educational, and production-oriented monitoring system designed to help understand how observability systems work from the ground up.

The project aims to combine simplicity, transparency, and real-world DevOps practices.

Tinymonitor is not intended to replace Prometheus, Grafana, or full-scale observability platforms.

So this is a small pet project)))

---
---

## **Project Goals**

- Provide a simple monitoring solution for servers and services
- Demonstrate how modern observability systems are built
- Serve as a learning platform for DevOps / SRE engineers
- Be usable in real environments (not just a demo)



## Architecture Overview

TinyMonitor consists of several components:

- **Monitoring-Agent (shell-based)**  
  Collects system metrics (CPU, memory, disk, etc.) and writes them to structured logs

- **Backend (FastAPI)**  
  Processes and serves metrics via API

- **Frontend (React + TypeScript)**  
  Visualizes metrics and provides UI for analysis

- **Storage layer**  
  Currently file-based (JSONL), with potential future extensions



### **Features**

- Lightweight shell agent (no heavy dependencies)
- Structured logging (JSON Lines)
- Simple API for metrics access
- Extensible architecture
- Designed for CI/CD and container environments

---

### **Tech Stack**

- Backend: Python + FastAPI
- Frontend: React + TypeScript + Vite
- Agent: Bash / Shell
- DevOps: Docker, GitHub Actions (planned)
- Storage: JSONL (initially)


### **Project Structure**

```
tinymonitor/
  ├── analysis/
  ├── monitor/
  ├── backend/
  ├── frontend/
  ├── documents/
  └── ...
```


## Getting Started

> Documentation is in progress

Basic steps (will be expanded):

1. Run agent
2. Start backend
3. Open frontend


## **Project Status**

> Work in progress

This project is actively evolving. Breaking changes are expected.

## **License**

TinyMonitor is licensed under the Apache License, Version 2.0.

This means you are free to:
- use the software commercially
- modify and distribute it
- integrate it into your own systems

Under the following conditions:
- you must include the original license
- you must document changes
- you must preserve copyright notices

See the [LICENSE](./LICENSE) file for details.

### **Documentation License**

Documentation is licensed under the Creative Commons Attribution 4.0 International License (CC BY 4.0), unless otherwise stated.
See [LICENSES/CC-BY-4.0.txt](./LICENSES/CC-BY-4.0.txt).


### **Trademark and Branding**

The tinymonitor name, logo, and branding assets are not covered by the Apache-2.0 or CC BY 4.0 licenses.
See [BRANDING.md](./BRANDING.md) for details.

## **Contributing**

Contributions are welcome!

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before submitting a pull request.


---

## Contacts

Maintained by: ihavelapki

---

## Why this project?

TinyMonitor is not just another monitoring tool.

It is:
- a learning platform
- a portfolio-grade system
- a transparent implementation of observability concepts