import { Mongo } from 'meteor/mongo';


export const Contacts = new Mongo.Collection('contacts');
//Contacts.insert({ text: "Hello world!", createdAt: new Date() });

