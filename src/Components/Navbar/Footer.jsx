import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "../../Styles/Footbar.module.css"; 
import { useState, useEffect } from "react";

const Footer = () => {


    return (
        <>
        <div className="w-full h-40 bg-slate-500 text-center mt-5 p-5 text-white position-fixed">
            <p>
                This wesite is in development stage. Please ignore if any bug irritates you. I am working on it. 
            </p>
            <p>Thanks!!</p>
            <p>Copyright © 2024 Rankers: All rights reserved</p>

        </div>
        </>
    );
};

export default Footer;
