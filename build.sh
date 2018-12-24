#!/usr/bin/env sh

VERSION="1.0.0"

TAG="trello-agg:$VERSION"

function build() {
	echo "build typescript"
	npm run build
	echo "docker build -t $TAG ."
	docker build -t $TAG .
}

function push() {
	echo "docker push $TAG"
	docker push $TAG
}


function help() {
	echo "./build.sh  build" 
	echo "./build.sh  push"
	echo "./build.sh  buildAndPush/bap  build and push"
}

function main() {
	if [ $# -lt 1 ]; then
		help
	elif [ $1 = "build" ]; then
		build
	elif [ $1 = "push" ]; then
		push
	elif [ $1 = "buildAndPush" ] || [ $1 = "bap" ]; then
		build && push
	fi
}

main $@