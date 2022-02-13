import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from "axios";
import { nanoid } from 'nanoid';
import { getFlag } from "../flags/getters";
const apiUrl = require('../config.json').apiUrl;

function Ranking() {
  // Query params
  const [username, setUsername] = useState(useParams().username);

  // Ranking params
  const [top100, setTop100] = useState([]);
  const [neighbors, setNeighbors] = useState([]);
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
        console.log(response.data);
        const dataTop100 = response.data.top100;
        const dataNeighbors = response.data.neighbors;
        setTop100(dataTop100);
        setNeighbors(dataNeighbors);
        setLoading(false);
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
    }, 30000);
  }, []);

  useEffect(() => {
    const param = searchParams.get('search');
    if (param) {
      setUsername(param);
    }
  }, [searchParams]);

  const getDiff = (user) => {
    const oldRank = user.lastDayRanking;
    const newRank = user.rank;
    const diff = newRank - oldRank;
    if (oldRank === 0) {
      return <td style={{color: "green"}}> <strong> New Player </strong> </td>;
    }
    let color = "";
    let icon = "";
    if (diff > 0) {
      color = "red";
      icon = "-";
    } else if (diff < 0) {
      color = "green";
      icon = "+";
    } else {
      color = "orange";
      icon = "";
    }
    return (<td style={{color: color}}> <strong> {icon}{Math.abs(user.rank - user.lastDayRanking)}</strong> </td>)
  };

  const getColor = (rank) =>{
    let colors = ["orange", "darkgray", "brown"];
    if (rank < 4) {
      return colors[rank - 1];
    } else {
      return "black";
    }
  };

  return (
    <div className="ranking col-lg-10 offset-lg-1 col-md-12">
      {notFound && <div className="alert alert-warning" role="alert">
        Player not found.
      </div>}

      {!failed && !loading && <>
      
        <div className="prize"> 
          <h3> Total prize on the pool: <strong>{prize}</strong> 💰</h3>
        </div>
      
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

            {top100.map((item) => {
              return (
                <tr key={nanoid()} style={item.username === username ? {backgroundColor: "wheat"}:{}}>
                  <th scope="row" style={{color: getColor(item.rank)}}>{item.rank}</th>
                  <td>{item.username}</td>
                  <td> {getFlag(item.country)} {item.country}</td>
                  <td>{item.money}</td>
                  {getDiff(item)}
                </tr>
              )
            })}

          </tbody>
        </table>

        <table className="table table-striped table-hover">
          <tbody>

            {neighbors && neighbors.map((item) => {
              return (
                <tr>
                  <th  key={nanoid()} scope="row">{item.rank}</th>
                  <td>{item.username}</td>
                  <td>{item.country}</td>
                  <td>{item.money}</td>
                  {getDiff(item)}
                </tr>
              )
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