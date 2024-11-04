# Stage 1: Build the Vite/React app
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy Nginx configuration
#COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy the build output from the first stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 and 443 for HTTP and HTTPS
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
