import { Mongo } from 'meteor/mongo';


export const Companies = new Mongo.Collection('companies');
//Companies.insert({ text: "Hello world!", createdAt: new Date() });
