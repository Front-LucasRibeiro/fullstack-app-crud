# Stage 1: Desenvolvimento
FROM node:20-alpine AS development
WORKDIR /app
COPY ./package*.json ./
RUN npm install --production
COPY ./ ./ 
EXPOSE 3000
CMD ["npm", "run", "start:dev"]

# Stage 2: Produção (imagem otimizada)
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=development /app/node_modules ./node_modules 
COPY ./dist ./dist
RUN apt-get update && apt-get install -y nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx/ /usr/share/nginx/html
USER node
EXPOSE 3001
CMD ["nginx", "-g", "daemon off;"] 