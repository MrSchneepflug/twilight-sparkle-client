import React from "react";
import List from "material-ui/List";
import Team from "./Team";

const teams = ["Alpakka", "Einhorn", "Irbis", "Kea", "Raccoon", "Tapir"];

const TeamSelection = () => {
  return (
    <List>
      {teams.map(team => <Team name={team} key={team}/>)}
    </List>
  );
};

export default TeamSelection;
