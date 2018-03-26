import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './contacts.html';


import { Contacts } from '../../../api/contactCol.js';


Template.contacts.onCreated(function dataEntryOnCreate() {


     Meteor.subscribe('contacts');
});



Template.contacts.helpers({
     'categories': function(){
     var contactList = Contacts.find({}).fetch();
     var outputList = [];
     for(i = 0; i < contactList.length; i++) {
        outputList.push(contactList[i].fName + " " + contactList[i].lName + " (" + contactList[i].company + ") ");
     }
    return outputList;
        }
});


Template.thanksLetter.helpers({
     'name': function(){
     var name = document.getElementById('contactSelect').value;
    return name;
        },
     'date': function(){
        var date = new Date();

         return date;
             },
});

Template.contacts.events({
  'click .thanksBtn'(event) {
            Blaze.saveAsPDF(Template.thanksLetter, {
              filename: "thankyou.pdf", // optional, default is "document.pdf"
            });
////        require('buffer');
////        var arraybuffer = 'background1.jpg';
////        doc.image(new Buffer(arraybuffer));
////      var doc = new PDFDocument({size: 'A4', margin: 50});
//      doc.fontSize(12);
//      doc.text('PDFKit is simple', 10, 30, {align: 'center', width: 200});
//      doc.write('PDFKitExampleClientSide.pdf');
},
 'click .requestBtn'(event) {
            Blaze.saveAsPDF(Template.requestTemplate, {
              filename: "request.pdf", // optional, default is "document.pdf"

            });
}
});
