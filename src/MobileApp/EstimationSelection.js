import React from "react";

const EstimationSelection = ({selectedEstimation, estimationSelectionHandler, resetHandler, resetDeveloperSelectionHandler}) => {
  const buildSelectionHandler = (number) => {
    return () => {
      estimationSelectionHandler(number)
    };
  };

  const buildEstimationSelection = estimation => {
    const style = {
      textAlign: "center",
      padding: "20px"
    };

    return (
      <div onClick={buildSelectionHandler(estimation)} style={style}>
        <strong>{estimation}{estimation === selectedEstimation ? " (selected)" : ""}</strong>
      </div>
    );
  };

  const estimationSelections = [1, 2, 3, 5, 8, 13, 20].map(estimation => {
    return buildEstimationSelection(estimation);
  });


  const style = {
    textAlign: "center",
    padding: "20px"
  };

  return (
    <div>
      <div style={style}>
        <strong onClick={resetDeveloperSelectionHandler}>back</strong>
      </div>

      <hr/>
      {estimationSelections}
      <hr/>

      <div style={style}>
        <span onClick={resetHandler}>RESET</span>
      </div>
    </div>
  );
};

export default EstimationSelection;
