import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Companies } from '../../../api/companiesCol.js';
import { updateCompany } from "../../../../lib/main.js"
import './enterCompany.html';

Template.enterCompany.onCreated(function dataEntryOnCreate() {
Meteor.subscribe('companies');

});

Template.enterCompany.helpers({

'years': function(){
     var companyList = Companies.find({}).fetch();
     var outputList = [];
     let i;
     for(i = 0; i < companyList.length; i++) {
        outputList.push(companyList[i].year);
     }
    Session.set("year",0);
    return outputList;
        }

});

Template.companyDropdown.helpers({
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
        }


});


Template.enterCompany.events({


    "change #yearSelect": function (event, template) {
    console.log(Companies.find({year:event.target.value}).fetch());
    let yid = Companies.find({year:event.target.value}).fetch();
    Session.set("year",yid[0]);
    },

  'click .submit'(event) {
    var tierOneRate = 0.0584;
    var tierTwoRate = 0.0533;
    var tierThreeRate = 0.0508;
    let cName = document.getElementById('companySelect').value;
    let cYear = Session.get("year");
    var dIndex = Session.get("dataIndex");
    var out = 0;
    var tierOnePayment = 0;
    var tierTwoPayment = 0;
    var tierThreePayment = 0;
    var acres = document.getElementById('currAcres').value;
    if(acres<500000){
         out+=acres*tierOneRate;
         tierOnePayment = out;

    }
        else if(acres<1000000){
         out+=500000*tierOneRate;
         tierOnePayment = out;
         acres-=500000;
         out+=acres*tierTwoRate;
         tierTwoPayment = acres*tierTwoRate;

        }
             else{
             out+=500000*tierOneRate;
             tierOnePayment = out;
             out+=500000*tierTwoRate;
             tierTwoPayment = 500000*tierTwoRate;
             acres-=1000000;
             out+=acres*tierThreeRate;
             tierThreePayment=acres*tierThreeRate;
     }
    if(cName == ""){
    Meteor.call('createCompany',
    document.getElementById('compName').value,
    cYear._id,
    document.getElementById('currAcres').value,
    document.getElementById('prevAcres').value,
    tierOnePayment,
    tierTwoPayment,
    tierThreePayment,
    out,
    document.getElementById('unitSelect').value,
    new Date());
    }
    else {

    Meteor.call('updateCompany',
        cName,
        cYear,
        parseInt(document.getElementById('currAcres').value),
        parseInt(document.getElementById('prevAcres').value),
        tierOnePayment,
        tierTwoPayment,
        tierThreePayment,
        out,
        document.getElementById('compName').value,
        document.getElementById('unitSelect').value,
        new Date()
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
    let cName = document.getElementById('companySelect').value;
    if(cName == ""){

    }
    else {

    let comp = (Companies.find(
            {
              year: Session.get("year").year
            }).fetch());
    for(v=0;v<comp[0].data.length;v++){
    if(comp[0].data[v].company == cName){
        Session.set("dataIndex",v);
        document.getElementById('compName').value = comp[0].data[v].company;
        document.getElementById('prevAcres').value = comp[0].data[v].prevAcres;
        document.getElementById('currAcres').value = comp[0].data[v].currAcres;
    }
    }

    }
    },

});
