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
	
If you included the optional `jquery.fidel.js` file, you can even initialize it in the jQuery way:

	//init via jQuery (must include optional jquery.fidel.js file)
	$().modal({ options });
	
Upon instantiation the property `el` will be set to the element passed.
	
## What does Fidel offers?

Remember that Fidel gives you some structure to base your plugins based on common needs. Let's see what can it do for us!

### Init

If you define an `init` function within your plugin, Fidel will call that function upon instantiation. You normally use that to create some structure, bind some events and get ready.

	var Modal = fidel.define('modal', {
		init: function(){
			this.open = false;
		}
	});
	
First parameter is the name of your plugin, and the second is a plain object with your plugin's code.	
	
### Default values

In order to make your plugin as customisable as possible, you often define some options but you don't want the developer to be providing all possible options with the values, do you? Fidel will handle that:

	var Modal = fidel.define('modal', {
		defaults : {
			overlayOpacity: 1,
			closeOnEsc: true
		}
	});
	
Now, when you instantiate it:

	var modal = new Modal({
		overlayOpacity: 0.5
	});
	
Inside of your plugin functions you can access all those options inside of `this` so, in the previous example:

	this.overlayOpacity; // 0.5 overwritten at instantiation
	this.closeOnEsc; // true which is the default value
	
### Events

In a similar way of Backbone Views, Fidel will bind to events passed within the element you provide on instantiation:

	var Modal = fidel.define('modal', {
		events: {
			'keydown' : 'onKeydown'
		},
		onKeydown : function(){
			// this will be called on keydown
			// I can call this.close() from here!
		},
		close: function(){
		}
	});
	
So, as you can see,	 the key is the **event type** and the value is **the function which will be called**. The scope **will be** mantained so `this` will still be your plugin object.

You can also provide a selector on the event to be matched.

### Destroy

You can destroy an instance of your Fidel plugin by calling `destroy`. This will empty the `el`ement and will also unbind all namespaced events on the element.

If you want to extend the `destroy` actions, you should do something like this:

	var Modal = fidel.define('modal', {
		destroy: function(){
			// additional actions
			Fidel.prototype.destroy.call(this); // Calling to the original method
		}
	});
	
### Data-actions

Fidel allows you to bind actions to clicks

### Convinience methods

| Method        | Description         |
| ------------- |-------------|
| `this.find(value)`   | Is the same as `this.el.find`.
| `this.proxy(function)` | Is a shortcut of using jQuery's proxy passing plugin as `this`.
| `this.on(eventName, function)` | Is a shortcut of using `this.el.on`.
| `this.one(eventName, function)` | Is a shortcut of using `this.el.one`.
| `this.emit(eventName, data, namespaced)` | Is a shortcut of using `this.el.trigger` and allows you to define if the fired event is namespaced or not.
| `this.hide` | This will hide the `el`ement and the defined views as well.
| `this.show` | This will show the `el`ement and the defined views as well.

Note that all event bindings created with these convinience methods are namespaced with `.fidel` and those will be unbinded upon `destroy`.
