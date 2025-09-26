FROM node:lts

USER root

RUN apt-get update && apt-get upgrade -y
RUN apt-get -y install ffmpeg imagemagick webp
RUN rm -rf /var/lib/apt/lists/*

COPY . /spectra-v1
COPY .env.example /spectra-v1/.env
COPY config.json.example /spectra-v1/config.json

WORKDIR /spectra-v1

RUN npm install
RUN npm install ts-node --location=global

EXPOSE 5000

CMD ["npm", "run", "server"]
