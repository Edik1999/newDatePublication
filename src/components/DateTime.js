import React from 'react';

function DateTime({date, text}) {
    return (
        <p className="date">{date}{text}</p>
    )
}

export default DateTime;
