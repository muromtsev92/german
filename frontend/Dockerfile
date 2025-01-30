# Используем Node.js 18 как базовый образ для сборки
FROM node:18 AS build-stage

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json, чтобы установить зависимости
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Собираем фронтенд (создаётся папка build/)
RUN npm run build

# Используем минимальный образ Nginx для раздачи фронтенда
FROM nginx:alpine

# Копируем билд из предыдущего шага в папку, откуда Nginx раздаёт файлы
COPY --from=build-stage /app/build /usr/share/nginx/html

# Открываем порт 80 для доступа к фронтенду
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
