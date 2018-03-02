import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Companies } from '../../../api/companiesCol.js';

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
                outputList.push(companyList[k].data[l].name);
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
    let cName = document.getElementById('companySelect').value;
    let cYear = Session.get("year");
    if(cName == ""){
    Companies.update(
        { _id: cYear._id},
        {$push: {'data': {prevAcres: document.getElementById('prevAcres').value,
                            currAcres: document.getElementById('currAcres').value,
                            name: document.getElementById('compName').value,
                            received: 0,
                            createdAt: new Date()}}}
    );
        }
    else {
        let index = Session.get("dataIndex");
        console.log(stat);
        var cont = (Companies.find(
                {
                year: cYear.year
                }).fetch());
         var id = cont[0]._id;
                Companies.update({ "_id": id, "data.$.name:": cName},
                { $set: {
                                            "data.$.prevAcres": document.getElementById('prevAcres').value,
                                            "data.$.currAcres": document.getElementById('currAcres').value,
                                            "data.$.name": document.getElementById('compName').value,
                                            "data.$.createdAt": new Date()


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
    let cName = document.getElementById('companySelect').value;
    if(cName == ""){

    }
    else {

    let comp = (Companies.find(
            {
              year: Session.get("year").year
            }).fetch());
    for(v=0;v<comp[0].data.length;v++){
    if(comp[0].data[v].name == cName){
        Session.set("dataIndex",v);
        document.getElementById('compName').value = comp[0].data[v].name;
        document.getElementById('prevAcres').value = comp[0].data[v].prevAcres;
        document.getElementById('currAcres').value = comp[0].data[v].currAcres;
    }
    }

    }
    },

});
