# backend/Dockerfile
FROM maven:3.9.4-eclipse-temurin-17-alpine

WORKDIR /app

COPY pom.xml ./
COPY src ./src

EXPOSE 8081

CMD ["mvn", "spring-boot:run"]