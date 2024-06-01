import React, { useEffect, useState } from 'react';
import "../App.css";
import { GameTab } from '../components/GameTab';
import { games} from '../constants/games';
import euroLogo from "../images/euro-logo.svg"


function Games(prop) {
  const {setModalContent, setOpen} = prop;
  const [reFetch, setReFetch] = useState('');
  // const [userBets, setUserBets] = useStat e();
  const [showGroupGames, setShowGroupGames] = useState(true);
  // const [showEighthGames, setShowEightGames] = useState(false);
  // const [showQuarterGames, setShowQuarterGames] = useState(false);
  // const [showSemiGames, setShowSemiGames] = useState(false);
  // const [showFinalGames, setShowFinalGames] = useState(true);
  const [bets, setBets] = useState();
  const [realGames, setRealGames] = useState();
  const apiUrl = process.env.REACT_APP_API_URL;
  
  useEffect(() => {
      const getUserBets = () => {
          try{
                const tempBets = [];
                const tempGames = [];
                fetch(`${apiUrl}/userBets/${window.USER_ID}`)
                .then((response) => response.json()
                .then((data) => {
                  // const sortedData = data?.userBets?.sort((a, b)=>a[2] - b[2]);
                    for(let bet of data?.userBets) {
                      if(Array.isArray(bet) && bet?.length >= 4) {
                        const object = Object.assign({id: bet[2], value: `Current bet: ${bet[3]} - ${bet[4]}`, scoreA: bet[3], scoreB: bet[4]})
                        tempBets.push(object);
                    }
                  }

                  for(let game of data?.games) {
                    if(Array.isArray(game) && game?.length >= 4) {
                      tempGames.push({
                        id: game[0],
                        scoreA: game[3],
                        scoreB: game[4],
                      })
                    }
                  }
                  setBets(tempBets);
                  setRealGames(tempGames);
              }))
          } catch(e) {
              console.log(e)
          }
      }
      getUserBets();
  }, [reFetch, apiUrl]);

  const toggleShowGroupMatches = () => setShowGroupGames((prevShow)=>!prevShow)
  // const toggleShowEighthFinal = () => setShowEightGames((prevShow)=>!prevShow)
  // const toggleShowQuarterFinal = () => setShowQuarterGames((prevShow)=>!prevShow);
  // const toggleShowSemiFinal = () => setShowSemiGames((prevShow)=>!prevShow);
  // const toggleShowFinal = () => setShowFinalGames((prevShow)=>!prevShow);
  
  const getGamesContent = (curr_games) => {
    if (curr_games === undefined) return;
    return (
      <>
        {
          Object.values(curr_games)?.map((game, index) => {
            // const curr_date = new Date();
            // const diffTime = curr_date - game?.date;
            if(game.status === "FINISHED" && !showGroupGames) return null;
            // if(game.status === "Eighth" && !showEighthGames) return;
            // if(game.status === "Quarter" && !showQuarterGames) return;
            // if(game.status === "Semi" && !showSemiGames) return;
            // if((game.status === "Final" || game.status === "Shitty") && !showFinalGames) return;
            // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            // if((diffTime > 0 && diffTime > (1000 * 60 * 60 * 15)) && !showEighthGames) return;
            return(
                <GameTab 
                    key={`${game.id}-${index}`} 
                    id={game.id} 
                    teamA={game.teamA} 
                    teamB={game.teamB} 
                    date={game.date} 
                    info={game.info}
                    setModalContent={setModalContent} 
                    setModalOpen={setOpen}
                    setReFetch={setReFetch}
                    bets={bets}
                    realGames={realGames}
                    status={game.status}
                />
            )
          })
        }
      </>
    )
  }

  return (

    <>
      <div style={{ textAlign: "center", marginTop: "4vh" }}>
          <img alt='' src={euroLogo} />
      </div>
      <h2 className='pageTitle' style={{ padding: "20px" }}>Matches</h2>
      <div className='games'>
        <div className="game-tab-container" style={{ marginBottom: "30px", padding: "10px", fontWeight: "bold" }} onClick={toggleShowGroupMatches}>
          {showGroupGames ? 'Hide Group Matches' : 'Reveal Group Matches'}
        </div>
        {
          showGroupGames &&
          getGamesContent(games)
        }
        {/* <div className="game-tab-container" style={{ marginBottom: "30px", padding: "10px", fontWeight: "bold" }} onClick={toggleShowEighthFinal}>
          {showEighthGames ? 'Hide' : 'Reveal'}
        </div> */}
        {/* {getGamesContent(eighthGames)}
        <div className="game-tab-container" style={{ marginBottom: "30px", padding: "10px", fontWeight: "bold" }} onClick={toggleShowQuarterFinal}>
          {showQuarterGames ? 'Hide Quarter Final' : 'Reveal Quarter Final'}
        </div>
        {getGamesContent(quarterGames)}
        <div className="game-tab-container" style={{ marginBottom: "30px", padding: "10px", fontWeight: "bold" }} onClick={toggleShowSemiFinal}>
          {showSemiGames ? 'Hide Semi Final' : 'Reveal Semi Final'}
        </div>
        {getGamesContent(semiGames)}
        <div className="game-tab-container" style={{ marginBottom: "30px", padding: "10px", fontWeight: "bold" }} onClick={toggleShowFinal}>
          {showFinalGames ? 'Hide Final' : 'Reveal Final'}
        </div>
        {getGamesContent(finalGames)} */}
      </div>
    </>
  )
}

export default Games