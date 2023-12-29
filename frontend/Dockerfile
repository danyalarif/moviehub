# Stage 1
FROM node:14 as build-stage

WORKDIR /moviehub-ui
COPY package.json .
RUN npm install
COPY . .

RUN npm run build

# Stage 2
FROM nginx:1.17.0-alpine

COPY --from=build-stage /frontend/build /usr/share/nginx/html
EXPOSE 80

CMD nginx -g 'daemon off;'