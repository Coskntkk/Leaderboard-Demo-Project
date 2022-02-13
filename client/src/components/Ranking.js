import { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from "axios";
import { nanoid } from 'nanoid';
import { getDiff, getColor, getFlag } from "../functions/getters";
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
    const interval = setInterval(() => {
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
      
        <div className="prize"> 
          <h3> Total prize on the pool: <strong>{prize}</strong> 💰</h3>
        </div>

        {notFound && <div className="alert alert-danger" role="alert">
          Player not found.
        </div>}
      
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col"><strong>Rank</strong></th>
              <th scope="col"><strong>Player</strong></th>
              <th scope="col"><strong>Country</strong></th>
              <th scope="col"><strong>Money</strong></th>
              <th scope="col"><strong>Daily Change</strong></th>
            </tr>
          </thead>
          <tbody>

            {leaderboard.map((item) => {
              if (item.rank <= 100) {
                return (
                  <tr key={nanoid()} style={item.id === username ? {backgroundColor: "wheat"}: null} >
                    <th scope="row" style={{color: getColor(item.rank)}}>{item.rank}</th>
                    <td>{item.id}</td>
                    <td> {getFlag(item.country)} {item.country}</td>
                    <td>{(Math.round(item.score  * 100) / 100).toFixed(2)}</td>
                    {getDiff(item)}
                  </tr>
                )
              }
            })}

          </tbody>
        </table>

        <table className="table table-striped table-hover">
          <tbody>

          {leaderboard.map((item) => {
            if (item.rank > 100) {
              return (
                <tr key={nanoid()} style={item.id === username ? {backgroundColor: "wheat"}:{}}>
                  <th scope="row" style={{color: getColor(item.rank)}}>{item.rank}</th>
                  <td>{item.id}</td>
                  <td> {getFlag(item.country)} {item.country}</td>
                  <td>{item.score}</td>
                  {getDiff(item)}
                </tr>
              )
            }
          })}

          </tbody>
        </table></>}

        {!failed && loading && 
        <div className='loading'>
          <h1>Loading.</h1>
          <i className="fas fa-cog fa-spin fa-2x"></i>
        </div>}

        {failed &&
        <div className='failed'>
          <h1>Failed to connect to server :(</h1>
          <i className="fa-solid fa-triangle-exclamation"></i>
        </div>}
    </div>
  )
};

export default Ranking;