import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Companies } from '../../../api/companiesCol.js';

import './reports.html';

Template.reports.onCreated(function dataEntryOnCreate() {
    Meteor.subscribe('companies');

});

Template.reports.helpers({
'comps': function(){
     var companyList = Companies.find({}).fetch();
     console.log(companyList);
     var outputList = [];
     for(i = 0; i < companyList.length; i++) {
        outputList.push(companyList[i].name);
     }
    return outputList;
        },

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
           var lowRate = 0.0584;
           var medRate = 0.0533;
           var highRate = 0.0508;
           var out = 0;
           var acres = object.currAcres;
           if(acres<500000){
            out+=acres*lowRate;

           }
           else if(acres<1000000){
            out+=500000*lowRate;
            acres-=500000;
            out+=acres*medRate;

           }
            else{
            out+=500000*lowRate;
            acres-=1000000;
            out+=500000*medRate;
            out+=acres*highRate;
            }
                return out;
                                         }},
         { key: 'received', label: 'Amount Received' },
                    { key:  'percent', label: 'Percert Received',
           fn: function (name, object) {
           var lowRate = 0.0584;
           var medRate = 0.0533;
           var highRate = 0.0508;
           var out = 0;
           var acres = object.currAcres;
           if(acres<500000){
            out+=acres*lowRate;

           }
           else if(acres<1000000){
            out+=500000*lowRate;
            acres-=500000;
            out+=acres*medRate;

           }
            else{
            out+=500000*lowRate;
            acres-=1000000;
            out+=500000*medRate;
            out+=acres*highRate;
            }

                        return object.received/out + "%";
                        }},

          { key: 'createdAt', label: 'Last Updated' }


        ]
      };
    }
  });

Template.reports.events({
 'click .newAmount'(event) {
    var name = document.getElementById('companySelect').value;
    if(name == ""){

        }

    else {
        var cont = (Companies.find(
                {
                name: name
                }).fetch());
         var id = cont[0]._id;
//                console.log(id);
                var rec = parseInt(document.getElementById("currAcres").value);
;
                Companies.update({_id: id},
                {$inc: {received: rec}

                              }
                );

    }
        document.getElementById('currAcres').value = null;

    },

});
