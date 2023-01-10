
FROM node AS build
WORKDIR /usr/src/app
COPY . ./
RUN npm install
CMD npm run start
EXPOSE 3000

#=====

# FROM nginx
# COPY --from=build /usr/src/app/build/ /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/nginx.conf
# EXPOSE 8443