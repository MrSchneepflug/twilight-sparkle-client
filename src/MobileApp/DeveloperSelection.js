import React from "react";
import Developer from "./Developer";

const DeveloperSelection = ({selectedTeam, selectedDeveloper, selectedDevelopers, developerSelectionHandler, resetTeamSelectionHandler}) => {
  const developersByTeam = {
    Alpakka: ["PD", "TH", "BP"],
    Einhorn: ["TK", "TW", "MS", "JJ"],
    Irbis: ["AD", "ML", "SI", "TB"],
    Kea: ["CD", "DM", "PN", "TW", "PB"],
    Raccoon: ["AF", "SB", "IE"],
    Tapir: ["SD", "AO", "PC", "SG"]
  };

  const developerSelections = developersByTeam[selectedTeam].map(developer => {
    const isDeveloperSelected = selectedDevelopers.indexOf(developer) !== -1;
    const isSelf = developer === selectedDeveloper;

    return (
      <Developer
        isSelf={isSelf}
        isDeveloperSelected={isDeveloperSelected}
        developerSelectionHandler={developerSelectionHandler}
        name={developer}
        key={developer}
      />
    );
  });

  const style = {
    textAlign: "center",
    padding: "20px"
  };

  return (
    <div>
      <div style={style}>
        <strong onClick={resetTeamSelectionHandler}>back</strong>
      </div>
      <hr/>
      {developerSelections}
    </div>
  );
};

export default DeveloperSelection;
