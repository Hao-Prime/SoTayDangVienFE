# pull the base image
FROM node:14-alpine AS build

# set the working direction
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH


# install app dependencies
COPY package.json ./
COPY package-lock.json ./
# COPY create-env-file.sh ./create-env-file.sh
RUN npm install --legacy-peer-deps 

# ARG REACT_APP_URL_SERVER

# ENV sh create-env-file.sh REACT_APP_URL_SERVER $REACT_APP_URL_SERVER
# add app
COPY . ./
# Build for production.
RUN npm run build
# Install `serve` to run the application.
# RUN npm install -g serve
# # Run application
# # CMD [ "npm", "start" ]
# CMD serve -s build -p 3002
# docker build -t haohi/qldangvien-fe:0.0.12 .
# docker pull haohi/qldangvien:0.0.1
# 
#Test thử
FROM node:14.17.5-alpine
COPY --from=build /app/build ./build
RUN npm install -g serve
# start app
CMD serve -s build -p 3004