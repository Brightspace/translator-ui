#!/bin/bash

set -eu

SERVICE=$1
SHA1=$2

IMAGE=d2lartifacts-docker-dockerv2-local.artifactoryonline.com/foundations-translator/$SERVICE
TAG=$IMAGE:$SHA1

docker build -t $TAG .
docker tag -f $TAG $IMAGE:latest

# Deploy image to Docker Hub
docker push $IMAGE