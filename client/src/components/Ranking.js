import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from "axios";
import { nanoid } from 'nanoid';
const apiUrl = require('../config.json').apiUrl;

function Ranking() {
  const [username, setUsername] = useState(useParams().username);
  const [notFound, setNotFound] = useState(false);
  const [top100, setTop100] = useState([]);
  const [neighbors, setNeighbors] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    axios.get(apiUrl + "/leaderboard/" + (username || "") )
    .then(function (response) {
      response.data.status == "success" ? setNotFound(false) : setNotFound(true);
      const dataTop100 = response.data.top100;
      const dataNeighbors = response.data.neighbors;
      setTop100(dataTop100);
      setNeighbors(dataNeighbors);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })

  }, []);

  useEffect(() => {
    const param = searchParams.get('search');
    if (param) {
      setUsername(param);
    }
  }, [searchParams]);

  function getDiff(user) {
    const oldRank = user.lastDayRanking;
    const newRank = user.rank;
    const diff = newRank - oldRank;

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
  }

  return (
    <div className="ranking col-lg-10 offset-lg-1 col-md-12">
      {notFound && <div className="alert alert-warning" role="alert">
        Player not found.
      </div>}
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">Player</th>
            <th scope="col">Country</th>
            <th scope="col">Money</th>
            <th scope="col">Daily Change</th>
          </tr>
        </thead>
        <tbody>

          {top100.map((item) => {
            return (
              <tr key={nanoid()}>
                <th scope="row">{item.rank}</th>
                <td>{item.id}</td>
                <td>{item.country}</td>
                <td>{item.score}</td>
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
      </table>
    </div>
  )
};

export default Ranking;