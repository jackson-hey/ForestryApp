import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './contacts/contacts.html'
import './reports/reports.html'
import './dataEntry/dataEntry.html'
import './home/home.html'


FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('home');
  }
});

FlowRouter.route('/contacts', {
  action: function() {
    BlazeLayout.render('contacts');
  }
});

FlowRouter.route('/reports', {
  action: function() {
    BlazeLayout.render('reports');
  }
});

FlowRouter.route('/dataEntry', {
  action: function() {
    BlazeLayout.render('dataEntry');
  }
});