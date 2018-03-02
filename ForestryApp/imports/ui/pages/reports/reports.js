import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Companies } from '../../../api/companiesCol.js';

import './reports.html';

Template.reports.onCreated(function dataEntryOnCreate() {
    Meteor.subscribe('companies');

});

Template.reports.helpers({
'comps': function(){
     let outputList = [];
     let companyList = Companies.find({}).fetch();
            let y = Session.get("year").year;
            for(k = 0; k<companyList.length; k++){
            if(companyList[k].year==y){
            for(l = 0; l<companyList[k].data.length; l++){
                outputList.push(companyList[k].data[l].name);
            }
            }
            }

       return outputList;
        },
'years': function(){
     let companyList = Companies.find({}).fetch();
     let outputList = [];
     for(i = 0; i < companyList.length; i++) {
        outputList.push(companyList[i].year);
     }
     Session.set("year","0");
    return outputList;
        },

collection: function () {
        let o = Session.get("year")._id;
        let x = Companies.find({_id: o}).fetch();
        console.log(x);
      //  return Companies.find({_id: o}).fetch();
       return x[0].data;
    },



 tableSettings : function () {
      return {
        rowsPerPage: 5,
        showNavigation: 'auto',
        showColumnToggles: true,
       fields: [
           { key: 'name', label: 'Name' },
           { key: 'currAcres', label: 'Current Acres' },
           { key: 'prevAcres', label: 'Previous Acres' },
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
                return out.toFixed(2);
                                         }},
         { key: 'received', label: 'Amount Received' },
                    { key:  'percent', label: 'Percent Received',

                                 cellClass: function (value, object) {
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
                                               var per = object.received/out;
                                               if(per>= 1){
                                               return 'cellGreen';
                                               }
                                               else{
                                               return 'cellRed';
                                               }
                                               },

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

                        return ((object.received/out).toFixed(2)*100) + "%";
                        }},

          { key: 'createdAt', label: 'Last Updated',
          fn: function (name, object) {
          console.log(object);

          var dateFormat = require('dateformat');
          var now = object.createdAt
         return dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
                                  }
}
        ]
      };
    }
  });

Template.reports.events({

  "change #yearSelect": function (event, template) {
    let yid = Companies.find({year:event.target.value}).fetch();

    Session.set("year",yid[0]);
    },

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
