
FROM node AS build
WORKDIR /usr/src/app
COPY . ./
RUN npm install
RUN npm run build

#=====

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /usr/src/app/build ./
EXPOSE 4002
CMD npm start