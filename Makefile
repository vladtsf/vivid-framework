BUNDLER = vivid-builder

all: vivid.min.js vivid.js

vivid.js:
	vivid-builder ./build/overall.tpl.js -o ./bin/vivid.js

vivid.min.js:
	vivid-builder -u ./build/overall.tpl.js -o ./bin/vivid.js

bundler:
	sudo npm install -g vivid-builder

clean:
	$(RM) ./bin/*.js