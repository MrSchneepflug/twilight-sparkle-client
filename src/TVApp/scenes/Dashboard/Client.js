import React from "react";

const Client = ({id, name, estimation}) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
    </tr>
  );
};

export default Client;
