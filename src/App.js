import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Rank from "./pages/Rank";
import SideBets from "./pages/SideBets";
import { useEffect, useState } from "react";

function App() {
    const [open, setOpen] = useState(false);
    const [modalText, setModalText] = useState(false);
    const [modalTitle, setModalTitle] = useState(false);
    const setModalContent = (modalText, modalTitle) => {
        setModalText(modalText);
        setModalTitle(modalTitle);
    }
    const onCloseModal = () => {
        setOpen(false);
    }

    const getCookieName = () => {
        return true;
        // if(document.cookie) return JSON.parse(document.cookie?.substring(5));
    }

    const [isConnected, setIsConnected] = useState();

    useEffect(() => {
        const cookie_value = getCookieName();
        if (cookie_value) {
            setIsConnected(true);
            window.USER_ID = cookie_value["user_id"];
        }
    }, []);

    return (
        <div className="App">
            <Modal open={open} onClose={onCloseModal} modalTitle={modalTitle} modalText={modalText} />
            <Navbar isConnected={isConnected} setIsConnected={setIsConnected} getCookieName={getCookieName} />
            <Routes>
                <Route path="/" exact element={<Home />}></Route>
                {/* <Route path="/games" element={window.USER_ID ? <Games setModalContent={setModalContent} setOpen={setOpen} modalState={open} onCloseModal={onCloseModal} /> : <Home />}></Route>
                <Route path="/table" element={window.USER_ID ? <Rank /> : <Home />}></Route>
                <Route path="/side-bets" element={window.USER_ID ? <SideBets /> : <Home />}></Route> */}
                <Route path="/games" element={<Games setModalContent={setModalContent} setOpen={setOpen} modalState={open} onCloseModal={onCloseModal} />}></Route>
                <Route path="/table" element={<Rank />}></Route>
                <Route path="/side-bets" element={<SideBets />}></Route>
            </Routes>
        </div>

    );
}

export default App;
