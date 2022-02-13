import countryList from "./countries"
// Get countries list

// Returns the difference between the current rank and the last day's rank
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

// Returns color depending on rank
const getColor = (rank) =>{
    let colors = ["orange", "darkgray", "brown"];
    if (rank < 4) {
      return colors[rank - 1];
    } else {
      return "black";
    }
};

// Returns country flag image
const getFlag = (country) => {
    const countryCodes = Object.keys(countryList);
    const countryNames = Object.values(countryList);
    const countryIndex = countryNames.indexOf(country);
    const countryCode = countryCodes[countryIndex];

    // Return flag
    return <img src={"https://flagcdn.com/20x15/" + countryCode + ".png"}></img>;
};

// Export functions
export { getDiff, getColor, getFlag };