FROM node:alpine
USER node
WORKDIR /home/node
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 8000
CMD [ "node", "server.js" ]