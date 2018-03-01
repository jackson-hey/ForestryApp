import { Mongo } from 'meteor/mongo';


export const Years = new Mongo.Collection('years');
//Years.insert({ int: 2017, createdAt: new Date() });