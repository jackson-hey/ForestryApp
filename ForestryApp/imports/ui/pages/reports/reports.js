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
                outputList.push(companyList[k].data[l].company);
            }
            }
            }

       return outputList;
        },
'years': function(){
     let companyList = Companies.find({}).fetch();
     let outputList = [];
     outputList.push(" ");
     for(i = 0; i < companyList.length; i++) {
        outputList.push(companyList[i].year);
     }
     Session.set("year","0");
    return outputList;
        },

collection: function () {
        let o = Session.get("year")._id;
        let x = Companies.find({_id: o}).fetch();

      //  return Companies.find({_id: o}).fetch();
       return x[0].data;
    },



 tableSettings : function () {
      return {
        rowsPerPage: 5,
        showNavigation: 'auto',
        showColumnToggles: true,
       fields: [
           { key: 'company', label: 'Name' },
           { key: 'currAcres', label: 'Current Acres' },
           { key: 'prevAcres', label: 'Previous Acres' },
           { key:  'Amount', label: 'Expected',
             fn: function (name, object) {
             return object.Amount.toFixed(2);
                                     }},
           { key: 'paid', label: 'Received' },
           { key:  'percent', label: 'Percent Received',
                                 cellClass: function (value, object) {
                                               let per = object.paid/object.Amount;
                                               if(per>= 1){
                                               return 'cellGreen';
                                               }
                                               else{
                                               return 'cellRed';
                                               }
                                               },

           fn: function (name, object) {
           let calc = object.paid/object.Amount;
           calc = (calc * 100)
           calc = calc.toFixed(2);

                        return calc + "%";
                        }},

          { key: 'createdAt', label: 'Last Updated',
          fn: function (name, object) {
          var dateFormat = require('dateformat');
          var now = object.createdAt;
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
                let pay = parseInt(document.getElementById("currAcres").value);
                let ye = Session.get("year");
                Meteor.call('updatePayment',ye._id,name,pay)
    }
        document.getElementById('currAcres').value = null;

    },

});
