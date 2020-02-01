import React from 'react';

const match = (props) => {
    return (
        <div className="margin-top-20" key={props.id}>
            { props.status === "IN_PLAY" ?
                <div className="inline red">{props.time} </div> : <div className="inline red">HT </div>
            }
            <div className="inline">{props.homeTeamName}   </div>  
            <div className="inline red">{props.homeTeamScore} - {props.awayTeamScore}</div>  
            <div className="inline">   {props.awayTeamName}</div>
        </div>
    )
};

export default match;