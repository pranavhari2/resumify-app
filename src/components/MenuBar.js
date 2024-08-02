import React from "react";
import { Link } from 'react-router-dom';

function MenuBar() {
    return (
        <nav>
            <div className="container mx-auto flex justify-between items-center"> </div>
                <div className="font-bold text-center text-lg">Resumify</div>
                <div className="bg-cyan-900 ">
                    <Link to="/" className="text-white font-bold py-2 px-4 rounded-full"> Home </Link>
                    <Link to="/generate" className="text-white font-bold py-2 px-4 rounded-full"> Cover Letter Generator </Link>
            </div>
        </nav>
    );
  }

export default MenuBar;