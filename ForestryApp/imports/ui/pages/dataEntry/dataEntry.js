import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';


import { Contacts } from '../../../api/contactCol.js';

import './dataEntry.html';

Template.dataEntry.onCreated(function dataEntryOnCreate() {
  Meteor.subscribe('contacts');
});

Template.dataEntry.helpers({

     'categories': function(){
     var contactList = Contacts.find({}).fetch();
     var outputList = [];
     for(i = 0; i < contactList.length; i++) {
        outputList.push(contactList[i].fname + " " + contactList[i].lname + " (" + contactList[i].company + ") ");
     }
    return outputList;
        },

     'isTrue': function(){
     return true;
     }


});



Template.dataEntry.events({
  'click .submit'(event) {
    var name = document.getElementById('contactSelect').value;
    if(name == ""){
     Contacts.insert({ lname: document.getElementById('lName').value,
                           fname: document.getElementById('fName').value,
                           company: document.getElementById('company').value,
                           title: document.getElementById('title').value,
                           email: document.getElementById('email').value,
                           businessTelephone: document.getElementById('businessTelephone').value,
                           ext: document.getElementById('ext').value,
                           mobileTelephone: document.getElementById('mobileTelephone').value,
                           fax: document.getElementById('fax').value,
                           street1: document.getElementById('street1').value,
                           street2: document.getElementById('street2').value,
                           city: document.getElementById('city').value,
                           stateCountry: document.getElementById('stateCountry').value,
                           zipCode: document.getElementById('zipCode').value,
                           createdAt: new Date()

             });
    }
    else {
    var split =  name.split(" ");
        var cont = (Contacts.find(
                {
                fname: split[0],
                lname: split[1]
                }).fetch());
         var id = cont[0]._id;
                console.log(cont[0]);

                Contacts.update({_id: id},
                {$set:{ lname: document.getElementById('lName').value,
                                            fname: document.getElementById('fName').value,
                                            company: document.getElementById('company').value,
                                            title: document.getElementById('title').value,
                                            email: document.getElementById('email').value,
                                            businessTelephone: document.getElementById('businessTelephone').value,
                                            ext: document.getElementById('ext').value,
                                            mobileTelephone: document.getElementById('mobileTelephone').value,
                                            fax: document.getElementById('fax').value,
                                            street1: document.getElementById('street1').value,
                                            street2: document.getElementById('street2').value,
                                            city: document.getElementById('city').value,
                                            stateCountry: document.getElementById('stateCountry').value,
                                            zipCode: document.getElementById('zipCode').value,
                                            createdAt: new Date()

                              }}
                );
    }

    document.getElementById('fName').value = null;
    document.getElementById('lName').value = null;
    document.getElementById('company').value = null;
    document.getElementById('title').value = null;
    document.getElementById('email').value = null;
    document.getElementById('businessTelephone').value = null;
    document.getElementById('ext').value = null;
    document.getElementById('mobileTelephone').value = null;
    document.getElementById('fax').value = null;
    document.getElementById('street1').value = null;
    document.getElementById('street2').value = null;
    document.getElementById('city').value = null;
    document.getElementById('stateCountry').value = null;
    document.getElementById('zipCode').value = null;
    document.getElementById('contactSelect').value = null;

    },

    'click .newContact'(event) {
        document.getElementById('contactSelect').value = "";
        document.getElementById('fName').value = null;
        document.getElementById('lName').value = null;
        document.getElementById('company').value = null;
        document.getElementById('title').value = null;
        document.getElementById('email').value = null;
        document.getElementById('businessTelephone').value = null;
        document.getElementById('ext').value = null;
        document.getElementById('mobileTelephone').value = null;
        document.getElementById('fax').value = null;
        document.getElementById('street1').value = null;
        document.getElementById('street2').value = null;
        document.getElementById('city').value = null;
        document.getElementById('stateCountry').value = null;
        document.getElementById('zipCode').value = null;
    },

    'change #contactSelect'(event, template) {
    var name = document.getElementById('contactSelect').value;
    if(name == ""){

    }
    else {
    var split =  name.split(" ");
    var cont = (Contacts.find(
            {
              fname: split[0],
              lname: split[1]
            }).fetch());
    document.getElementById('fName').value = cont[0].fname;
    document.getElementById('lName').value = cont[0].lname;
    document.getElementById('company').value = cont[0].company;
    document.getElementById('title').value = cont[0].title;
    document.getElementById('email').value = cont[0].email;
    document.getElementById('businessTelephone').value = cont[0].businessTelephone;
    document.getElementById('ext').value = cont[0].ext;
    document.getElementById('mobileTelephone').value = cont[0].mobileTelephone;
    document.getElementById('fax').value = cont[0].fax;
    document.getElementById('street1').value = cont[0].street1;
    document.getElementById('street2').value = cont[0].street2;
    document.getElementById('city').value = cont[0].city;
    document.getElementById('stateCountry').value = cont[0].stateCountry;
    document.getElementById('zipCode').value = cont[0].zipCode;
    }
    },
});
