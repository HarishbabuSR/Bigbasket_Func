import React from "react";
import {Link} from "react-router-dom"
let Navbar =()=>{
    return(
        <React.Fragment>
            <nav className="navbar navbar-dark bg-success  navbar-expand-sm">
                <div className="container">
                    <Link to="/" className="navbar-brand text-white">
                    <i className="fa fa-shopping-cart"></i>BigBasket</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                        <li className="nav-link">
                            <Link to="/" className="nav-link text-white">Home</Link>
                        </li>
                        <li className="nav-link">
                            <Link to="/products/list" className="nav-link text-white">Products</Link>
                        </li>
                        </ul>
                        <ul className="navbar-nav m-lg-auto">
                        <li className="nav-link">
                            <Link to="/products/admin" className="nav-link text-white">Admin</Link>
                        </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    );
}

export default Navbar;