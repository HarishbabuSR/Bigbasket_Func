import React, { useEffect, useState } from "react";
import Axios from "axios";

let ProductList = ()=>{
    //state data
    let [products, setProducts]=useState([]);

    //when the page loads I want to display the Products 
    useEffect( ()=>{
        let dataURL = `http://127.0.0.1:5000/api/products/`; //from server side
        Axios.get(dataURL).then((response)=>{
            setProducts(response.data.products);
        }).catch((error)=>{
            console.error(error);
        }); 
    },[]);
    return(
        <React.Fragment>
            <section className="p-3">
                <div className="container">
                    <div className="row">
                        <div className="col animated zoomIn delay-1s">
                            <p className="h3 text-success">Product List</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore tenetur accusamus, cum tempore sint dolores consequuntur, 
                                    dolor pariatur sapiente vel aut praesentium et labore, voluptates temporibus totam? Recusandae, nesciunt inventore</p>
                        </div>
                    </div>
                </div>
            </section>
            {/*<pre>{JSON.stringify(products)}</pre>*/}
            <section>
                { //checking the length of the product array
                    products.length > 0 ? 
                    <React.Fragment>
                        <div className="container animated zoomIn">
                            <div className="row">
                                { //to loop the each product using map function
                                    products.map(product =>{ //doing map mention the key while displaying
                                        return(
                                            <div className="col-md-3" key={product._id}>
                                                <div className="card">
                                                    <div className="card-header text-center bg-white">
                                                        <img src={product.image} alt="" width="150" height="150" />
                                                    </div>
                                                    <div className="card-body">
                                                        <ul className="list-group">
                                                            <li className="list-group-item">
                                                                NAME : {product.name}
                                                            </li>
                                                            <li className="list-group-item">
                                                                PRICE : {product.price}
                                                            </li>
                                                            <li className="list-group-item">
                                                                QTY : {product.qty}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })

                                }
                            </div>
                        </div>
                    </React.Fragment> : 
                    <React.Fragment>
                        <p className="h5 text-danger">------------NO Products Found-------</p>
                    </React.Fragment>
                }
            </section>
        </React.Fragment>
    );
}

export default ProductList;