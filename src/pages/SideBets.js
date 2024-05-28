import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import euroLogo from "../images/euro-logo.svg"
import "../App.css";

function SideBets() {
const [winningTeam, setWinningTeam] = useState();
const [topScorer, setTopScorrer] = useState();
const isAvailableGame = (new Date() - new Date(2022, 10, 20, 18)) < 0;

const [sideBets, setSideBets] = useState();
console.log(sideBets)
useEffect(() => {
    const getSideBets = () => {
        try{
            if (sideBets === undefined) {
                // fetch("https://wc2022-server-k330-main-y62tkictza-wm.a.run.app/get-side-bets")
                fetch("http://127.0.0.1:5000/get-side-bets")
                .then((response) => response.json()
                .then((data) => {
                    // console.log(data)
                    setSideBets(()=>data?.side_bets)
                }
                ))
            }
        } catch(e) {
            console.log(e)
        }
    }
    getSideBets();
}, []);


// const winningTeamOptions = [
//     { value: 'Brazil', label: 'Brazil' },
//     { value: 'Belgium', label: 'Belgium' },
//     { value: 'Argentina', label: 'Argentina' },
//     { value: 'France', label: 'France' },
//     { value: 'England', label: 'England' },
//     { value: 'Spain', label: 'Spain' },
//     { value: 'Netherlands', label: 'Netherlands' },
//     { value: 'Portugal', label: 'Portugal' },
//     { value: 'Denmark', label: 'Denmark' },
//     { value: 'Germany', label: 'Germany' },
//     { value: 'Croatia', label: 'Croatia' },
//     { value: 'Mexico', label: 'Mexico' },
//     { value: 'Uruguay', label: 'Uruguay' },
//     { value: 'Switzerland', label: 'Switzerland' },
//     { value: 'USA', label: 'USA' },
//     { value: 'Senegal', label: 'Senegal' },
//     { value: 'Wales', label: 'Wales' },
//     { value: 'Iran', label: 'Iran' },
//     { value: 'Serbia', label: 'Serbia' },
//     { value: 'Morocco', label: 'Morocco' },
//     { value: 'Japan', label: 'Japan' },
//     { value: 'Poland', label: 'Poland' },
//     { value: 'South Korea', label: 'South Korea' },
//     { value: 'Costa Rica', label: 'Costa Rica' },
//     { value: 'Canada', label: 'Canada' },
//     { value: 'Cameroon', label: 'Cameroon' },
//     { value: 'Ecuador', label: 'Ecuador' },
//     { value: 'Qatar', label: 'Qatar' },
//     { value: 'Saudi Arabia', label: 'Saudi Arabia' },
//     { value: 'Ghana', label: 'Ghana' },
// ]

// const topScorerOptions = [
//     { value: 'Harry Kane', label: 'Harry Kane' },
//     { value: 'Kylian Mbappe', label: 'Kylian Mbappe' },
//     { value: 'Karim Benzema', label: 'Karim Benzema' },
//     { value: 'Lionel Messi', label: 'Lionel Messi' },
//     { value: 'Neymar', label: 'Neymar' },
//     { value: 'Cristiano Ronaldo', label: 'Cristiano Ronaldo' },
//     { value: 'Romelu Lukaku', label: 'Romelu Lukaku' },
//     { value: 'Lautaro Martinez', label: 'Lautaro Martinez' },
//     { value: 'Memphis Depay', label: 'Memphis Depay' },
// ]

const USER_MAP = {
    '39': 'Chango',
    '40': 'etamar',
    '41': 'Dorw',
    '42': 'Eyalyosefi5',
    '43': 'Lupo',
    '45': 'Bargig',
    '46': 'Leo',
    '47': 'Dav1x',
    '48': 'tomer',
    '49': 'Falul',
    '53': 'Ronbi',
    '55': 'Itay Biton',
    '56': 'Ronmik',
    '59': 'TBH',
    '61': 'Michael Fhima',
    '62': 'Avihu',
    '64': 'Oznativ'
}

const handleWinningTeam = (e) => {
    setWinningTeam(()=>e?.label)
}

const handleTopScorer = (e) => {
    setTopScorrer(()=>e?.label)
}


const disableSend = () => winningTeam === undefined || topScorer === undefined || (isAvailableGame === false);

return (
    <div>
        <img src={euroLogo}/>
        <h1 style={{"textAlign": "center", "paddingTop": "20px", "paddingBottom": "20px"}}>Side Bets</h1>
        {/* <div style={{margin: "0px 20px 20px 20px"}} className="side-bets">
            <h3 style={{marginBottom: "10px"}}> Winning Team</h3>
            <Select
                styles={{"paddingBottom": "10px"}} 
                options={winningTeamOptions}
                isDisabled={!isAvailableGame}
                onChange={(e) => handleWinningTeam(e)}
            />
            <h3 style={{marginBottom: "10px", marginTop: "20px"}}>Top Scorer</h3>
            <Select 
                options={topScorerOptions}
                isDisabled={!isAvailableGame}
                onChange={(e) => handleTopScorer(e)}
            />
            <div style={{textAlign: "center", marginTop: "30px", "marginBotto": "50px"}}> 
                <button id="side-bet-button" style={{marginBottom: "20px", height: "50px", width: "100px", borderRadius: "4px"}} disabled={disableSend()} onClick={betOnGame}>Send</button>
                <div id='side-bets-placeholder'></div>
            </div>
        </div> */}
            <table className="rank-table" style={{marginBottom: "50px", textAlign: "center"}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Winning Team</th>
                        <th>Top Scorer</th>
                    </tr>
                </thead>
                <tbody>
                {
                    sideBets?.map((sideBet, index) => {
                        console.log(sideBet)
                        return (
                            <tr key={index}>
                                <td>{USER_MAP[sideBet[1]]}</td>
                                <td>{sideBet[2]}</td>
                                <td>{sideBet[3]}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
    </div>
  )
}

export default SideBets;