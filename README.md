# Fidel
----
Fidel is a simple controller for all of your javascript widgets.  It is inspired from spine.js and backbone.js, but without any of the model/route stuff.

## Flickr Search Example

Here's a simple example of showing what fidel can do:

[Flickr Search](http://jgallen23.github.com/fidel/examples/flickr/index.html) | [Annotated Source](http://jgallen23.github.com/fidel/docs/flickr.html)

## Example

It looks like this:

``` js

var Widget = Fidel.ViewController.extend({
    templateSelector: "#widgetTemplate",
    elements: {
        result: ".result"
    },
    events: {
		"click [data-action='click1']": 'click1',
		"click [data-action='click2']": 'click2'
    },
    init: function(options) {
        console.log("init");
        this.find(".note").html("This is a note");
    },
    click1: function(e) {
        this.render({ val: 'click1' }, this.result);
        this.trigger("click");
    },
    click2: function(e) {
        this.render({ val: 'click2' }, this.result);
        this.trigger("click");
    }
});

var w = new Widget({ el: $("#widget") });
w.bind("click", function() {
    console.log("click was triggered");
});
w.click1();
```

## Constructor
You can pass an object to the constructor to set options for that widget. 

``` js
  var w = new Widget({ el: $("#widget"), dance: true });
  //exposes
  w.el //node
  w.dance //true
```

## Init
Init gets called when you initialize a new Fidel controller. All options are now set, all events have been bound.

## Elements
elements: {} is a helper to define all of the elements in your widget.  

``` js
  elements: { 'test': '.test' }
  //gives you
  this.test //array of all elements with class of test
```

## Find
this.find is a helper function that will search for any node thats inside your parent el.

## Events
events: {} will automatically bind dom events to a function in your Controller.  Syntax is:

``` js
events: {
  'function': 'type selector'
}
```

## Custom Events
you can call trigger and bind to call custom events

## Render
templateSelector, this.render -- more info coming soon

## Support
Fidel needs Ender, jQuery or Zepto to work it's magic.

### Ender
To use with ender just add fidel to your build command:
`ender build scriptjs fidel`
or 
`ender add fidel`

