import React from "react";
import { Link } from "react-router-dom";
import CartNav from "./cartNav";
import NavLinks from "./navLinks";

const NavBar = () => {
    return (
        <header className="header header-transparent" id="header">
            <div className="main-header header-sticky">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-3">
                            <Link to="/" className="logo d-block" />
                        </div>
                        <div className="col-7 col-xl-5 d-flex justify-content-end justify-content-lg-start">
                            <NavLinks />
                        </div>
                        <div className="col-2 d-flex col-xl-4 justify-content-end">
                            <CartNav />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default NavBar;
