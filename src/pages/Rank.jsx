import React, { useEffect, useState } from "react";
import euroLogo from "../images/euro-logo.svg"
import CircularProgress from '@mui/material/CircularProgress';
import "../App.css";


function Rank() {
    const [users, setUsers] = useState();
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const getUsers = () => {
            try {
                if (users === undefined) {
                    fetch(`${apiUrl}/users`)
                        .then((response) => response.json()
                            .then((data) => {
                                console.log(data)
                                setUsers(() => data?.users?.map((user) => {
                                    return {
                                        name: user[1],
                                        points: user[3]
                                    }
                                }
                                )?.sort((a, b) => b?.points - a?.points))
                            }));
                }
            } catch (e) {
                console.log(e)
            }
        }
        getUsers();
    }, [users, apiUrl]);

    return (
        <div className="rank">
            <div style={{ textAlign: "center", marginTop: "4vh" }}>
                <img alt="" src={euroLogo} />
            </div>
            <h1 style={{ "paddingTop": "20px", "paddingBottom": "20px" }}>Tournament Table</h1>
            {
                users?.length > 0 ?
                <table className="rank-table" style={{ marginBottom: "50px" }}>
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
                :
                <CircularProgress size={32} />
            }
        </div>
    );
}

export default Rank;
