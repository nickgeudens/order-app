# FROM node:24-slim AS builder
# WORKDIR /app
# ENV CI=true
# COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
# RUN npm ci || npm install
# COPY . . 
# RUN npm run build --verbose
FROM --platform=linux/amd64 nginx:alpine

#COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./dist/* /usr/share/nginx/html


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]