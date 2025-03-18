FROM node:23-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

RUN npm run build

EXPOSE 3000
CMD ["node", "build"]
