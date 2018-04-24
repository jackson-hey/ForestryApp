import { Meteor } from 'meteor/meteor';
import '../imports/api/contactCol.js';
import '../imports/api/companiesCol.js';
import '../imports/api/financesCol.js';
import { Companies } from '../imports/api/companiesCol.js';
import { Contacts } from '../imports/api/contactCol.js';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

Meteor.methods({
  downloadCSV: function(fileName,yearInt) {
    let yearData = Companies.find({year:yearInt}).fetch();
    let csv = Papa.unparse(yearData[0].data);
	let blob = new Blob([csv], {type: "text/csv"});
          saveAs(blob,"Owners Managers 17-18.csv");
  },

  fetchMailData: function(yearInt) {
    var report = [];
    let yearData = Companies.find({year:yearInt}).fetch();
    let index;
     for(v=0;v<yearData[0].data.length;v++){
           let compName = yearData[0].data[v].company;
           let contactData = Contacts.find({company:compName}).fetch();

           if(contactData.length!==0){
           index = v;


    let buildAddress = contactData[0].street1 + " " + contactData[0].city + " " + contactData[0].stateCountry + " " + contactData[0].zipCode;
    let acres = yearData[0].data[index].currAcres;
    let acres1 = 0;
    let acres2 = 0;
    let acres3 = 0;
    if(acres <= 500000){
    acres1 = acres;
    }
    else if(acres <= 1000000) {
    acres1 = 500000;
    acres -= 500000;
    acres2 = acres
    }
    else if(acres <= 1500000){
    acres1 = 500000;
    acres2 = 500000;
    acres -= 1000000;
    acres3 = acres;
    }


    let x = {
        fname: contactData[0].fname,
        lname: contactData[0].lname,
        company: contactData[0].company,
        address: buildAddress,
        email: contactData[0].email,
        Amount: yearData[0].data[index].Amount,
        paid: yearData[0].data[index].paid,
        "Current Amount": yearData[0].data[index].currAcres,
        units: contactData[0].units,
        "Acres 0-500k": acres1,
        "Acres 500k-1MM": acres2,
        "Acres 1MM+": acres3,
        "Amount 0-500k": yearData[0].data[index].tierOne,
        "Amount 500k-1MM": yearData[0].data[index].tierTwo,
        "Amount 1MM+": yearData[0].data[index].tierThree,
        "TOTAL TO BE INVOICED":  yearData[0].data[index].Amount,
        "first": yearData[0].data[index].tierOne,
        "second": yearData[0].data[index].tierTwo,
        "third": yearData[0].data[index].tierThree,
        "Dues":  yearData[0].data[index].Amount.toFixed(2)
        };
        if(x.paid>=x.Amount){
        report.push(x);
        }
}
 }
        return report;
      },

        fetchRequestData: function(yearInt, units) {
          var report = [];
          let yearData = Companies.find({year:yearInt}).fetch();
          let index;
           for(v=0;v<yearData[0].data.length;v++){
                 let compName = yearData[0].data[v].company;

                 let contactData = Contacts.find({company:compName}).fetch();

                 if(contactData.length!==0){
                 index = v;


          let buildAddress = contactData[0].street1 + " " + contactData[0].city + " " + contactData[0].stateCountry + " " + contactData[0].zipCode;
          let acres = yearData[0].data[index].currAcres;
          let acres1 = 0;
          let acres2 = 0;
          let acres3 = 0;
          if(acres <= 500000){
          acres1 = acres;
          }
          else{
          acres1 = 500000;
          acres -= 500000;
          if(acres <= 500000){
          acres2 = acres;
          }
          else{
          acres2 = 500000;
          acres -= 500000;
          acres3 = acres;
          }
          }

          let x = {
              fname: contactData[0].fname,
              lname: contactData[0].lname,
              company: contactData[0].company,
              address: buildAddress,
              email: contactData[0].email,
              Amount: yearData[0].data[index].Amount,
              paid: yearData[0].data[index].paid,
              "Current Amount": yearData[0].data[index].currAcres,
              units: yearData[0].data[index].units,
              "Acres 0-500k": acres1,
              "Acres 500k-1MM": acres2,
              "Acres 1MM+": acres3,
              "Amount 0-500k": yearData[0].data[index].tierOne,
              "Amount 500k-1MM": yearData[0].data[index].tierTwo,
              "Amount 1MM+": yearData[0].data[index].tierThree,
              "TOTAL TO BE INVOICED":  yearData[0].data[index].Amount,
              "first": yearData[0].data[index].tierOne,
              "second": yearData[0].data[index].tierTwo,
              "third": yearData[0].data[index].tierThree,
              "Dues":  yearData[0].data[index].Amount.toFixed(2)
              };
              if(units==x.units){
              report.push(x);
              }
      }
       }



              return report;
            },

  updateCompany: function(cName,cYear,currA,prevA,t1,t2,t3,amt,cmp,unit,cAt){

        var cont = (Companies.find(
                {
                year: cYear.year
                }).fetch());
         var id = cont[0]._id;

        Companies.update(
   { _id: id, "data.company": cName },
   { $set: {   "data.$.currAcres" : currA,
               "data.$.prevAcres" : prevA,
               "data.$.tierOne" : t1,
               "data.$.tierTwo" : t2,
               "data.$.tierThree" : t3,
               "data.$.Amount" : amt,
               "data.$.company" : cmp,
               "data.$.units" : unit,
               "data.$.createdAt" : cAt} }
);
  },
    createCompany: function(nme,cYear,currA,prevA,t1,t2,t3,amt,unit,fAmt,cAt){
    if(unit=="Acres"){
        Companies.update(
            { _id: cYear},
            {$push: {'data': {prevAcres: prevA,
                                currAcres: currA,
                                company: nme,
                                Amount: amt,
                                tierTwo: t2,
                                tierOne: t1,
                                tierThree: t3,
                                units: unit,
                                paid: 0,
                                createdAt: cAt}}}
        );
        }
        else if(unit=="Tons"){
         Companies.update(
                    { _id: cYear},
                    {$push: {'data': {prevAcres: prevA,
                                        currAcres: currA,
                                        company: nme,
                                        Amount: amt,
                                        tierTwo: t2,
                                        tierOne: t1,
                                        tierThree: t3,
                                        units: unit,
                                        paid: 0,
                                        createdAt: cAt}}}
                );
        }
        else if(unit=="Fixed"){
                 Companies.update(
                            { _id: cYear},
                            {$push: {'data': {prevAcres: prevA,
                                                currAcres: currA,
                                                company: nme,
                                                Amount: fAmt,
                                                tierTwo: t2,
                                                tierOne: t1,
                                                tierThree: t3,
                                                units: unit,
                                                paid: 0,
                                                createdAt: cAt}}}
                        );
                }
},

  updatePayment: function(yearID,compN,paymnt){

             Companies.update(
               { _id: yearID, "data.company": compN},
               { $inc: {   "data.$.paid" : paymnt}}
            );
             }


});