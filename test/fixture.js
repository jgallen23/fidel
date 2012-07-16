var viewObj = {
  defaults: {
    enabled: true,
    debug: false,
    test: 123
  },
  elements: {
    'span': 'name',
    'button.submit': 'submitButton'
  },
  events: {
    'click .submit': 'buttonClicked',
    'click': 'viewClicked',
    'click name': 'nameClicked'
  },
  init: function() {
    this.initWasCalled = true;
    this.buttonClickCount = 0;
    this.viewClickCount = 0;
    this.nameClickCount = 0;
    this.actionClickCount = 0;
  },
  method: function() {
    this.methodWasCalled = true;
  },
  buttonClicked: function(e) {
    this.buttonClickedEvent = e;
    this.buttonClickCount++;
  },
  viewClicked: function(e) {
    this.viewClickedEvent = e;
    this.viewClickCount++;
  },
  nameClicked: function(e) {
    this.nameClickEvent = e;
    this.nameClickCount++;
  },
  actionClicked: function(e) {
    this.actionClickEvent = e;
    this.actionClickCount++;
  }
};
var viewOptions = {
  enabled: true,
  debug: true
};
