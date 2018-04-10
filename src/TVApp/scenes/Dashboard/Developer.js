import React from "react";

const Developer = ({id, name}) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
    </tr>
  );
};

export default Developer;
