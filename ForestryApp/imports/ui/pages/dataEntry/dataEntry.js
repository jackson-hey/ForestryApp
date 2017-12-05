import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import '../../../api/contactCol.js';

import './dataEntry.html';

Template.dataEntry.onCreated(function dataEntryOnCreate() {

  Meteor.subscribe('contacts');
});

Template.dataEntry.helpers({


});

Template.dataEntry.events({
  'click .submit'() {
      console.log("clicked");
    },
});