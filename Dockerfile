# base image - какой образ будет базовым. The FROM instruction specifies the Parent Image from which you are building
FROM node:latest

#make dir volume
#RUN mkdir/app

#add all data to volume docker
#ADD . /app

#WORKDIR /app - инструккция запуска программы при старте контейнера
#CMD node server.js --bind 0.0.0.0:#PORT

#RUN console.log("RUNING......")