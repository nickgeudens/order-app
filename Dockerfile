# FROM --platform=linux/amd64 node:23-alpine AS builder

# WORKDIR /app

# COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
# RUN rm -rf node_modules package-lock.json && npm install

# COPY . .

# RUN npm run build

FROM --platform=linux/amd64 nginx:alpine

#COPY --from=builder /app/dist /usr/share/nginx/html
COPY dist /usr/share/nginx/html
#RUN rm /etc/nginx/conf.d/default.conf
#COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]