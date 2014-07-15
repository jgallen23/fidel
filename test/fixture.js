/*jshint unused: false */
var viewObj = {
  plugins: ['dataEl'],
  defaults: {
    enabled: true,
    debug: false,
    test: 123
  },
  elements: {
    '.name': 'name',
    'button.submit': 'submitButton'
  },
  events: {
    'click .submit': 'buttonClicked',
    'click': 'viewClicked',
    'click name': 'nameClicked',
    'click lastName': 'lastNameClicked'
  },
  init: function() {
    this.initWasCalled = true;
    this.buttonClickCount = 0;
    this.viewClickCount = 0;
    this.nameClickCount = 0;
    this.lastNameClickCount = 0;
    this.actionClickCount = 0;
  },
  method: function() {
    this.methodWasCalled = true;
  },
  methodWithArgs: function(arg) {
    this.methodWithArgsWasCalled = true;
    this.methodArg = arg;
    this.methodThis = this;
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
  lastNameClicked: function(e) {
    this.lastNameClickCount++;
  },
  actionClicked: function(e) {
    this.actionClickEvent = e;
    this.actionClickCount++;
  },
  methodWithReturn: function() {
    return 1;
  },
  methodWithEmptyArrayReturn: function() {
    return [];
  },
  methodReturnsFalse: function() {
    return false;
  }
};
