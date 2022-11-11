FROM node:lts-alpine

WORKDIR /back/

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]