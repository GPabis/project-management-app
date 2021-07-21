#/bin/bash

if [[ "$1" == "install" ]]; then
    cd ./frontend
    npm install
    cd ../backend
    npm install
    cd ..
    npm install
fi
