# Используем JDK 17 как базовый образ
FROM eclipse-temurin:17-jdk AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы Gradle для кеширования зависимостей
COPY gradle gradle
COPY gradlew .
COPY build.gradle .
COPY settings.gradle .
COPY src src

# Даём права на выполнение Gradle Wrapper
RUN chmod +x ./gradlew

# Устанавливаем кеш для Gradle
ENV GRADLE_USER_HOME /app/.gradle

# Скачиваем зависимости и кешируем их
RUN ./gradlew dependencies --no-daemon

# Собираем Spring Boot-приложение
RUN ./gradlew clean build -x test --no-daemon

# Используем минимальный JRE-образ
FROM eclipse-temurin:17-jre

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем скомпилированный JAR-файл из предыдущего этапа
COPY --from=build /app/build/libs/*.jar app.jar

# Открываем порт 8080
EXPOSE 8080

# Запускаем Spring Boot
CMD ["java", "-jar", "app.jar"]
