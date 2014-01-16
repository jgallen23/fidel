# Fidel
----

Fidel is a simple controller for all of your javascript widgets. It is inspired from spine.js and backbone.js, but without any of the model/route stuff.

It provides you some common features that you often need when you're creating a jQuery Plugin.

## Creating your own Fidel plugin

In order to create your plugin, you have to `define` it first, like this:

	var Modal = fidel.define('modal', {
		... your code here ...
	});

Once that's done, you now can instantiate it with the returned class (`Modal` in the example) or use the `modules` object of Fidel:

	// Init class by var - JS Style
	var modal = new Modal({ el, options });
	
	// Or init class from views object - JS Style
	var modal = new fidel.views.modal({ el, options });
	
If you included the optional `jquery.fidel.js`