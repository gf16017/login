FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Instalar dependencias necesarias
RUN apk add --no-cache curl

COPY .mvn/ .mvn
COPY mvnw pom.xml ./

RUN ./mvnw dependency:go-offline

COPY src ./src

RUN ./mvnw package -DskipTests

EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["java", "-jar", "target/login-0.0.1-SNAPSHOT.jar"] 