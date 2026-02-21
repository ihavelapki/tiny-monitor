# Frontend на REACT-TS

Моя нубская шпаргалка, как сделать простой проект на REACT-TS 

## Оглавление





## **Первые шаги:**

- У меня уже есть установленный ранее `node`:
    ```sh
    node -v
    ```
    >v18.15.0


- Установлен тут (через pkg-инсталлятор):
    ```sh
    which node
    ```
    >/usr/local/bin/node

- железный мозг советует переходить на `vite` и `nvm`

### **Установка nvm**
https://github.com/nvm-sh/nvm?tab=readme-ov-file#zsh

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash | tee -a var/log/frontend-`date +%Y%m%d`-`date +%H%M`-nvm-install.log
```
пайп и tee это я добавил, чтобы сохранить лог, того, что я делал

```sh
nvm --version
```
>0.40.3

### **Что теперь делать с nvm?**

- Тут можно проверить lts версию node.js: https://nodejs.org/en/about/previous-releases

**Команды `nvm`**

- `nvm install 22` - установить конкретную версию
- `nvm install --lts` - установить lts версию
- `nvm use 22` - переключиться на Node 22
- `nvm alias default 22` - сделать её версией по умолчанию

**Установка**
- Попробую поставить LTS версию:
```sh
nvm install --lts | tee -a var/log/frontend-`date +%Y%m%d`-`date +%H%M`-install-node-lts.log
```
сразу дефолтной сделалась

- перезагрузим терминал и проверим версию
```sh
which node
```
>/Users/kot/.nvm/versions/node/v22.20.0/bin/node

- после установки в файле `~/.zshrc` появились следующие строки:
```sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

- И версию самого node:
```sh
node -v
v22.20.0
```

### Создадим шаблон проекта
Создаем шаблон проекта используя vite:
```sh
cd frontend
npm create vite@latest showapp -- --template react-ts | tee -a ../var/log/frontend-`date +%Y%m%d`-`date +%H%M`-vite-new-prjt.log
```

>```
> npx
> create-vite showapp --template react-ts
>
>[?25l│
>◆  Use rolldown-vite (Experimental)?:
>│
>└
>[999D[4A[1B[J◇  Use rolldown-vite >(Experimental)?:
>│  No
>[?25h[?25l│
>◆  Install with npm and start now?
>│  ● Yes / ○ No
>└
>[999D[4A[1B[J◇  Install with npm and start now?
>│  Yes
>[?25h│
>◇  Scaffolding project in /Users/kot/Education/>Projects/DevOps/tiny-monitor/frontend/showapp...
>│
>◇  Installing dependencies with npm...
>
>added 188 packages, and audited 189 packages in 8s
>
>47 packages are looking for funding
>  run `npm fund` for details
>
>found 0 vulnerabilities
>│
>◇  Starting dev server...
>
>> showapp@0.0.0 dev
>> vite
>
>
>  VITE v7.1.7  ready in 279 ms
>
>  ➜  Local:   http://localhost:5173/
>  ➜  Network: use --host to expose
>  ➜  press h + enter to show help
>
>  Shortcuts
>  press r + enter to restart the server
>  press u + enter to show server url
>  press o + enter to open in browser
>  press c + enter to clear console
>  press q + enter to quit
>10:43:19 PM [vite] server restarted.
>
>  ➜  Local:   http://localhost:5173/
>  ➜  Network: use --host to expose
>```

### **Получился следующий проект**
```sh
|__showapp
        ├── .gitignore
        ├── README.md
        ├── eslint.config.js
        ├── index.html
        ├── node_modules
        │       ├──...
        │       └──....
        ├── package-lock.json
        ├── package.json
        ├── public
        │       └──vite.svg
        ├── src/
        │       ├──App.css
        │       ├──App.tsx
        │       ├──assets
        │       │       └──react.svg
        │       ├──index.css
        │       └──main.tsx
        ├── tsconfig.app.json
        ├── tsconfig.json
        ├── tsconfig.node.json
        └── vite.config.ts
```

## Переделать проект под FSD:

- Создаем папки и перемещаем файлики:
```sh
cd frontend/showapp
mkdir -p src/app
mkdir -p src/shared/styles
mkdir -p src/pages/Home

git rm -r src/assets/
git mv src/App.tsx src/app 
git mv src/App.css src/shared/styles 
git mv src/index.css src/shared/styles 

touch src/pages/Home/index.tsx
```

- редактируем main.ts
```ts
// меняем это
import './index.css'
import App from './App.tsx'

// на это
import './shared/styles/index.css'
import App from './app/App'
```

- Добавляем в `src/pages/Home/index.tsx`:
```ts
import '../../shared/styles/index.css';

const Homepage = () => {
    return (
        <div>
            <h1>CPU and RAM showpage</h1>
        </div>
    );
};

export default Homepage;
```


- редактируем App.tsx
```ts
// это 
import './App.css'
// на это
import '../shared/styles/App.css'
```

Удаляем всю внутренность внутри return и делаем так:
```ts
  return (
      <Homepage/>  
  )
```

Ненужные импорты удаляем

