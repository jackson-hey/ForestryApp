import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

//import './main/main.html';
//import './contacts/contacts.html';
//import './dataEntry/dataEntry.html';
//import './reports/reports.html';




FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('main');
  }
});

FlowRouter.route('/contacts', {
  action: function() {

    BlazeLayout.render('contacts');
    console.log("contacts");
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