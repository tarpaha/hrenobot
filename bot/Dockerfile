FROM node:alpine
USER node
WORKDIR /home/node
COPY --chown=node:node package*.json ./
RUN npm install --production
COPY . .
CMD [ "node", "start.js" ]