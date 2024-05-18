# Stage 1: Desenvolvimento
FROM node:20-alpine AS development
WORKDIR /app
COPY ./package*.json ./
RUN apk add --no-cache python3 
RUN npm ci 
COPY ./ ./ 
EXPOSE 8080
CMD ["npm", "run", "dev"]

# Stage 2: Produção (imagem otimizada)
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=development /app/node_modules ./node_modules
COPY ./dist ./dist 
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx/ /usr/share/nginx/html
RUN apt-get update && apt-get install -y nginx
USER node
EXPOSE 80 
CMD ["nginx", "-g", "daemon off;"]