import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Companies } from '../../../api/companiesCol.js';

import './reports.html';

Template.reports.onCreated(function dataEntryOnCreate() {
    Meteor.subscribe('companies');

});

Template.reports.helpers({
collection: function () {
        //console.log(Companies.findOne());
        return Companies;
    },

 tableSettings : function () {
      return {
        rowsPerPage: 5,
        showNavigation: 'auto',
        showColumnToggles: true,
       fields: [
           { key: 'name', label: 'Name' },
           { key: 'currAcres', label: 'Current Acers' },
           { key: 'prevAcres', label: 'Previous Acers' },
           { key:  'total', label: 'Amount Expected',
           fn: function (name, object) {
           var out = 0;
           var acers = object.currAcres;
                                           return out;
                                         }},

          { key: 'createdAt', label: 'Last Updated' },


        ]
      };
    }
  });

Template.reports.events({


});
