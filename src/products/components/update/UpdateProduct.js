import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Axios from "axios";

let UpdateProduct = ()=>{
    let history = useHistory(); //for redirect to other page
    //useParams() to catch the id of product
    let productID = useParams().productId;

    //state data to store single product getting from database
    let [selectedProduct,setSelectedProduct] = useState({
            name : "",
            image : "",
            price : "",
            qty : "",
            info : ""
        });
    //state data to store isSubmit condition 
    let [isSubmitted, setIsSubmitted] = useState(false)

    //When the page loads I want to get the particular id product to update
    useEffect(()=>{
        //first i have to get the single product then I have to update
        let dataURL = `http://127.0.0.1:5000/api/products/${productID}`;
        Axios.get(dataURL).then((response)=>{
            //De-structuring
            let product = response.data.product;
            setSelectedProduct({
                ...selectedProduct, //keep hold the existing data
                name : product.name ? product.name : '',
                image : product.image ? product.image : '',
                price : product.price ? product.price : '',
                qty : product.qty ? product.qty : '',
                info : product.info ? product.info : ''
            });
        }).catch((error)=>{
            console.error(error);
        })
    },[productID])

    //function to update the state when the form field changes
    let updateInput = (event)=>{
        setSelectedProduct({
            ...selectedProduct,
            [event.target.name] : event.target.value
        });
    }

    //update Image function
    let updateImage = async (event)=>{
        let imageFile = event.target.files[0];
        let base64Image = await convertBase64String(imageFile);
            setSelectedProduct({
                ...selectedProduct,
                image : base64Image
            })
     };
//Function to covert the image to base64String
 let convertBase64String = (imageFile)=>{
    return new Promise((resolve,reject)=>{
      let fileReader = new FileReader();
      fileReader.readAsDataURL(imageFile);
      fileReader.addEventListener('load',()=>{
        if(fileReader.result){
          resolve(fileReader.result);
        }
        else{
          reject('Error Occurred');
        }
      })
    })
  }

  //function to submit the form when we click the update button, then redirect to admin page
   let submitUpdateProduct = (event)=>{
    event.preventDefault(); //to avoid page refresh
    let dataURL = `http://127.0.0.1:5000/api/products/${productID}`;
    //put method to Update a product
    Axios.put(dataURL,selectedProduct).then((response)=>{
        setIsSubmitted(true)
    }).catch((error)=>{
        console.error(error);
    })
   }
    return(
        <React.Fragment>
            {//condition if the form submitted then redirect to admin page otherwise print same page
                isSubmitted ? history.push('/products/admin') :
                <React.Fragment>
                    <section className="p-3">
                        <div className="container">
                            <div className="row animated zoomIn">
                                <div className="col">
                                    <p className="h3 text-success">Update Product</p>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore tenetur accusamus, cum tempore sint dolores consequuntur, 
                                        dolor pariatur sapiente vel aut praesentium et labore, voluptates temporibus totam? Recusandae, nesciunt inventore</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*<pre>{JSON.stringify(selectedProduct)}</pre>*/}
                    <section className="p-3">
                        <div className="container">
                            <div className="row animated flipInX">
                                <div className="col-md-4">
                                    <div className="card">
                                        <div className="card-header bg-primary text-white">
                                            <p className="h4">Update a Product</p>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={submitUpdateProduct} >
                                                <div className="form-group">
                                                    <input 
                                                        name="name"
                                                        value={selectedProduct.name}
                                                        onChange={updateInput}
                                                        type="text" className="form-control" placeholder="Name of a Product"/>
                                                </div>
                                                <div className="form-group">
                                                <div class="custom-file">
                                                    <input 
                                                        onChange={updateImage}
                                                        type="file" class="custom-file-input" id="customFile"/>
                                                        <label class="custom-file-label" for="customFile">   
                                                                <img src={selectedProduct.image} alt="" width="50" height="50"/> 
                                                        </label>
                                                </div>
                                                </div>
                                            
                                                <div className="form-group">
                                                    <input 
                                                        name="price"
                                                        value={selectedProduct.price}
                                                        onChange={updateInput}
                                                        type="text" className="form-control" placeholder="Price"/>
                                                </div>
                                                <div className="form-group">
                                                    <input 
                                                        name="qty"
                                                        value={selectedProduct.qty}
                                                        onChange={updateInput}
                                                        type="text" className="form-control" placeholder="Qty"/>
                                                </div>
                                                <div className="form-group">
                                                    <textarea 
                                                        name="info"
                                                        value={selectedProduct.info}
                                                        onChange={updateInput}
                                                        rows="3" className="form-control" placeholder="Information"/>
                                                </div>
                                                <div>
                                                    <input type="submit" className="btn btn-dark btn-sm" value="Update"/>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </React.Fragment>
            }
            
            
        </React.Fragment>
    );
}

export default UpdateProduct;