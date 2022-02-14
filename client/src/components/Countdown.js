import {useState, useEffect} from 'react';

function Countdown() {
    const [countdown, setCountdown] = useState([0, 0, 0, 0]);

    useEffect(() => {
        // Countdown
        const interval = setInterval(() => {
          let date = new Date();
          let countdown = [6-date.getDay(), 23-date.getHours(), 59-date.getMinutes(), 59-date.getSeconds()];
          setCountdown(countdown);
        }, 1000);
        return () => clearInterval(interval);
      }, []);

    return (
        <>
        <hr />
        <div className="countdown row">
            <div className="col-12">
                <h3>Next prize in:</h3>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3" style={{padding: "0"}}>
                {countdown[0]}
                <br />
                Days
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3" style={{padding: "0"}}>
                {countdown[1]}
                <br />
                Hours
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3" style={{padding: "0"}}>
                {countdown[2]}
                <br />
                Mins
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3" style={{padding: "0"}}>
                {countdown[3]}
                <br />
                Secs
            </div>
        </div>
        </>
    )
};

export default Countdown;