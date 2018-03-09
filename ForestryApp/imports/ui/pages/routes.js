import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './contacts/contacts.html'
import './reports/reports.html'
import './dataEntry/dataEntry.html'
import './home/home.html'
import './enterCompany/enterCompany.html'
import './templates.html'

FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('home');
  }
});

FlowRouter.route('/thankyou', {
  action: function() {
    BlazeLayout.render('background1');
  }
});


FlowRouter.route('/letters', {
  action: function() {
    BlazeLayout.render('contacts');
  }
});

FlowRouter.route('/status', {
  action: function() {
    BlazeLayout.render('reports');
  }
});

FlowRouter.route('/editContact', {
  action: function() {
    BlazeLayout.render('dataEntry');
  }
});

FlowRouter.route('/editCompany', {
  action: function() {
    BlazeLayout.render('enterCompany');
  }
});

FlowRouter.route('/thankyou', {
  action: function() {

  }
});

