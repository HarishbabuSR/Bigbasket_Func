//Rest API code, routing code
const express = require('express');
const router = express.Router(); // router creation
const Product = require('../models/Product'); 
const {body,validationResult} = require('express-validator'); // to server side form validation 
/*
    @usage : Get all the Products
    @url : http://127.0.0.1:5000/api/products/
    @fields : no-fields
    @method : GET
    @access : PUBLIC 
*/
router.get('/products',async(request,response)=>{
    try{
        let products = await Product.find(); //get all the products
        response.status(200).json({products : products});
    }
    catch(error){
        console.error(error);
        response.status(500).json({errors : [{msg : error.message}]});
    }
});

/*
    @usage : Get a Single Product
    @url : http://127.0.0.1:5000/api/products/:product_id
    @fields : no-fields
    @method : GET
    @access : PUBLIC 
*/
router.get('/products/:product_id',async(request,response)=>{
    //get the product id from URL
    let productId = request.params.product_id;
    try{
        let product = await Product.findById(productId);
        response.status(200).json({product : product});
    }
    catch(error){
        console.error(error);
        response.status(500).json({errors :[{msg : error.message}]})
    }
    
})

/*
    @usage : Create a Product
    @url : http://127.0.0.1:5000/api/products/
    @fields : name, image, price, qty, info 
    @method : POST
    @access : PUBLIC 
*/
router.post('/products', [
    body('name').notEmpty().withMessage('Name is Required'), //body is to verify the form data
    body('image').notEmpty().withMessage('Image is Required'),
    body('price').notEmpty().withMessage('Price is Required'),
    body('qty').notEmpty().withMessage('Qty is Required'),
    body('info').notEmpty().withMessage('Info is Required')
], async (request,response) => { //form data is to be received & insert into table
    let errors = validationResult(request); //validation Result is to hold result of form validation
    if(!errors.isEmpty()){
        return response.status(400).json({errors:errors.array()});
    }
    try{ //to get data from form
        let product = {
            name : request.body.name,
            image : request.body.image,
            price : request.body.price,
            qty : request.body.qty,
            info : request.body.info
        }
        //above form data to be stored to database
        product = new Product(product);
        product = await product.save(); //save to database
        response.status(200).json({
            msg : 'Product is Created',
            product : product //created product is send it back
        })
    }
    catch(error){
        console.error(error);
        response.status(500).json({errors : [{msg : error.message}]});
    } 
   
})

/*
    @usage : Update a Product
    @url : http://127.0.0.1:5000/api/products/:product_id
    @fields : name, image, price, qty, info 
    @method : PUT
    @access : PUBLIC 
*/
router.put('/products/:product_id',async(request,response)=>{
    //get the product id from URL
    let productId = request.params.product_id;
    try{
        //before update we have to check id is matched so we have to use find()
        let product = await Product.findById(productId); 
        if(!product){ //check for product is there or not
            return response.status(200).json({errors : [{msg : 'No Product Found'}]});
        }
        //If the Product is there I want to update
        //Getting form data from client
        let updatedProduct ={
            name : request.body.name,
            image : request.body.image,
            price : request.body.price,
            qty : request.body.qty,
            info : request.body.info
        };
        //once I get data then I will Update
        product = await Product.findByIdAndUpdate(productId,{
            $set : updatedProduct
        },{new : true});
        response.status(200).json({
            msg : 'Product is Updated',
            product : product //updated product is send it back
        })
    }
    catch(error){
        console.error(error);
        response.status(500).json({errors :[{msg : error.message}]});
    }
    
})

/*
    @usage : Delete a Product
    @url : http://127.0.0.1:5000/api/products/:product_id
    @fields : no-fields 
    @method : DELETE
    @access : PUBLIC 
*/
router.delete('/products/:product_id',async(request,response)=>{
    //get the product id from URL
    let productId = request.params.product_id;
   try{
        //first we have to check the product is exist or not
        let product = await Product.findById(productId); 
        if(!product){ //check for product is there or not
            return response.status(200).json({errors : [{msg : 'No Product Found'}]});
        }
        product = await Product.findByIdAndDelete(productId); //delete a product
        //once it is deleted i will send response back
        response.status(200).json({
            msg : 'Product is Deleted'
        })
   }
   catch(error){
    console.error(error);
    response.status(500).json({errors :[{msg : error.message}]});
   }
})

//exporting the router 
module.exports = router;