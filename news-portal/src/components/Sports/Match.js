import React from "react";

const STATUS = {
  IN_PLAY: "IN_PLAY",
  PAUSED: "PAUSED",
};

/**
 * Live football match
 * @param {number} id
 * @param {string} status
 * @param {string} time
 * @param {string} homeTeamName
 * @param {string} awayTeamName
 * @param {*} homeTeamScore
 * @param {*} awayTeamScore
 */
const match = ({
  id,
  status,
  time,
  homeTeamName,
  awayTeamName,
  homeTeamScore,
  awayTeamScore,
}) => (
  <div className="margin-top-20" key={id}>
    {status === STATUS.IN_PLAY ? (
      <div className="inline red">{time} </div>
    ) : (
      <div className="inline red">HT </div>
    )}
    <div className="inline">{homeTeamName} </div>
    <div className="inline red">
      {homeTeamScore} - {awayTeamScore}
    </div>
    <div className="inline"> {awayTeamName}</div>
  </div>
);

export default match;
