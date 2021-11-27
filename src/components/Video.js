import React, { useEffect, useState } from 'react';
import DateTime from './DateTime'
import moment from 'moment';

function Video(props) {

    const [timeNow, setTimeNow] = useState(moment());

    useEffect(() => {
        let interval = setInterval(() => {
            setTimeNow(moment())
        }, 60000);
        return () => {
            clearInterval(interval)
        };
    }, [timeNow]);

    const validateTime = (time) => {
        let count
        if (time % 10 === 1 && time % 100 !== 11) {
            count = 1
        } else if ((time >= 2 && time <= 4) || (time >= 22 && time <= 24) || (time >= 32 && time <= 34)) {
            count = 2
        }
        return count
    }

    const DateTimePretty = (Component) => {

        function Wrapper(props) {

            const loadTime = moment(props.date),
                fromNow = timeNow - loadTime
            let time = Number((fromNow / 1000 / 60).toFixed(0)),
                minutes;

            switch (validateTime(time)) {
                case 1:
                    minutes = 'минуту'
                    break
                case 2:
                    minutes = 'минуты'
                    break
                default:
                    minutes = 'минут'
                    break
            }

            let text = ` ${minutes} назад`

            if (time > 60 && time < 1440) {

                time = (time / 60).toFixed(0);

                let hours;

                switch (validateTime(time)) {
                    case 1:
                        hours = 'час'
                        break
                    case 2:
                        hours = 'часа'
                        break
                    default:
                        hours = 'часов'
                        break
                }

                text = ` ${hours} назад`

            } else if (time >= 1440) {

                time = (time / 60 / 24).toFixed(0);

                let day;

                switch (validateTime(time)) {
                    case 1:
                        day = 'день'
                        break
                    case 2:
                        day = 'дня'
                        break
                    default:
                        day = 'дней'
                        break
                }

                text = ` ${day} назад`
            }

            return <Component {...props} date={time} text={text} />;
        }
        return Wrapper;
    }

    const UpgDateTime = DateTimePretty(DateTime);

    return (
        <div className="video">
            <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen title={props.url}></iframe>
            <UpgDateTime date={props.date} />
        </div>
    )
}

export default Video;
