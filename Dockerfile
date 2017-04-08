FROM node

ADD . /app

WORKDIR /app

RUN  npm install

EXPOSE 3000

CMD ["./node_modules/nodemon/bin/nodemon.js", "./src/index.js", "-L"]
