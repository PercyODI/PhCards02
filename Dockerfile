FROM node:7.4
MAINTAINER Pearse Hutson

EXPOSE 3456
EXPOSE 27017

RUN mkdir /node/
WORKDIR /node/

# Add package.json and run npm install 
## Server Package
WORKDIR /node/server/
COPY server/package.json /node/server/package.json
RUN npm install

## Client Package
WORKDIR /node/client/
COPY client/package.json /node/client/package.json
RUN npm install

# Add rest of folder to /node
COPY . /node

WORKDIR /node/server/
CMD ["node", "app.js"]
#CMD ["bash"]