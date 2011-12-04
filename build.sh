#!/bin/sh
node ./build/builder/build.min.js	\
    -u				\
    -o ./build/vivid.js		\
    ./build/overall.tpl.js

node ./build/builder/build.js	\
    -o ./build/vivid.js		\
    ./build/overall.tpl.js