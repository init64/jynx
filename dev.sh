#!/bin/bash

case "$1" in
    "--clean")
        echo "[]" > json/messages.json && echo "{}" > json/users.json
        ;;
    *)
        node index.js &
        gulp
        ;;
esac
