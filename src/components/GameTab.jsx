import { useState } from "react";
import "./GameTab.css";
import { flagsPaths } from "../constants/games";
import Timer from '../components/Timer/Timer';
import checkmark from "../images/checmmark.png";
import ReactCountryFlag from "react-country-flag"
import { BiBarChart } from "react-icons/bi";
import { useEffect } from "react";
import moment from 'moment';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';


export const GameTab = ({ id, teamA, teamB, date, info, setModalContent, setModalOpen, setReFetch, bets, realGames, status, wider}) => {
    let interval_id;
    const [scoreA, setScoreA] = useState();
    const [scoreB, setScoreB] = useState();
    const [realScoreA, setRealScoreA] = useState();
    const [realScoreB, setRealScoreB] = useState();
    const [adminCounter, setAdminCounter] = useState(0);
    const [timerAlert, setTimerAlert] = useState(true);
    const [isAvailableGame, setIsAvailableGame] = useState(new Date() < date);
    const [betInProgress, setBetInProgress] = useState(false);
    const [showGameBetsInProgress, setShowGameBetsInProgress] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const interval_id = setInterval(() => {
            setIsAvailableGame(new Date() < date);
        }, 10000);

        // Clear interval on component unmount
        return () => clearInterval(interval_id);
    }, [date]);

    const betRecivedContent = () => {
        return (
            <div
                key={id}
                style={{
                    "display": "flex",
                    "alignContent": "center",
                    "flexDirection": "column",
                    "height": "100%",
                    "alignItems": "center",
                    /* justify-content: center; */
                    "fontSize": "1rem",
                    "textAlign": "center",
                    /* overflow: scroll; */
                }}>
                <div>
                    <img src={checkmark} alt=""/>
                </div>
                <div style={{ paddingTop: "1vh" }}>
                    Got your bet! <br />
                    Good luck bro!
                </div>

            </div>
        )
    }



    const betOnGame = async () => {
        let msg = betRecivedContent()
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gameId: id, teamA: teamA, teamB: teamB, scoreA: scoreA, scoreB: scoreB, userId: window.USER_ID }),
        };
        try {
            setBetInProgress(true);
            let response = await fetch(`${apiUrl}/games/bet-on-game`, requestOptions);
            response.json()
                .then((data) => console.log(data));
            setBetInProgress(false);
            // updateConnectedUserName(`Hi, ${response_data?.msg}`)
            setModalContent(msg, "Nice bet bro!");
            setModalOpen(true);
            setReFetch(prev => !prev);
        } catch (e) {
            msg = "Faild to send bet, please try again"
            setModalContent(msg, "Nice bet bro!");
            setModalOpen(true);
            setBetInProgress(false);
        }
        // document.getElementById(`response-placeholder-${id}`).innerText = msg;

        // document.getElementById(`response-placeholder-${id}`).display = 'block';

        // setTimeout(() => {
        //     document.getElementById(`response-placeholder-${id}`).innerText = '';
        // }, 4000);
    }

    const betRealScore = async () => {
        setAdminCounter(0);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gameId: id, teamA: teamA, teamB: teamB, scoreA: realScoreA, scoreB: realScoreB, status: status }),
        };
        try {
            let response = await fetch(`${apiUrl}/games/bet-real-score`, requestOptions);
            response.json()
                .then((data) => console.log(data));
            // updateConnectedUserName(`Hi, ${response_data?.msg}`)
        } catch (e) {
            console.log(e);
        }
        // document.getElementById("response-placeholder").innerText = msg;
    }

    const validateInput = () => {
        if (scoreA === undefined || scoreB === undefined || scoreA < 0 || scoreB < 0 || scoreA === '' || scoreB === '') return true;
        return false;
    }
    const getFlagIcon = () => {
        return (
            <>
                <div
                    style={{
                        "display": "flex",
                        "flexDirection": "row",
                        "justifyContent": "space-around",
                        "paddingTop": "15px"
                    }}
                >
                    <div style={{ "justifyContent": "center", "verticalAlign": "center", width: "100px", textAlign: "center" }}>
                        <ReactCountryFlag
                            countryCode={flagsPaths[teamA]}
                            svg
                            style={{
                                width: '2em',
                                height: '2em',
                            }}
                            title={teamA}
                        />
                        <h4 style={{ "paddingTop": "5px" }}>{teamA}</h4>
                    </div>
                    <h3 style={{ "paddingTop": "15px", "textAlign": "center" }}>VS</h3>

                    <div style={{ "justifyContent": "center", "verticalAlign": "center", width: "100px", textAlign: "center" }}>
                        <ReactCountryFlag
                            countryCode={flagsPaths[teamB]}
                            svg
                            style={{
                                width: '2em',
                                height: '2em',
                            }}
                            title={teamB}
                        />
                        <h4 style={{ "paddingTop": "5px" }}>{teamB}</h4>
                    </div>
                </div>
            </>
        )
    }

    const getDateTime = () => {
        return (
            <>
                <div
                    style={{
                        "display": "flex",
                        "flexDirection": "row",
                        "justifyContent": "space-evenly",
                        "paddingTop": "20px"
                    }}
                >
                    <div>
                        {date?.toLocaleDateString("he-IL")}
                    </div>
                    <div  onClick={increaseAdminCount} >
                        {date?.toLocaleTimeString("he-IL")}
                    </div>
                </div>
            </>
        )
    }

    const increaseAdminCount = () => {
        setAdminCounter((prevCounter) => prevCounter + 1);
    }

    const getScoreGameEnd = (betA, betB) => {
        return (
            <>
                <div id={`last-bet-${id}`}
                    style={{
                        "display": "none",
                        "flexDirection": "row",
                        "justifyContent": "space-evenly",
                        "paddingTop": "20px"
                    }}
                >
                    <h3 id={`last-betA-${id}`}>
                        {betA}
                    </h3>
                    <h3 id={`last-betB-${id}`} style={{ fontStyle: "bold" }}>
                        {betB}
                    </h3>
                </div>
            </>
        )
    }

    const getGameTable = (bets, users) => {
        if (bets === undefined || users === undefined) return null;
        clearInterval(interval_id);
        return (
            <table className="rank-table rank-table-tab" style={{ fontSize: '16px' }}>
                <thead>
                    <tr>
                        <th >Name</th>
                        <th >Bet</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bets?.map((betRow, index) => {
                            const user_id = betRow[1]
                            const score_a = betRow[3]
                            const score_b = betRow[4]
                            const user = users?.filter((user) => user[0] === user_id);
                            if (user_id !== undefined && score_a !== undefined && score_b !== undefined && user !== undefined) {
                                return (
                                    <tr key={`${index}`}>
                                        <td>{(user[0] !== undefined) && user?.[0]?.[1]}</td>
                                        <td>{`${score_a} - ${score_b}`}</td>
                                    </tr>
                                )
                            }
                            return null;
                        })
                    }
                </tbody>
            </table>
        )
    }

    const showGameBets = async () => {
        setShowGameBetsInProgress(true);
        try {
            let response = await fetch(`${apiUrl}/get-bets/${id}`);
            setShowGameBetsInProgress(false);
            console.log(teamA, teamB);
            response.json()
                .then((data) => {
                    setModalContent(getGameTable(data?.game_bets, data?.users), `${teamA} - ${teamB}`);
                    setModalOpen(true);
                })
        } catch (e) {
            console.log(e);
        }
    }

    const getBetString = () => {
        return (
            <div style={{ padding: isAvailableGame ? "5px 0px 0px 0px" : "5px 0px 10px 0px" }}>
                {
                    Array.isArray(bets) && bets?.map((bet) => {
                        if (bet.id === id) {
                            return bet.value
                        }
                        return null;
                    })
                }
            </div>
        )
    }

    const gameTimer = () => {
        if (!isAvailableGame) return;
        return (
            <div id={`timerWrapper-${id}`}>
                Time left:
                <Timer class={timerAlert ? 'one_min_left' : null}
                    gameDate={date}
                    gameTabId={id}
                    setTimerAlert={setTimerAlert}
                />
            </div>
        )
    }

    const getRealScoreGameEnd = () => {
        return (
            <div style={{ fontStyle: "bold" }}>
                {
                    Array.isArray(realGames) && realGames.map((game, index) => {
                        if (game.id === id && game.scoreA !== undefined && game.scoreB !== undefined) {
                            const gamePoints = getMatchPoints(game.scoreA, game.scoreB);
                            return (
                                <div key={index}>
                                    <h3>{game.scoreA} - {game.scoreB}</h3>
                                    {gamePoints !== undefined ? <h4>{gamePoints}</h4> : undefined}
                                </div>
                            )
                        }
                        return null;
                    })
                }
            </div>
        )
    }

    const getMatchPoints = (serverScoreA, serverScoreB) => {
        let bull_points = '+ 3 Points', part_points = '+ 1 Point';
        if (status === 'Eighth') {
            bull_points = '+ 4 Points';
            part_points = '+ 2 Points';
        }
        else if (status === 'Quarter') {
            bull_points = '+ 8 Points';
            part_points = '+ 4 Points';
        }
        else if (status === 'Semi' || status === 'Shitty') {
            bull_points = '+ 10 Points';
            part_points = '+ 5 Points';
        }
        // else if (status === 'Final') {
        //     bull_points = '+ 5 Points';
        //     part_points = '+ 3 Points';
        // }

        for (let bet of bets) {
            if (bet.id === id) {
                if (serverScoreA === bet.scoreA && serverScoreB === bet.scoreB) return bull_points;
                else if (serverScoreA > serverScoreB && bet.scoreA > bet.scoreB) return part_points;
                else if (serverScoreB > serverScoreA && bet.scoreB > bet.scoreA) return part_points;
                else if (serverScoreA === serverScoreB && bet.scoreA === bet.scoreB) return part_points;
                return '+ 0 Points';
            }
        }
    }

    const needToShowTimer = ({ gameDate }) => {
        const timeLeft = moment.duration(gameDate.getTime() - new Date().getTime());
        if (timeLeft > 0 && timeLeft < moment.duration(1, 'days')) return true;
        return false;
    }

    return (
        <div className="game-tab-container" style={{ marginBottom: "30px", textAlign: "center", width: wider ? "100%" : "80%" }}>
            {!isAvailableGame ?
                <div id="game-tab-overlay"
                    style={{
                        "display": "block"
                    }}
                >
                    {getFlagIcon()}
                    <br></br>
                    {getRealScoreGameEnd()}
                    {getDateTime()}
                    {/* <br></br> */}
                    {getScoreGameEnd()}
                    <br></br>
                    {
                        info !== undefined &&
                        <br></br> &&
                        <p>{info}</p>
                    }
                    {
                        showGameBetsInProgress ? 
                        <CircularProgress  style={{ float: "right", height: "25px", width: "25px", marginRight: "10px" }}/>
                        :
                        <BiBarChart style={{ float: "right", height: "25px", width: "25px", marginRight: "10px" }} onClick={showGameBets} />
                    }
                    <h3 style={{ paddingLeft: "35px" }}>No More Bet!</h3>
                    {/* {
                            serverGameID === id && serverScoreA !== undefined && serverScoreB !== undefined ? 
                            `Your current bet: ${serverScoreA} - ${serverScoreB}` : undefined
                        } */}
                    {getBetString()}
                </div>
                :
                <>
                    <div style={{ "paddingBottom": "10px", backgroundColor: status === 'Final' ? "#E3C600" : status === 'Shitty' ? "#DDDDDD" : "" }}>
                        {getFlagIcon()}
                        <br></br>
                        {needToShowTimer({ gameDate: date }) ? gameTimer() : undefined}
                        {getDateTime()}
                        {
                            info !== undefined &&
                            <br></br> &&
                            <p>{info}</p>

                        }
                        <br></br>
                        <form onSubmit={(e) => { e.preventDefault(); betOnGame() }}>
                            <div className="bet-line">
                                <input id="left-bet" className="bet-input" type="tel" placeholder={teamA} onChange={(e) => setScoreA(e.target.value)}></input>
                                <input id="right-bet" className="bet-input" type="tel" placeholder={teamB} onChange={(e) => setScoreB(e.target.value)}></input>
                            </div>
                            <br></br>
                            {betInProgress ? (
                                <CircularProgress  style={{ textAlign: "center" }} size={32}/>
                                ) : (
                                <Button
                                    id="bet-button"
                                    className="bet-button"
                                    type="submit"
                                    variant="outlined"
                                    color="primary"
                                    disabled={validateInput()}
                                >
                                    Bet
                                </Button>
                            )}
                        </form>
                        {
                            // serverScoreA !== undefined && serverScoreB !== undefined ? 
                            // `Your current bet: ${serverScoreA} - ${serverScoreB}` : undefined
                            getBetString()
                        }
                    </div>
                </>
            }
            {(((adminCounter % 7) === 0) && adminCounter !== 0) &&
                <form onSubmit={(e) => { e.preventDefault(); betRealScore() }} style={{ marginTop: "20px" }}>
                    <div className="bet-line">
                        <input id="left-bet" style={{ height: "30px", textAlign: "center" }} type="number" placeholder={teamA} onChange={(e) => setRealScoreA(e.target.value)}></input>
                        <input id="right-bet" style={{ height: "30px", textAlign: "center" }} type="number" placeholder={teamB} onChange={(e) => setRealScoreB(e.target.value)}></input>
                    </div>
                    <br></br>
                    <input id="bet-button" className="bet-button" type="submit" value={'Bet'}></input>
                </form>
            }
            <div id={`response-placeholder-${id}`} style={{ "paddingTop": "10px", "display": "none" }}></div>
        </div>
    )
}
