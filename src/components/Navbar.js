import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";
import LoginModal from "./LoginModal";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as ImIcons from "react-icons/im";
import "./Navbar.css";

import { postSignUp, postLogIn } from "../utils/postFunctions";

function Navbar(props) {
    // const [isConnected, setIsConnected] = useState(false);
    const [sidebar, setSideBar] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [userName, setUserName] = useState();
    const [modalTitle, setModalTitle] = useState();
    const [postInProgress, setPostInProgress] = useState(false);

    useEffect(() => {
        const cookie = props.getCookieName();
        if(cookie) {
            setUserName(`Hi, ${props.getCookieName()["user_name"]}`)
        }
    }, [])

    const showSideBar = () => {
        setSideBar(!sidebar);
    };

    const handleSignUp = () => {
        setModalTitle("Sign-up");
        // setModalIsOpen(true);
    };

    const handleLogIn = () => {
        setModalTitle("Log-in");
        setModalIsOpen(true);
    }

    const handleDisconnect = () => {
        setModalTitle("log-out");
        setModalIsOpen(true);
    };

    const handleLogOut = () => {
        setModalIsOpen(false)
        props.setIsConnected(()=>false);
        document.cookie = `name=; expires=${new Date(2020, 11, 11).toUTCString()}`
        window.USER_ID = undefined;
    }

    const handleCancelLogOut = () => {
        setModalIsOpen(false)
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(modalTitle === "Sign-up"){
            postSignUp({
                name: event.target.name.value,
                password: event.target.password.value,
                updateConnectedUserName: setUserName,
                setIsConnect: props.setIsConnected,
                closeModal: closeModal,
                setPostInProgress: setPostInProgress 
            })
        } else {
            postLogIn({
                name: event.target.name.value,
                password: event.target.password.value,
                updateConnectedUserName: setUserName,
                setIsConnect: props.setIsConnected,
                closeModal: closeModal,
                setPostInProgress: setPostInProgress 
            })
        }
    }

    return (
        <>
            <LoginModal 
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
                handleSubmit={handleSubmit}
                handleLogOut={handleLogOut}
                handleCancelLogOut={handleCancelLogOut}
                title={modalTitle}
                postInProgress={postInProgress}
            />
            <IconContext.Provider value={{ color: "#fff" }}>
                <div className="navbar">
                    {
                    props.isConnected &&
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars onClick={showSideBar} />
                    </Link>
                    }
                    <Link to="#" className="menu-bars login">
                        {props.isConnected ? (
                            <span className="user-name-bar" onClick={handleDisconnect}>{userName} </span>
                        ) : (
                            <>
                                <AiIcons.AiOutlinePlus className="sing-up-icon" onClick={handleSignUp} />
                                <ImIcons.ImEnter onClick={handleLogIn} />
                            </>
                        )}
                    </Link>
                </div>
                <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                    <ul className="nav-menu-items" onClick={showSideBar}>
                        <li className="navbar-toggle">
                            <Link to="#" className="menu-bars">
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>

                        {SidebarData &&
                            SidebarData.map((item, index) => {
                                return (
                                    <li key={index} className={item.className}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default Navbar;
