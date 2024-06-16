import React, { useEffect, useState } from 'react';
import "../App.css";
import { GameTab } from '../components/GameTab';
import { games} from '../constants/games';
import euroLogo from "../images/euro-logo.svg"
import { Pagination } from '@mui/material';
import { SiComsol } from 'react-icons/si';

const itemsPerPage = 5;

function Games(prop) {
  const {setModalContent, setOpen} = prop;
  const [reFetch, setReFetch] = useState('');
  // const [userBets, setUserBets] = useStat e();
  const [showAllGames, setshowAllGames] = useState(true);
  // const [showEighthGames, setShowEightGames] = useState(false);
  // const [showQuarterGames, setShowQuarterGames] = useState(false);
  // const [showSemiGames, setShowSemiGames] = useState(false);
  // const [showFinalGames, setShowFinalGames] = useState(true);
  const [bets, setBets] = useState();
  const [realGames, setRealGames] = useState();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
    const element = document.getElementById("targetElement");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error(`Element with id "targetElement" not found`);
    }
  };


  const paginatedData = games?.filter(game => (showAllGames ? true : game.date > new Date()  )).slice((page - 1) * itemsPerPage, page * itemsPerPage);
  console.log("paginatedData", paginatedData)
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

  const toggleShowGroupMatches = () => { 
        setshowAllGames((prevShow)=>!prevShow) 
        setPage(1);
  }
  // const toggleShowEighthFinal = () => setShowEightGames((prevShow)=>!prevShow)
  // const toggleShowQuarterFinal = () => setShowQuarterGames((prevShow)=>!prevShow);
  // const toggleShowSemiFinal = () => setShowSemiGames((prevShow)=>!prevShow);
  // const toggleShowFinal = () => setShowFinalGames((prevShow)=>!prevShow);
  
  const getGamesContent = (curr_games) => {
    if (curr_games === undefined) return;
    return (
      <>
        {
          Object.values(paginatedData)?.map((game, index) => {
            console.log(paginatedData)
            // const curr_date = new Date();
            // const diffTime = curr_date - game?.date;
            
            // if(game?.status === "Groups" && !showGroupGames && (new Date() < game.date)) return null;
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
      <div className='games' id="targetElement">
        <div className="game-tab-container" style={{ marginBottom: "30px", padding: "10px", fontWeight: "bold" }} onClick={toggleShowGroupMatches}>
          {showAllGames ? 'Show Available Matches' : 'Show All Matches'}
        </div>
          {getGamesContent(games)}
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
          <Pagination
            count={Math.ceil(games.length / itemsPerPage)}
            page={page}
            onChange={handleChange}
            sx={{ margin: "1vh 0 2vh 0", display: 'flex', justifyContent: 'center', fontSize: '1.2rem' }}
          />
      </div>
    </>
  )
}

export default Games