# Etapa 1: Construcción (Build)
FROM node:20-alpine AS build

WORKDIR /app

# Copiar archivos de dependencias e instalarlas
COPY package*.json ./
RUN npm install

# Copiar el código fuente y compilar para producción
COPY . .
RUN npm run build -- --configuration production

# Etapa 2: Servidor web (Nginx)
FROM nginx/nginx-unprivileged:alpine

# Copiar la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf


# Copiar los archivos compilados desde la etapa anterior
# NOTA: En Angular 17+, la salida suele estar en dist/nombre-proyecto/browser
COPY --from=build /app/dist/first-angular-app/browser /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Verificar cada 30s que Nginx responde correctamente
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/ || exit 1
  
CMD ["nginx", "-g", "daemon off;"]