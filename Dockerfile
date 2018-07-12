FROM node:carbon-slim

RUN apt-get update && \
    apt-get install -y sqlite3

RUN mkdir /app
WORKDIR /app

COPY . .

RUN cd databases && \
    bash init.sh && \
    cd ..

RUN npm install -g pm2 && \
    npm install && \
    npm run build

EXPOSE 3000

CMD ["pm2-docker", "bin/www"]