# dockerfile
FROM node:22-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json отдельно, чтобы кэширование было эффективнее
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все исходные файлы
COPY ./src ./src
COPY ./public ./public

# Сборка приложения
RUN npm run build

# Второй этап: Используем меньший образ для конечного окружения
FROM nginx:alpine

# Копируем собранные файлы из предыдущего этапа
COPY --from=build /app/build /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

# Переключаемся на пользователя kekdemo
# USER nginx

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
