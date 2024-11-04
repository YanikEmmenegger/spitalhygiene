# Stage 1: Build the Vite/React app
FROM node:18-alpine

WORKDIR /app

COPY ./react/package*.json ./
RUN npm install

COPY ./react .
RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview"]
