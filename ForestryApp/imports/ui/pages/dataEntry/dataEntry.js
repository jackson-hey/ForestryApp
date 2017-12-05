import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Contacts } from '../../../api/contactCol.js';

import './dataEntry.html';

Template.dataEntry.onCreated(function dataEntryOnCreate() {
  Meteor.subscribe('contacts');
  console.log(Contacts.findOne({}));

});

Template.dataEntry.helpers({


});

Template.dataEntry.events({
  'click .submit'(event) {

    Contacts.insert({ lastName: document.getElementById('lName').value,
                      firstName: document.getElementById('fName').value,
                      company: document.getElementById('company').value,
                      title: document.getElementById('title').value,

        })
    document.getElementById('lName').value = null;
    document.getElementById('fName').value = null;
    document.getElementById('company').value = null;
    document.getElementById('title').value = null;

    },

});
