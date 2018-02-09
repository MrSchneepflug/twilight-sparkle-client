import React, {Component} from "react";

const Developer = ({name, isSelf, isDeveloperSelected, developerSelectionHandler}) => {
  const clickHandler = () => {
    developerSelectionHandler(name);
  };

  const nullHandler = () => {
  };

  const style = {
    textAlign: "center",
    padding: "20px"
  };

  return (
    <div style={style} onClick={isDeveloperSelected ? nullHandler : clickHandler}>
      <strong>{name}{isDeveloperSelected && !isSelf ? " (selected)" : ""}</strong>
    </div>
  );
};

export default Developer;
