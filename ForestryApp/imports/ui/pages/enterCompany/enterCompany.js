import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Companies } from '../../../api/companiesCol.js';

import './enterCompany.html';

Template.enterCompany.onCreated(function dataEntryOnCreate() {
    Meteor.subscribe('companies');

});

Template.enterCompany.helpers({
'comps': function(){
     var companyList = Companies.find({}).fetch();
     console.log(companyList);
     var outputList = [];
     for(i = 0; i < companyList.length; i++) {
        outputList.push(companyList[i].name);
     }
    return outputList;
        }

});

Template.enterCompany.events({
  'click .submit'(event) {
    var name = document.getElementById('companySelect').value;
    if(name == ""){
     Companies.insert({                     prevAcres: document.getElementById('prevAcres').value,
                                            currAcres: document.getElementById('currAcres').value,
                                            name: document.getElementById('compName').value,
                                            createdAt: new Date()

        });

    }
    else {
        var cont = (Companies.find(
                {
                name: name
                }).fetch());
         var id = cont[0]._id;
                console.log(cont[0]);

                Companies.update({_id: id},
                {$set:{
                                            prevAcres: document.getElementById('prevAcres').value,
                                            currAcres: document.getElementById('currAcres').value,
                                            name: document.getElementById('compName').value,
                                            createdAt: new Date()


                              }}
                );

    }
        document.getElementById('companySelect').value = "";
        document.getElementById('compName').value = null;
        document.getElementById('currAcres').value = null;
        document.getElementById('prevAcres').value = null;

    },

 'click .newCompany'(event) {
        document.getElementById('companySelect').value = "";
        document.getElementById('compName').value = null;
        document.getElementById('currAcres').value = null;
        document.getElementById('prevAcres').value = null;
    },



 'change #companySelect'(event, template) {
    var name = document.getElementById('companySelect').value;
    if(name == ""){

    }
    else {
    var comp = (Companies.find(
            {
              name: name
            }).fetch());
    console.log(comp);
    document.getElementById('compName').value = comp[0].name;
    document.getElementById('prevAcres').value = comp[0].prevAcres;
    document.getElementById('currAcres').value = comp[0].currAcres;
    }
    },

});
