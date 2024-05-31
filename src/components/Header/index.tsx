import React from "react";
import './styles.css'
import Rocket from "../../assets/Rocket.tsx";

const Header: React.FC = () => {
    return (
        <header className="headerContainer">
            <div className="headerLogo">
                <Rocket />
                <h1 className="headerTitle">
                    <span className="blue">to</span>
                    <span className="purple">do</span>
                </h1>
            </div>
        </header>
    )
}

export default Header