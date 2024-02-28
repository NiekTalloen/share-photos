#!/bin/zsh

docker build . --no-cache --tag wedding-photo:0.0.1
docker run -p 3000:3000 -e ORIGIN=http://localhost:3000 -e BODY_SIZE_LIMIT=1000000000 -e UPLOAD_FOLDER=/upload -v /Users/stijnhooft/app/wedding-photos:/upload wedding-photo:0.0.1
