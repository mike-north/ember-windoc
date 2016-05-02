# ember-windoc [![Build Status](https://travis-ci.org/levanto-financial/ember-windoc.svg?branch=master)](https://travis-ci.org/levanto-financial/ember-windoc)

Easy, fastboot-friendly consumption of `window` and `document` functionality in Ember.js apps.

![ember-windoc](http://i63.tinypic.com/108ifdw.png)

## Use

You may install this addon with ember-cli
```sh
ember install ember-windoc
```

Then, simply inject the `windoc` service onto any ember object, and build computed properties off of relevant viewport measurements

**app/components/my-component.js**
```js
import Ember from 'ember';

const { Component, inject } = Ember;

export default Component.extend({
  windoc: inject.service()
});

```

**app/templates/components/my-component.hbs**
```js
{{windoc.scrollRight}}
```

The image at the top of this readme is a great guide in terms of useful properties to bind to.

## Contributing

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
