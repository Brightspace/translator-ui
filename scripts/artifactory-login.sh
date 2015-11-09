#!/bin/bash

set -eu

USER=$1
PASS=$2
EMAIL=$3

docker login -u $USER -p $PASS -e $EMAIL https://d2lartifacts-docker-dockerv2-local.artifactoryonline.com