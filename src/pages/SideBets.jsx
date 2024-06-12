import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import euroLogo from "../images/euro-logo.svg"
import { postSideBet } from "../utils/postFunctions"
import Button from '@mui/material/Button';
import "../App.css";
import CircularProgress from '@mui/material/CircularProgress';


function SideBets() {
    const [winningTeam, setWinningTeam] = useState();
    const [topScorer, setTopScorrer] = useState();
    const isAvailableGame = (new Date() - new Date(2024, 5, 28, 21)) < 0;
    const [postInProgress, setPostInProgress] = useState(false);

    const winningTeamOptions = [
        { value: 'Albania',     label: 'Albania' },
        { value: 'Austria',     label: 'Austria' },
        { value: 'Belgium',     label: 'Belgium' },
        { value: 'Croatia',     label: 'Croatia' },
        { value: 'Czechia',     label: 'Czechia' },
        { value: 'Denemark',    label: 'Denemark' },
        { value: 'England',     label: 'England' },
        { value: 'France',      label: 'France' },
        { value: 'Georgia',     label: 'Georgia' },
        { value: 'Germany',     label: 'Germany' },
        { value: 'Hungary',     label: 'Hungary' },
        { value: 'Italy',       label: 'Italy' },
        { value: 'Netherlands', label: 'Netherlands' },
        { value: 'Poland',      label: 'Poland' },
        { value: 'Portugal',    label: 'Portugal' },
        { value: 'Romania',     label: 'Romania' },
        { value: 'Scotland',    label: 'Scotland' },
        { value: 'Serbia',      label: 'Serbia' },
        { value: 'Slovakia',    label: 'Slovakia' },
        { value: 'Slovenia',    label: 'Slovenia' },
        { value: 'Spain',       label: 'Spain' },
        { value: 'Turkiye',     label: 'Turkiye' },
        { value: 'Ukraine',     label: 'Ukraine' },
    ]

    const topScorerOptions = [
        { value: 'Alexander Isak', label: 'Alexander Isak', country: 'Sweden' },
        { value: 'Andrea Belotti', label: 'Andrea Belotti', country: 'Italy' },
        { value: 'Antoine Griezmann', label: 'Antoine Griezmann', country: 'France' },
        { value: 'Dani Olmo', label: 'Dani Olmo', country: 'Spain' },
        { value: 'Declan Rice', label: 'Declan Rice', country: 'England' },
        { value: 'Dimitri Payet', label: 'Dimitri Payet', country: 'France' },
        { value: 'Domenico Berardi', label: 'Domenico Berardi', country: 'Italy' },
        { value: 'Erling Haaland', label: 'Erling Haaland', country: 'Norway' },
        { value: 'Harry Kane', label: 'Harry Kane', country: 'England' },
        { value: 'Jack Grealish', label: 'Jack Grealish', country: 'England' },
        { value: 'Jadon Sancho', label: 'Jadon Sancho', country: 'England' },
        { value: 'Jamie Vardy', label: 'Jamie Vardy', country: 'England' },
        { value: 'Karim Benzema', label: 'Karim Benzema', country: 'France' },
        { value: 'Kai Havertz', label: 'Kai Havertz', country: 'Germany' },
        { value: 'Kingsley Coman', label: 'Kingsley Coman', country: 'France' },
        { value: 'Kylian Mbappé', label: 'Kylian Mbappé', country: 'France' },
        { value: 'Marcus Rashford', label: 'Marcus Rashford', country: 'England' },
        { value: 'Marcus Thuram', label: 'Marcus Thuram', country: 'France' },
        { value: 'Memphis Depay', label: 'Memphis Depay', country: 'Netherlands' },
        { value: 'Olivier Giroud', label: 'Olivier Giroud', country: 'France' },
        { value: 'Paul Pogba', label: 'Paul Pogba', country: 'France' },
        { value: 'Patrik Schick', label: 'Patrik Schick', country: 'Czech Republic' },
        { value: 'Phil Foden', label: 'Phil Foden', country: 'England' },
        { value: 'Raheem Sterling', label: 'Raheem Sterling', country: 'England' },
        { value: 'Robert Lewandowski', label: 'Robert Lewandowski', country: 'Poland' },
        { value: 'Romelu Lukaku', label: 'Romelu Lukaku', country: 'Belgium' },
        { value: 'Sadio Mané', label: 'Sadio Mané', country: 'Senegal' },
        { value: 'Timo Werner', label: 'Timo Werner', country: 'Germany' },
        { value: 'Teemu Pukki', label: 'Teemu Pukki', country: 'Finland' }
    ];
    
    const handleWinningTeam = (e) => {
        setWinningTeam(() => e?.label)
    }

    const handleTopScorer = (e) => {
        setTopScorrer(() => e?.label)
    }

    const disableSend = () => winningTeam === undefined || topScorer === undefined || (isAvailableGame === false);
    const handleSend = () => {
        setPostInProgress(true);
        postSideBet({winnigTeam: winningTeam, topScorer: topScorer}).then((data) => {
            setPostInProgress(false);
            console.log(data)
        });
    }

    return (
        <div>
            <div style={{ textAlign: "center", marginTop: "4vh" }}>
                <img alt='' src={euroLogo} />
            </div>
            <h1 style={{ "textAlign": "center", "paddingTop": "20px", "paddingBottom": "20px" }}>Side Bets</h1>
            <div style={{ margin: "0px 20px 20px 20px" }} className="side-bets">
                <h3 style={{ marginBottom: "10px" }}> Winning Team</h3>
                <Select
                    styles={{ "paddingBottom": "10px" }}
                    options={winningTeamOptions}
                    isDisabled={!isAvailableGame}
                    onChange={(e) => handleWinningTeam(e)}
                />
                <h3 style={{ marginBottom: "10px", marginTop: "20px" }}>Top Scorer</h3>
                <Select
                    options={topScorerOptions}
                    isDisabled={!isAvailableGame}
                    onChange={(e) => handleTopScorer(e)}
                />
                <div style={{ textAlign: "center", marginTop: "30px", "marginBotto": "50px" }}>
                    {
                        postInProgress ?
                        <CircularProgress  style={{ marginTop: "2vh", textAlign: "center" }} size={32}/>
                        :
                        <Button id="side-bet-button" variant="outlined" style={{ marginRight: "10px", width: "100px", height: "50px" }} disabled={disableSend()} onClick={handleSend} >Send</Button>
                    }
                    <div id='side-bets-placeholder'></div>
                </div>
            </div>
        </div>
    )
}

export default SideBets;