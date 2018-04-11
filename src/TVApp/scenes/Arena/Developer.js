import React from "react";

const Developer = ({developer, estimation, countdown}) => {
  return (
    <tr>
      <td>{developer}</td>
      <td>{estimation}</td>
      <td>{countdown}</td>
    </tr>
  );
};

export default Developer;
