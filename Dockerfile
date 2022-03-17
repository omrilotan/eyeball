FROM node:16-alpine
WORKDIR /usr/src/app

COPY . .
RUN npm i
RUN npm run build
RUN npm prune --production
ENTRYPOINT [ "npm", "start" ]
