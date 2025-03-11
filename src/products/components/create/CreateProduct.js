import React, { useState } from "react";
import Axios from "axios";
import {useHistory} from "react-router-dom";


let CreateProduct = ()=>{
    let history = useHistory();
    //sate data to create product
    let [product, setProduct] = useState({
        name : "",
        image : "",
        price : "",
        qty : "",
        info : ""
    });
//state data to initial form submission condition
let [isSubmitted, setIsSubmitted] = useState(false); //initially submit was false

    //Function to bind the state data with form
    let updateInput = (e)=>{
        setProduct({
            ...product,
            [e.target.name] : e.target.value
        });
    };

//update Image function
let updateImage = async (event)=>{
    let imageFile = event.target.files[0];
    let base64Image = await convertBase64String(imageFile);
    setProduct({
      product : {
        ...product,
      image : base64Image
      }
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
  
  //Function for form submission , when we click the create button & redirect to Admin Page after create
  let submitCreateProduct = (event)=>{
    event.preventDefault(); //to avoid page refresh
    let dataURL='http://127.0.0.1:5000/api/products/';
    //post method to create product
    Axios.post(dataURL, product).then((response)=>{
       
        //once the product is created then redirect to the admin page
        setIsSubmitted(true);
    }).catch((error)=>{
        console.error(error);
    })
  }
    return(
        <React.Fragment>
            {//if the submission is true redirect to admin page otherwise display the create product page
                isSubmitted ? history.push('/products/admin') :
                <React.Fragment>
                    <section className="p-3">
                        <div className="container">
                            <div className="row animated jello">
                                <div className="col">
                                    <p className="h3 text-success">Create Product</p>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore tenetur accusamus, cum tempore sint dolores consequuntur, 
                                            dolor pariatur sapiente vel aut praesentium et labore, voluptates temporibus totam? Recusandae, nesciunt inventore</p>
                                </div>
                            </div>
                        </div>
                    </section>
                   { /*<pre>{JSON.stringify(product)}</pre>*/}
                    <section>
                        <div className="container">
                            <div className="row animated flipInX">
                                <div className="col-md-4">
                                    <div className="card">
                                        <div className="card-header bg-success text-white">
                                            <p className="h3">Create Product</p>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={submitCreateProduct}>
                                                <div className="form-group">
                                                    <input 
                                                        required
                                                        name="name"
                                                        value={product.name}
                                                        onChange={updateInput}
                                                        type="text" className="form-control" placeholder="Name of a Product"/>
                                                </div>
                                                <div className="form-group">
                                                <div class="custom-file">
                                                    <input 
                                                        required
                                                        onChange={updateImage}
                                                        type="file" class="custom-file-input" id="customFile"/>
                                                        <label class="custom-file-label" for="customFile">
                                                                <img src={product.image} alt="" width="50" height="50"/> 
                                                            
                                                        </label>
                                                </div>
                                                </div>
                                            
                                                <div className="form-group">
                                                    <input 
                                                        required
                                                        name="price"
                                                        value={product.price}
                                                        onChange={updateInput}
                                                        type="text" className="form-control" placeholder="Price"/>
                                                </div>
                                                <div className="form-group">
                                                    <input 
                                                        required
                                                        name="qty"
                                                        value={product.qty}
                                                        onChange={updateInput}
                                                        type="text" className="form-control" placeholder="Qty"/>
                                                </div>
                                                <div className="form-group">
                                                    <textarea 
                                                        required
                                                        name="info"
                                                        value={product.info}
                                                        onChange={updateInput}
                                                        rows="3" className="form-control" placeholder="Information"/>
                                                </div>
                                                <div>
                                                    <input type="submit" className="btn btn-success btn-sm" value="Create"/>
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

export default CreateProduct;