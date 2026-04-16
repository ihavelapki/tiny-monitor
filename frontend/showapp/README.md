# TinyMonitor Frontend

Frontend is part of the TinyMonitor project.  
This is a SPA application on **React+ TypeScript + Vite**, which is being developed as an interface for viewing server monitoring data.

The project is currently at an early stage: the basic application framework, routing, layout with a side menu, several stub pages and reusable UI blocks have already been prepared.

---

## Technology stack

[![Vite][shields-vite-domain]](https://vitejs.dev/) </br>
[![React][shields-react-domain]](https://react.dev/) </br>
[![TypeScript][shields-typescript-domain]](https://www.typescriptlang.org/) </br>
[![React Router][shields-react-router-domain]](https://reactrouter.com/) </br>
[![Feature-Sliced Design][shields-fsd-domain]](https://feature-sliced.design/) </br>

[shields-react-router-domain]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[shields-typescript-domain]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[shields-fsd-domain]: https://img.shields.io/badge/Feature--Sliced-Design?style=for-the-badge&color=F2F2F2&labelColor=262224&logoWidth=10&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAACXBIWXMAAALFAAACxQGJ1n/vAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABISURBVHgB7dKxCQAgDETR0w2cws0cys2cwhEUBbsggikCuVekDHwSQFlYo7Q+8KnmtHdFWMdk2cl5wSsbxGSZw8dm8pX9ZHUTMBUgGU2F718AAAAASUVORK5CYII=
[shields-vite-domain]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[shields-react-domain]: https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB


---
## Current functionality

Implemented at the current stage:

- the basic structure of the SPA;
- layout with side navigation;
- draft pages:
  - Home
  - Metrics
  - Servers
- router with page switching;
- shared pageHeader;
- basic global styles for dashboard layout;
- a prepared structure for further development.

---

## Project structure

```text
src/
  app/
    layouts/
    router/
    App.tsx

  pages/
    home/
    metrics/
    servers/

  widgets/
    navigation/

  shared/
    styles/
    ui/
      page-header/

  main.tsx
```

---

## Architectural approach

The project is developing with a focus on **FSD (Feature-Sliced Design)**.



## Project launch

Installing dependencies:

```sh
npm install
```

Launching the dev server:

```sh
npm run dev
```

Checking with the linter:

```sh
npm run lint
```

Automatic correction of lint comments:

```sh
npm run lint:fix
```

---