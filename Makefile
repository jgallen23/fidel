boosh:
	./node_modules/.bin/smoosh make ./build.json
	docco examples/flickr/flickr.js
	cp dist/fidel.js examples/todo/vendor/
	cp dist/fidel.js examples/flickr/

# requires npm >= 1.0.0
install:
	npm install smoosh
