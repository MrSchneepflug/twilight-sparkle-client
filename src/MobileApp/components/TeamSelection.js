import React, {Component} from "react";
import Team from "./Team";

const teams = ["Alpakka", "Einhorn", "Irbis", "Kea", "Raccoon", "Tapir"];

const TeamSelection = () => {
  return (
    <div>
      {teams.map(team => <Team name={team} key={team}/>)}
    </div>
  );
};

export default TeamSelection;
