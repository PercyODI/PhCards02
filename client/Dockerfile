FROM node:7.4
MAINTAINER Pearse Hutson

EXPOSE 80

RUN mkdir /node/
WORKDIR /node/

# Add package.json and run npm install 
## Client Package
WORKDIR /node/
COPY package.json /node/package.json
RUN npm install

# Update and install nginx
RUN apt-get update && apt-get install nginx -y
RUN rm -v /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/

# Add rest of folder to /node
COPY . /node

CMD ["nginx", "-g", "daemon off;"]
#CMD ["bash"]