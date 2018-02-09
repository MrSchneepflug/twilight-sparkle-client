import React from "react";

const Team = ({teamSelectionHandler, name}) => {
  const clickHandler = () => {
    teamSelectionHandler(name);
  };

  const style = {
    textAlign: "center",
    padding: "20px"
  };

  return (
    <div style={style} onClick={clickHandler}>
      <strong>{name}</strong>
    </div>
  );
};

export default Team;
