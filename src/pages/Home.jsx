import React, { useEffect, useState } from 'react';
import { flagsPaths, games } from '../constants/games';
import euroLogo from "../images/euro-logo.svg"
import ReactCountryFlag from "react-country-flag"
import "../App.css";

function Home() {
  const [isEmptyDay, setIsEmptyDay] = useState(true);
  const [winningTeam, setWinningTeam] = useState();
  const [topScorer, setTopScorer] = useState();
  const [didFetch, setDidFetch] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getSideBets = () => {
      try {
        if (!didFetch && window.USER_ID !== undefined) {
          fetch(`${apiUrl}/get-side-bets/${window.USER_ID}`)
            .then((response) => response.json()
              .then((data) => {
                setDidFetch(true);
                console.log(data)
                setWinningTeam(() => data?.winningTeam)
                setTopScorer(() => data?.topScorer)
              }));
        }
      } catch (e) {
        console.log(e)
      }
    }
    getSideBets();
  }, [apiUrl, topScorer, winningTeam]);

  const getHomeContent = (games) => {
    return (
      <>
        {
          Object.values(games)?.map((game, index) => {
            if (new Date().getDate() === game?.date?.getDate()) {
              if (isEmptyDay) {
                setIsEmptyDay(false);
                return null;
              }
              return (
                <div key={index} className="game-tab-container" style={{ margin: "30px", width: "auto", backgroundColor: game?.status === 'Final' ? "#E3C600" : game.status === 'Shitty' ? "#DDDDDD" : "" }}>
                  <div
                    style={{
                      "display": "flex",
                      "flexDirection": "row",
                      "justifyContent": "space-around",
                      "paddingTop": "15px",
                      "textAlign": "center"
                    }}
                  >
                    <div style={{ "justifyContent": "center", "verticalAlign": "center", width: "100px", textAlign: "center" }}>
                      <ReactCountryFlag
                        countryCode={flagsPaths[game?.teamA]}
                        svg
                        style={{
                          width: '2em',
                          height: '2em',
                        }}
                        title={game?.teamA}
                      />
                      <h4 style={{ "paddingTop": "5px" }}>{game?.teamA}</h4>
                    </div>
                    <h3 style={{ "paddingTop": "15px", "textAlign": "center" }}>VS</h3>

                    <div style={{ "justifyContent": "center", "verticalAlign": "center", width: "100px", textAlign: "center" }}>
                      <ReactCountryFlag
                        countryCode={flagsPaths[game?.teamB]}
                        svg
                        style={{
                          width: '2em',
                          height: '2em',
                        }}
                        title={game?.teamB}
                      />
                      <h4 style={{ "paddingTop": "5px" }}>{game?.teamB}</h4>
                    </div>
                  </div>
                  <br></br>
                  {
                    getDateTime(game?.date)
                  }
                </div>
              )
            }
            return null;
          })
        }
      </>
    )
  }

  const getDateTime = (date) => {
    return (
      <>
        <div
          style={{
            "display": "flex",
            "flexDirection": "row",
            "justifyContent": "center",
            "paddingBottom": "15px"
          }}
        >
          <div>
            {date?.toLocaleTimeString("he-IL")}
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "4vh" }}>
        <img alt='' src={euroLogo} />
      </div>
      {
        winningTeam !== undefined && topScorer !== undefined && window.USER_ID !== undefined &&
        <div style={{ margin: "10px 0 10px 0", textAlign: "center" }}>
          <h2> Your Side Bets</h2>
          <br />
          <h4>{`Winning Team: ${winningTeam}`}</h4>
          <br />
          <h4>{`Top Scorer: ${topScorer}`}</h4>
        </div>
      }
      <h2 className='pageTitle' style={{ padding: "20px" }}>Today's Matches</h2>
      {getHomeContent(games)}
      {/* {getHomeContent(eighthGames)}
      {getHomeContent(quarterGames)}
      {getHomeContent(semiGames)}
      {getHomeContent(finalGames)} */}
      {
        isEmptyDay && <h3 style={{ "textAlign": "center" }}>No Matches Today!</h3>
      }
    </>
  )
}

export default Home;