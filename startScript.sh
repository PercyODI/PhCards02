#!/bin/bash

startMongo() {
	if ! docker run -td -p 27017:27017 --name mongo mongo; then
		if ! docker start mongo; then
			echo "Could not start mongo. Please look into the issue" >&2
			exit 1
		fi
	fi
	return 0
}

# Check that the mongo container is running
if ! docker top mongo &>/dev/null 
	then
		echo "Mongo is not running or is not named 'mongo'. Please start Mongo container. "
		read -p "Would you like to start a Mongo container? (y|n)" yn
		case $yn in
			[Yy]* ) startMongo;;
			[Nn]* ) exit;;
		esac
fi

echo "Mongo is running. Continuing..."

# if docker top phcards02 &>/dev/null
# 	then
# 		echo "phcards02 already running. Stopping and removing"
# 		docker stop phcards02
# 		docker rm phcards02
# fi

echo "Stopping and removing any previous phcards02 containers"
docker stop phcards02
docker rm phcards02

echo "Rebuilding phcards02:local"
docker build -t phcards02:local .

echo "Running phcards02:local image"
docker run -td \
	-p 3456:3456 \
	-p 3000:3000 \
	--link mongo:mongo \
	--name phcards02 \
	phcards02:local