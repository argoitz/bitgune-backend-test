FROM node:18

LABEL version="1.0"
LABEL description="Backend runing on port 3001"
LABEL maintainer=["argoitze@gmail.com"]

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

# ENTRYPOINT ["./startupScript.sh"]

RUN echo "DB POPULATED -> STARTING BACKEND"

CMD ["npm", "start"]