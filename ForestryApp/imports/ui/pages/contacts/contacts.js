import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './contacts.html';


import { Contacts } from '../../../api/contactCol.js';
import { Companies } from '../../../api/companiesCol.js';
import { saveAs } from 'file-saver';

Template.contacts.onCreated(function dataEntryOnCreate() {

    Meteor.subscribe('companies');
     Meteor.subscribe('contacts');
});



Template.contacts.helpers({

'years': function(){
     let companyList = Companies.find({}).fetch();
     let outputList = [];
     for(i = 0; i < companyList.length; i++) {
        outputList.push(companyList[i].year);
     }
     Session.set("year","0");
    return outputList;
        },

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
//    var rawData = Gifts.find({
//                              receiptdate:{
//                                         $gte: Session.get("giftsStartDate"),
//                                         $lte: Session.get("giftsEndDate")
//                                          }
//                                }).fetch();

//    var csv = CSV.unparse(Companies.find().fetch());
//    var blob = new Blob([csv], {type: "text/plain;charset=utf-8;",});
//
//    saveAs(blob, "data.csv");

//  var nameFile = 'fileDownloaded.csv';
//  Meteor.call('download', function(err, fileContent) {
//    if(fileContent){
//      var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
//      saveAs(blob, nameFile);
//    }
//  });
var csv = CSV.parse("yeah.csv", {
	complete: function(results) {
		console.log("Finished:", results.data);
	}});
	var blob = new Blob([csv], {type: "text/plain;charset=utf-8"});
          saveAs(blob, "text.csv");
  },

 'click .requestBtn'(event) {
            Blaze.saveAsPDF(Template.requestTemplate, {
              filename: "request.pdf", // optional, default is "document.pdf"

            });
}
});
