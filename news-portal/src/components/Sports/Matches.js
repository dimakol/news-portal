import React from 'react';
import Match from '../Sports/Match';
import { liveMatchTime } from '../../utils/timeUtils';

/**
 * Five live football matches
 * @param {*} props 
 */
const matches = props => 
    props.matches.filter( (match, index) => index < 5)
        .map( (match, index) => {
        return <Match
            key={index}
            id={index}
            status={match.status}
            time={liveMatchTime(match.utcDate, match.lastUpdated, match.score.halfTime.homeTeam != null)}
            homeTeamName={match.homeTeam.name}
            awayTeamName={match.awayTeam.name}
            homeTeamScore={match.score.fullTime.homeTeam}
            awayTeamScore={match.score.fullTime.awayTeam} />
        } );

export default matches;
