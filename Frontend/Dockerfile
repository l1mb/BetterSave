FROM node:18.15.0
WORKDIR /usr/src/frontend
COPY package*.json .
RUN npm ci --force
COPY . .
#EXPOSE 8080
CMD ["npm", "run", "serve-proxy"]
EXPOSE 8080
