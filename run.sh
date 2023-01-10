docker build --platform=linux/arm64 -t nickgeudens01/order .
docker push nickgeudens01/order
docker run --platform=linux/arm64 -ti -p 8080:80 nickgeudens01/order
