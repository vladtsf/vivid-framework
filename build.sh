#!/bin/sh
node ./build/builder/build.min.js	\
    -u				\
    -o ./bin/vivid.js		\
    ./build/overall.tpl.js

node ./build/builder/build.js	\
    -o ./bin/vivid.js		\
    ./build/overall.tpl.js