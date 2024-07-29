import React from "react";
import { Link } from 'react-router-dom';
// import './Home.css';

function Home(){
    return(
        <div className="flex flex-col items-center justify-center h-screen bg-slate-500">
            <h1 className="font-bold text-center mb-4">
                Welcome to Resumify!
            </h1>
            <Link to="/generate" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"> Generate a Custom Cover letter </Link>
        </div>
    )
}

export default Home;