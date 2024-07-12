import React, { useEffect, useState } from 'react';
import "../App.css";
import { GameTab } from '../components/GameTab';
import { finalGame } from '../constants/games';
import euroLogo from "../images/euro-logo.svg"
import { Pagination } from '@mui/material';

const itemsPerPage = 4;

function Games(prop) {
  const { setModalContent, setOpen } = prop;
  const [reFetch, setReFetch] = useState('');
  const [showAllGames, setshowAllGames] = useState(false);
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

  const availableGames = finalGame.filter((game) => {
    const gameEndTime = new Date(game.date.getTime() + 180 * 60000);
    return new Date() <= gameEndTime
  });

  const paginatedData = showAllGames ? finalGame.slice((page - 1) * itemsPerPage, page * itemsPerPage) : availableGames.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const gamesCount = showAllGames ? finalGame?.length : availableGames?.length;

  useEffect(() => {
    const getUserBets = () => {
      try {
        const tempBets = [];
        const tempGames = [];
        fetch(`${apiUrl}/userBets/${window.USER_ID}`)
          .then((response) => response.json()
            .then((data) => {
              // const sortedData = data?.userBets?.sort((a, b)=>a[2] - b[2]);
              for (let bet of data?.userBets) {
                if (Array.isArray(bet) && bet?.length >= 4) {
                  const object = Object.assign({ id: bet[2], value: `Your bet: ${bet[3]} - ${bet[4]}`, scoreA: bet[3], scoreB: bet[4] })
                  tempBets.push(object);
                }
              }

              for (let game of data?.games) {
                if (Array.isArray(game) && game?.length >= 4) {
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
      } catch (e) {
        console.log(e)
      }
    }
    getUserBets();
  }, [reFetch, apiUrl]);

  const toggleShowGroupMatches = () => {
    setshowAllGames((prevShow) => !prevShow)
    setPage(1);
  }

  const getGamesContent = (curr_games) => {
    if (curr_games === undefined) return;
    return (
      <>
        {
          Object.values(paginatedData)?.map((game, index) => {
            return (
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
        {getGamesContent(finalGame)}
        <Pagination
          count={Math.ceil(gamesCount / itemsPerPage)}
          page={page}
          onChange={handleChange}
          sx={{ margin: "1vh 0 2vh 0", display: 'flex', justifyContent: 'center', fontSize: '1.2rem' }}
        />
      </div>
    </>
  )
}

export default Games