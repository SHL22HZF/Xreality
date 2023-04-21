import React from "react";

const Text = ({ value, position, scale="3 3 3", color="gold" }) => {
  return (
    <>
      <a-text
        value={value}
        position={position}
        color={color}
        scale={scale}
      ></a-text>
    </>
  );
};

export default Text;
