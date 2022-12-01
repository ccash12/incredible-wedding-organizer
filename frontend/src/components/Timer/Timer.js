import { useEffect, useMemo, useState } from "react";
import FlipCountdown from '@rumess/react-flip-countdown';

// const SECOND = 1000;
// const MINUTE = SECOND * 60;
// const HOUR = MINUTE * 60;
// const DAY = HOUR * 24;

export const Timer = ({ date }) => {

    // const parsedDeadline = useMemo(() => Date.parse(date), [date]);
    // const [time, setTime] = useState(parsedDeadline - Date.now());
    

    // useEffect(() => {
    //     const interval = setInterval(
    //         () => setTime(parsedDeadline - Date.now()),
    //         1000,
    //     );

    //     return () => clearInterval(interval);
    // }, [parsedDeadline]);

    return (
        <>
        {/* <div className="timer">
            {Object.entries({
                Days: time / DAY,
                Hours: (time / HOUR) % 24,
                Minutes: (time / MINUTE) % 60,
                Seconds: (time / SECOND) % 60,
            }).map(([label, value]) => (
                <div key={label} className="col-4">
                    <div className="box">
                        <p>{`${Math.floor(value)}`.padStart(2, "0")}</p>
                        <span className="text">{label}</span>
                    </div>
                </div>
            ))}
        </div> */}
        <div className="newTimer mb-3">
                <FlipCountdown endAtZero size='extra-small' endAt={date}/>
                <br/>
        </div>
            </>
    );
};

export default Timer;

