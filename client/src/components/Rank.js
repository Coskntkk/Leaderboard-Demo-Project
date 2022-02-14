import { getDiff, getColor, getFlag } from "../functions/getters";

function Rank({item, username}){
    return (
        <tr style={item.id === username ? {backgroundColor: "wheat", border: "2px solid green"}: null} >
            <td scope="row" style={{color: getColor(item.rank)}}> <strong>{item.rank}</strong></td>
            <td>{item.id} </td>
            <td> {getFlag(item.country)} {item.country}</td>
            <td>{(Math.round(item.score  * 100) / 100).toFixed(2)}</td>
            {getDiff(item)}
        </tr>
    )
};

export default Rank;