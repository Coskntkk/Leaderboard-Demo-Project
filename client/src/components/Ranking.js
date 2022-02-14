import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from "axios";
import { nanoid } from 'nanoid';
import Rank from './Rank';
import Countdown from './Countdown';
const apiUrl = require('../config.json').apiUrl;

function Ranking() {
  // Query params
  const [username, setUsername] = useState(useParams().username);

  // Ranking params
  const [leaderboard, setLeaderboard] = useState([]);
  const [searchParams] = useSearchParams();
  const [prize, setPrize] = useState(searchParams.get('prize'));

  // Loading & Error handling
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchData = async () => {
    // Get top 100
    axios.get(apiUrl + "/leaderboard/" + (username || "") )
      .then(function (response) {
        response.data.status === "success" ? setNotFound(false) : setNotFound(true);
        const leaderboardData = response.data.leaderboard;
        setLeaderboard(leaderboardData);
        setLoading(false);
        setNotFound(!response.data.userFound);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setFailed(true);
      });
    
    // Get prize
    axios.get(apiUrl + "/prize/" )
      .then(function (response) {
        response.data.status === "success" ? setNotFound(false) : setNotFound(true);
        const dataPrize = response.data.prize;
        setPrize(dataPrize);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    // Fetch data every 10 seconds
    fetchData();
    setInterval(() => {
      fetchData();
    }, 10000);
  }, []);

  useEffect(() => {
    const param = searchParams.get('search');
    if (param) {
      setUsername(param);
    }
  }, [searchParams]);

  return (
    <div className="ranking col-lg-10 offset-lg-1 col-md-12">

      {!failed && !loading && <>
      
        <div className="prize col-lg-4 offset-lg-4 col-md-10 offset-md-1"> 
          <h3> Total prize on the pool: <strong style={{color: "brown"}}>{prize}</strong> 💰</h3>
          <Countdown />
        </div>

        {notFound && <div className="alert alert-danger" role="alert">
          Player not found.
        </div>}
      
        <table className="table table-striped table-hover">
          <thead>
            <tr style={{backgroundColor: "lightblue"}}>
              <th scope="col"><strong>Rank</strong></th>
              <th scope="col"><strong>Player</strong></th>
              <th scope="col"><strong>Country</strong></th>
              <th scope="col"><strong>Earn This Week</strong></th>
              <th scope="col"><strong>Daily Change</strong></th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((item) => {
              if (item.rank <= 100) {
                return (
                 <Rank key={nanoid()} item={item} username={username}/>
                )
              }
            })}
          </tbody>
        </table>

        {/* Neighbours if user not in top 100 */}
        <table className="table table-striped table-hover">
          <tbody>
          {leaderboard.map((item) => {
            if (item.rank > 100) {
              return (
                <Rank key={nanoid()} item={item} username={username}/>
              )
            }
          })}
          </tbody>
        </table></>}

        {/* Loading */}
        {!failed && loading && 
        <div className='loading'>
          <h1>Loading.</h1>
          <i className="fas fa-cog fa-spin fa-2x"></i>
        </div>}

        {/* Fail alert */}
        {failed &&
        <div className='failed'>
          <h1>Failed to connect to server :(</h1>
          <i className="fa-solid fa-triangle-exclamation"></i>
        </div>}

    </div>
  )
};

export default Ranking;