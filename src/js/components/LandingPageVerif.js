import React from "react";
import { Link } from "react-router-dom";
import "../../css/LandingPageVerif.css";

const LandingPageVerif = () => {
    return (
        <div className="landing-page">
            <div className="verification-container">
                <h1>Welcome to Verivinex !</h1>
                <p>Your email address has been successfully verified. You can now click the button below to be redirected to your profile page:</p>
                <Link to="/app/home.html">
                    <button className="redirect-button">Go to Profile</button>
                </Link>
            </div>
        </div>
    );
}

export default LandingPageVerif;
