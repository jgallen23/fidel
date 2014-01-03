
2.2.5 / 2014-01-03 
==================

  * fix a bug where dataElements weren't able to auto bind events
  * updated mocha reporter to spec

2.2.4 / 2013-12-29 
==================

  * Making sure all event listeners are removed on destroy

2.2.3 / 2013-08-19 
==================

  * updated to use latest bower

2.2.2 / 2013-06-27 
==================

  * updated build
  * [lib/jquery] type check return value from function
  * [grunt|bower] refactored to use grunt 0.4 and bower.json
  * [tests] added additional condition

2.2.1 / 2013-02-24 
==================

  * [lib/jquery] wrap in jquery closure

2.2.0 / 2012-12-20 
==================

  * [jquery] $().plugin('method') can now return a value
  * [grunt] updated reloadr

2.1.0 / 2012-12-14 
==================

  * feature[data-elements] data-element="name" now auto turn into this.name
  * refactor[elements] removed els, elements get added to root obj
  * added grunt-reloadr

2.0.3 / 2012-12-12 
==================

  * removed components dir

2.0.2 / 2012-12-11 
==================

  * fix[emit] added third param for namespacing events
  * [tests] added more jquery tests
  * fix[lint] lint tests

2.0.1 / 2012-12-11 
==================

  * added jquery as dependency

2.0.0 / 2012-12-11 
==================

  * added component.json for bower
  * code spacing
  * fixed tests
  * lint
  * grunt
  * removed old examples and updated readme
  * set el in options instead of first arg, options set on root rather than options attribute
  * added one to only trigger event once
  * refactored a bit to make instanceof work
  * fixed mem leak in live.js (just for tests)
  * unbind events on destroy
  * namespace events
  * add unique id for each instance
  * initial work on destroy method
  * refactored a bit, removed subviews
  * updated basic example, subview and template plugins
  * pass arguments to method
  * updated unit tests
  * added PreInit and PostInit hooks
  * added onInit for plugins
  * updated jquery integration
  * back to fidel (for now)
  * renamed to strap.js, re-wrote jquery integration, added unit tests

Older Releases
==============

  * fixed delegate action (again)
  * fixed data-actions
  * loop through each for jquery plugin
  * fixed argument order on el.on
  * allow element names to be used in events
  * elements get set as this.els now
  * options and delegateActions
  * added support for clientjade templates
  * added fidel.template
  * zepto support
  * rebuilt
  * initial work on full re-write
  * updated author in package.json
  * v1.2.3 - added Class.extendObject
  * cleaned up todo example
  * Merge branch 'dev'
  * updated examples and make file
  * updated author in package
  * amd support, updated ender support
  * added template
  * removed old tests
  * fixed data-action unit test
  * updated todo example - added stats
  * moved src to lib
  * added dist directory
  * super unit test
  * primary template if nothing passed
  * updated flickr docs
  * fixed flickr docs
  * templates, guid fix, optimized data-action, added todo example
  * v1.2.2 - multiple data-elements returns array
  * method unit test
  * v1.2.1 - added defaults to class
  * bumped package json to v1.2.0
  * Merge branch 'inheritance'
  * updated examples, v1.2
  * unit tests and tweaks
  * added events
  * fixed readme
  * added Fidel.Class, custom event lib and changed Fidel.extend to Fidel.ViewController.extend
