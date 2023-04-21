import React from 'react'

 const labels = [
   { position: "-13 0.5 -6.9", text: "Ford" },
   { position: "-13, 0.5 -3.9", text: "Dodge" },
   { position: "-13, 0.5 -0.9", text: "Chevrolet" },
   { position: "-13, 0.5 2.1", text: "Toyota" },
   { position: "-13, 0.5 5.1", text: "Mercedes" },
   { position: "-13, 0.5 8.1", text: "Mitsubishi" },
 ];

const Label = () => {
  return (
    <a-entity>
      {labels.map((item, i) => {
        return (
          <a-text
            key={i}
            value={item.text}
            position={item.position}
            color="blue"
            align="left"
            scale="4 4 4"
          ></a-text>
        );
      })}
    </a-entity>
  );
}

export default Label