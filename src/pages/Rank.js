import React, { useEffect, useState } from "react";
import euroLogo from "../images/euro-logo.svg"
import "../App.css";


function Rank() {
    const [users, setUsers] = useState();

    useEffect(() => {
        const getUsers = () => {
            try{
                if (users === undefined) {
                    // fetch("https://wc2022-server-k330-main-y62tkictza-wm.a.run.app/users")
                    fetch("http://127.0.0.1:5000/users")
                    .then((response) => response.json()
                    .then((data) => {
                        console.log(data)
                        setUsers(()=> data?.users?.map((user) => {
                            return {
                                name: user[1],
                                points: user[3]
                            }
                         }
                        )?.sort((a, b) => b?.points - a?.points))
                    }));
                }
            } catch(e) {
                console.log(e)
            }
        }
        getUsers();
    }, []);

    return (
        <div className="rank">
            <img src={euroLogo}/>
            <h1 style={{"paddingTop": "20px", "paddingBottom": "20px"}}>Tournament Table</h1>
            <table className="rank-table" style={{marginBottom: "50px"}}>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                {
                    users?.map((user, index) => {
                        return (
                            <tr key={`${user?.name} + ${index}`}>
                                <td>{index + 1}</td>
                                <td>{user?.name}</td>
                                <td>{user?.points}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    );
}

export default Rank;
