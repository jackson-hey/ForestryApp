import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './contacts.html';


import { Contacts } from '../../../api/contactCol.js';
import { Companies } from '../../../api/companiesCol.js';
import { saveAs } from 'file-saver';
import {json2csv} from "json-2-csv";

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

        let yearStatus = document.getElementById('yearSelect').value;
        Meteor.call('fetchMailData', yearStatus, function(error, result) {
        let csv = Papa.unparse(result);

        console.log(result);

        csv = json2csv(result,function (err, csv){

               	let blob = new Blob([csv], {type: "text/csv"});
                saveAs(blob,"Owners Managers 17-18.csv");

        });

        });
  },

 'click .requestBtn'(event) {
            Blaze.saveAsPDF(Template.requestTemplate, {
              filename: "request.pdf", // optional, default is "document.pdf"

            });
}
});
