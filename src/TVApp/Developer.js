import React from "react";

const Developer = ({name, estimation}) => {
  return (
    <tr>
      <td>
        <strong>{name}</strong>
      </td>
      <td>
        {estimation}
      </td>
    </tr>
  );
};

export default Developer;
