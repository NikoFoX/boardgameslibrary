FROM node:14
WORKDIR /usr/src/app
COPY frontend/package*.json ./
RUN npm ci
COPY . .
