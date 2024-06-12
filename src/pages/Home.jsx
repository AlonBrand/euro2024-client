import React, { useEffect, useState } from 'react';
import { flagsPaths, games } from '../constants/games';
import euroLogo from "../images/euro-logo.svg"
import ReactCountryFlag from "react-country-flag";
import { Card, CardContent, Typography } from '@mui/material';
import "../App.css";

function Home() {
  const [isEmptyDay, setIsEmptyDay] = useState(true);
  const [winningTeam, setWinningTeam] = useState();
  const [topScorer, setTopScorer] = useState();
  const [users, setUsers] = useState();
  const [didFetch, setDidFetch] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getSideBets = () => {
      try {
        if (!didFetch && window.USER_ID !== undefined) {
          fetch(`${apiUrl}/get-side-bets/${window.USER_ID}`)
            .then((response) => response.json()
              .then((data) => {
                console.log("🚀 ~ .then ~ data:", data)
                setDidFetch(true);
                console.log(data)
                setWinningTeam(data?.winningTeam);
                setTopScorer(data?.topScorer);
                setUsers(data?.users?.map((user) => {
                  return {
                      name: user[1],
                      points: user[3],
                      userId: user[0]
                  }
              }
              )?.sort((a, b) => b?.points - a?.points))
              }));
        }
      } catch (e) {
        console.log(e)
      }
    }
    getSideBets();
  }, [apiUrl, didFetch, window.USER_ID]);

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
        window.USER_ID !== undefined &&
        <Card sx={{ maxWidth: 345, margin: '20px auto', mt: 4 }}>
          <CardContent>
            {
              users !== undefined &&
              <>
              <Typography variant="h4" component="div">
                Your Rank
              </Typography>
              <Typography variant="h5" color="text.secondary" gutterBottom>
                  {users.findIndex(user => user.userId === window.window.USER_ID) + 1} / {users.length}
              </Typography>
              </>
            }
            {
              winningTeam !== undefined &&
              <>
                <Typography variant="h4" component="div">
                  Winning Team
                </Typography>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  {winningTeam}
                </Typography>
              </>
            }
            {
              topScorer !== undefined &&
              <>
                <Typography variant="h4" component="div">
                  Top Scorer
                </Typography>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  {topScorer}
                </Typography>
              </>
            }
          </CardContent>
        </Card>
      }
      <Card sx={{ maxWidth: 345, mt: 4, margin: '20px auto' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Today's Matches
          </Typography>
          {getHomeContent(games)}
          {
            isEmptyDay &&
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Matches Today!
            </Typography>
          }
          {/* {getHomeContent(eighthGames)}
          {getHomeContent(quarterGames)}
          {getHomeContent(semiGames)}
          {getHomeContent(finalGames)} */}
        </CardContent>
      </Card>
    </>
  )
}

export default Home;