import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import Axios from "axios";


let ProductAdmin = ()=>{
    //state data
    let [products,setProducts]=useState([]);

    //when the page loads I want to display the data
    useEffect(()=>{
       //function calling
       getAllProducts();
    },[]);

//Function get all the products
let getAllProducts = ()=>{
    let dataURL = ` http://127.0.0.1:5000/api/products/`;
    Axios.get(dataURL).then((response)=>{
        setProducts(response.data.products)
    }).catch((error)=>{
        console.error(error);
    });
}
//Function to delete a product
let clickDeleteProduct = (productId)=>{
    let dataURL = `http://127.0.0.1:5000/api/products/${productId}`;
    Axios.delete(dataURL).then((response)=>{
        //we get all products again here after deleting
        getAllProducts();
    }).catch((error)=>{
        console.error(error);
    })
}
    return(
        <React.Fragment>
            <section className="p-3">
                <div className="container">
                    <div className="row animated zoomIn">
                        <div className="col">
                        <p className="h3 text-success">Product Admin</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore tenetur accusamus, cum tempore sint dolores consequuntur, 
                                dolor pariatur sapiente vel aut praesentium et labore, voluptates temporibus totam? Recusandae, nesciunt inventore</p>
                        <Link to="/products/create" className="btn btn-success btn-sm">Create</Link>
                        </div>
                    </div>
                </div>
            </section>
           { /*<pre>{JSON.stringify(products)}</pre>*/}
           <section>
               <div className="container">
                   <div className="row animated zoomIn delay-1s">
                       <div className="col">
                           <table className="table table-hover text-center table-striped justify-content-center align-items-center">
                               <thead className="bg-dark text-success">
                                   <tr>
                                       <th>SNO</th>
                                       <th>Product</th>
                                       <th>Name</th>
                                       <th>Price</th>
                                       <th>Qty</th>
                                       <th>Actions</th>
                                   </tr>
                               </thead>
                               {//Checking Product array is empty or not
                                   products.length > 0 ?
                                    <tbody>
                                        {//map function to loop the each product
                                           products.map(product=>{
                                            return(
                                                <tr key={product._id}>
                                                    <td>{product._id.substr(product._id.length-5)}</td>
                                                    <td>
                                                        <img src={product.image} alt="" width="50" height="50" />
                                                    </td>
                                                    <td>{product.name}</td>
                                                    <td>&#8377; {product.price.toFixed(2)}</td>
                                                    <td>{product.qty} Kgs</td>
                                                    <td>
                                                        <Link to={`/products/update/${product._id}`} className="btn btn-success btn-sm">Update</Link>
                                                        <button className="btn btn-danger btn-sm"onClick={clickDeleteProduct.bind(this,product._id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            );
                                           })
                                        }
                                    </tbody> :
                                    <tbody>
                                        <tr>
                                            <td colSpan="6" className="text-danger">--------No Product Found------------</td>
                                        </tr>
                                    </tbody>
                               }
                           </table>
                       </div>
                   </div>
               </div>
           </section>
        </React.Fragment>
    );
}

export default ProductAdmin;