import React from "react";

const STATUS = {
  IN_PLAY: "IN_PLAY",
  PAUSED: "PAUSED",
};

/**
 * Live football match
 * @param {number} id - match id
 * @param {string} status - match status: IN_PLAY or PAUSED
 * @param {string} time - live match time / 1st HALF / 2nd HALF
 * @param {string} homeTeamName - the name of the home team
 * @param {string} awayTeamName - the name of the away team
 * @param {number} homeTeamScore - the score of the home team
 * @param {number} awayTeamScore - the score of the away team
 */
const match = ({
  id,
  status,
  time,
  homeTeamName,
  awayTeamName,
  homeTeamScore,
  awayTeamScore,
}) => {
  /**
   * returns match status depends the status param
   * @param {string} status - match status: "IN_PLAY" or "PAUSED"
   * @param {string} time - live match time / "1st HALF" / "2nd HALF"
   * returns live match time / "1st HALF" / "HALF TIME" / "2nd HALF"
   */
  const matchStatus = (status, time) => {
    let returnStatus = "";
    // status exists
    if (status) {
      // IN_PLAY
      if (status.length && status === STATUS.IN_PLAY) {
        returnStatus = time;
      }
      // PAUSED
      else if (status.length && status === STATUS.PAUSED) {
        returnStatus = "HALF TIME";
      }
    }
    return returnStatus;
  };

  return (
    <div className="margin-top-20" key={id}>
      <div className="inline red">{matchStatus(status, time)} </div>
      <div className="inline">{homeTeamName} </div>
      <div className="inline red">
        {homeTeamScore} - {awayTeamScore}
      </div>
      <div className="inline"> {awayTeamName}</div>
    </div>
  );
};

export default match;
