import React from 'react';
import "../App.css";
import Navigation from "../components/Navigation";


const Layout =({children}) =>{

    return(
        <>
        <div>
            <main>
                {children}
            </main>
            <Navigation/>
        </div>
        
        </>
    )
}

export default Layout;