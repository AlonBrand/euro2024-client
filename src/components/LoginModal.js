import React from 'react';
import BetsModal from "react-modal";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';



export default function LoginModal({ modalIsOpen, closeModal, handleSubmit, handleCancelLogOut, handleLogOut, title, postInProgress }) {
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
        overlay: { zIndex: "900" }
    };

    return (
        <BetsModal
            isOpen={modalIsOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            ariaHideApp={false}
        >
            <div className="modal-wrapper">
                {title !== 'log-out' ?
                    <>
                        <form style={{ textAlign: "center" }} onSubmit={handleSubmit}>
                            <TextField  id={"name"} label="User Name" variant="outlined" />
                            <TextField  id={"password"} label="Password" variant="outlined" style={{ marginTop: "2vh" }} />
                            <div className='submitWrapper'>
                                {
                                    postInProgress ?
                                        <CircularProgress  style={{ marginTop: "2vh", textAlign: "center" }} size={32}/>
                                        :
                                        <Button style={{ height: "50px", marginTop: "2vh" }} type="submit" variant="outlined">{title}</Button>
                                }
                            </div>
                        </form>
                        <div id={"login-placeHolder"}></div>
                    </>
                    :
                    <div style={{ textAlign: "center" }}>
                        <h3 style={{ marginBottom: "20px" }}>Are you sure you want to log out?</h3>
                        <Button variant="outlined" style={{ marginRight: "10px", width: "100px", height: "50px" }} onClick={handleLogOut}>Yes</Button>
                        <Button variant="outlined" style={{ marginLeft: "10px", width: "100px", height: "50px" }} onClick={handleCancelLogOut}>No</Button>
                    </div>
                }

            </div>
        </BetsModal>
    )
}
