//database product creation
const mongoose = require('mongoose'); //import mongoose

//Creating Schema
const ProductSchema = new mongoose.Schema({
    name : {type : String, required : true},
    image : {type : String, required : true},
    price : {type : Number, required : true},
    qty : {type : Number, required : true},
    info : {type : String, required : true}
    
},{timestamps : true}); //It Maintain the created date itself

//Creating a actual table
const Product = mongoose.model('product',ProductSchema);

//exporting the Product
module.exports = Product;