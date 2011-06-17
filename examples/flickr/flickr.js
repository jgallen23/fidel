// **FlickrSearch** is a simple web app to show off the powers of **fidel**

// This is how you create a new Fidel Controller 
var FlickrSearch = Fidel.extend({
  // The elements attribute gives you easy access to any of the dom nodes inside of your widget.
  // You now have access to `this.searchBox` and `this.photos` anywhere inside your code.
  elements: {
    'searchBox': '.searchBox input',
    'photos': '.photos'
  },
  // Events will automatically bind and proxy a selector to a function in your controller.  In this case, every time you hit a key inside the search box, the function `createOnEnter` is called
  events: {
    'keypress .searchBox input': 'createOnEnter'
  },
  // If you load **str.js** (inside ender in this case) along with fidel, you are able to directly render out a javascript template.  The first step to get this working is setting the `templateSelector` to your javascript template in your markup.
  templateSelector: "#PhotoTemplate",
  // init gets called when you call `new FlickrSearch()`.  In this case, the object that was passed was `{ el: $("#FlickrSearch"), initialSearch: 'kitten' }`.  This will set the element for the controller to the #FlickrSearch node and set `this.initialSearch` to kitten. 
  init: function() {
    //Check if initialSearch was passed in
    if (this.initialSearch)
      //If it was, call our search function
      this.search(this.initialSearch);
  },
  // `createOnEnter` gets called whenever a key is pressed on the search box.
  createOnEnter: function(e) {
    //Check if enter was pressed, otherwise don't do anything
    if (e.keyCode != 13) return;
    //Grab the value from the search box, using `this.searchBox` which maps to `.searchBox input` - defined above in the elements attribute.
    var query = this.searchBox[0].value;
    //Execute another method in our controller to execute the search.
    this.search(query);
  },
  search: function(query) {
    var self = this;
    //Set the value of the search box to the search term.  This is for if `this.search()` is called directly, without actually typing in the search box.
    this.searchBox[0].value = query;
    //Give the user some input that things are happening.
    this.photos.html("<div class='loading'>Searching Flickr...</div>");
    //Make a jsonp request out to flickr, passing in our query.
    $.ajax({
      url: 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=flickSearch&tags='+escape(query),
      type: 'jsonp',
      success: function(resp) {
        //`self.render` takes a data object and an optional dom node.  This will grab the template defined in `templateSelector`, pass in the data object, execute the template function in str.js and then render it to either `this.el` or the element passed in.  In this case `self.photos` is mapped to the `.photos` dom node and the template will be rendered there.
        self.render(resp, self.photos);
        //
      }
    });
  }
});