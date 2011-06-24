boosh:
	./node_modules/.bin/smoosh make ./build.json
	docco examples/flickr/flickr.js

# requires npm >= 1.0.0
install:
	npm install smoosh
