import Ember from 'ember';

const { Component, inject } = Ember;

export default Component.extend({
  windoc: inject.service()
});
