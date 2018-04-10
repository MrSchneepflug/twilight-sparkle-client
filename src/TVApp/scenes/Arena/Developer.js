import React from "react";

const Developer = ({name, estimation, countdown}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{estimation}</td>
      <td>{countdown}</td>
    </tr>
  );
};

export default Developer;
