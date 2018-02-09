import React from "react";
import Team from "./Team";

const TeamSelection = ({teamSelectionHandler}) => {
  const teams = ["Alpakka", "Einhorn", "Irbis", "Kea", "Raccoon", "Tapir"];

  const teamSelections = teams.map(team => {
    return <Team teamSelectionHandler={teamSelectionHandler} name={team} key={team}/>

  });

  return (
    <div>
      {teamSelections}
    </div>
  );
};

export default TeamSelection;
