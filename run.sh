docker build --platform=linux/amd64 -t registry.nas.local/order-app .
docker push registry.nas.local/order-app
docker run --platform=linux/amd64 -ti -p 8080:80 registry.nas.local/order-app
