import React from 'react';
import Modal from "react-modal";
import spinner from "../images/spinner.gif"

export default function LoginModal({modalIsOpen, closeModal, handleSubmit, handleCancelLogOut, handleLogOut, title, postInProgress}) {
    const customStyles = {
        content: {
            position: "absolute",   
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            // marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            borderStyle: "double",
            padding: "20px",
            border: "1px",
            height: title !== 'log-out' ? "250px" : "150px",
            width: "300px",
            textAlign: "center",
        },
        overlay: {zIndex: "900"}
    };

    const inputStyle = {
        border: "1px solid black",
        marginBottom: "10px"
    }
    
    const submitStyle = {
        marginTop: "10px",
        height: "50px",
        width: "151px",
        backgroundColor: "#202649",
        color: "white",
        borderRadius: "10px"
    }

    return(
        <Modal
            isOpen={modalIsOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            ariaHideApp={false}
        >
            <div className="modal-wrapper">
                {/* <button onClick={closeModal}>close</button> */}
                {title !== 'log-out' ?
                    <>
                        <form style={{textAlign: "center"}} onSubmit={handleSubmit}>
                            <label htmlFor={"name"}>User name</label><br/>
                            <input id={"name"} style={inputStyle} type={"text"} name={"name"}/><br/>
                            <label htmlFor={"passord"}>Password</label><br/>
                            <input id={"password"} style={inputStyle} type={"passowrd"} name={"passowrd"}/><br/>
                            <div className='submitWrapper'>
                                {
                                    postInProgress ? <img src={spinner} /> : 
                                <   input style={submitStyle} type={"submit"} value={title}/>
                                }
                                {/* <input style={submitStyle} type={"submit"} value={"Sign in"}/> */}
                            </div>
                        </form>
                        <div id={"login-placeHolder"} style={{paddingTop: "15px"}}></div>
                    </>
                    :
                    <div style={{ textAlign: "center"}}>
                    <h4 style={{marginBottom: "20px"}}>Are you sure you want to log out?</h4>
                        <button style={{marginRight: "10px", width: "100px", height: "50px"}} onClick={handleLogOut}>Yes</button>
                        <button style={{marginLeft: "10px", width: "100px", height: "50px"}} onClick={handleCancelLogOut}>No</button>
                    </div>
                }

            </div>
        </Modal>
    )
}
