var FlickrSearch = Fidel.extend({
  templateSelector: "#PhotoTemplate",
  elements: {
    'searchBox': '.searchBox input',
    'photos': '.photos'
  },
  events: {
    'keypress .searchBox': 'createOnEnter'
  },
  init: function() {
  },
  createOnEnter: function(e) {
    if (e.keyCode != 13) return;
    var query = this.searchBox[0].value;
    this.search(query);
  },
  search: function(query) {
    var self = this;
    this.searchBox[0].value = query;
    this.photos.html("<div class='loading'>Searching Flickr...</div>");
    $.ajax({
      url: 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=flickSearch&tags='+escape(query),
      type: 'jsonp',
      success: function(resp) {
        console.log(resp);
        self.render(resp, self.photos);
      }
    });
  }
});
