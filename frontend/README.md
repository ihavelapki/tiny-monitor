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


## Попросил железный мозг составить для меня план изучения:

📚 План изучения React + TypeScript
2. Основы TypeScript (для React-разработки)
    - Типы примитивов (string, number, boolean, null, undefined).
    - Интерфейсы и типы (interface, type).
    - Массивы и объекты с типами (Array<T>, Record<K,V>).
    - Generics (обобщения).
    - Enum и Union Types ("success" | "error").
    - Optional и Nullable поля (? и | null).
    - Работа с модулями и импортами.

    📌 Мини-задачи:
    - Напиши интерфейс для пользователя.
    - Создай массив пользователей и типизируй его.
    - Опиши функцию с generic, которая возвращает первый элемент массива.

3. Основы React с TypeScript

JSX и компоненты

Функциональные компоненты:
```sh
type Props = { name: string };
function Hello({ name }: Props) {
  return <h1>Hello, {name}</h1>;
}
```

React.FC vs явное объявление типов (лучше без React.FC).

Props и children

Типизация пропсов (Props) и children: React.ReactNode.

Состояние (useState)

const [count, setCount] = useState<number>(0);

События

Типизация событий: React.ChangeEvent<HTMLInputElement>, React.MouseEvent<HTMLButtonElement>.

Условный рендеринг и списки

Ключи (key), типизация массивов.

📌 Мини-задачи:

Сделай компонент Counter с кнопками + и -.

Создай TodoList с интерфейсом Todo { id: number; text: string; done: boolean }.


4. Работа с состоянием

useReducer — типизация действий (Action).

Context API

Создание Context с типизированным value.

Использование createContext<T>() и useContext.

📌 Мини-задача:

Реализуй глобальное хранилище для ThemeContext (light | dark).