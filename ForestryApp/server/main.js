import { Meteor } from 'meteor/meteor';
import '../imports/api/contactCol.js';
import '../imports/api/companiesCol.js';
import '../imports/api/financesCol.js';
import '../imports/api/yearsCol.js';

Meteor.startup(() => {
  console.log("startup");
});
