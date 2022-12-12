#stage 1
FROM node:lts-alpine as node
WORKDIR /frontend/angular
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

#stage 2
FROM nginx:stable
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=node /frontend/angular/dist/eface /usr/share/nginx/html