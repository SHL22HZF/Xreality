import { useEffect, useRef, useState } from "react";
import data from "../carData.json";
import "./App.css";

function App() {
  const [toyotaData, setToyotaData] = useState([]);
  const [fordData, setFordData] = useState([]);
  const [dodgeData, setDodgeData] = useState([]);
  const [chevroletData, setChevroletData] = useState([]);
  const [mercedesData, setMercedesData] = useState([]);
  const [mitsubishiData, setMitsubishiData] = useState([]);

  const toyotaRef = useRef(null);
  const fordRef = useRef(null);
  const dodgeRef = useRef(null);
  const chevRef = useRef(null);
  const mercedesRef = useRef(null);
  const mitsubishiRef = useRef(null);

  useEffect(() => {
    const setCars = (set, name) => {
      const getCar = data.filter((car) => car.Manufacturer === name);
      set(getCar);
    };

    setCars(setMitsubishiData, "Mitsubishi");
    setCars(setToyotaData, "Toyota");
    setCars(setFordData, "Ford");
    setCars(setDodgeData, "Dodge");
    setCars(setChevroletData, "Chevrolet");
    setCars(setMercedesData, "Mercedes-B");
  }, []);

  const setObject = (ref, dat, position, color) => {
    const heightScale = d3.scaleLinear().domain([0, 550]).range([0, 11]);
    const baseY = 0;

    d3.select(ref)
      .selectAll("a-cylinder")
      .data(dat)
      .join("a-cylinder")
      .attr("height", (d) => heightScale(d.Sales_in_thousands))
      .attr("radius", 0.8)
      .attr("position", (d, i) => {
        const x = i * 1.9 - 8;
        const y = heightScale(d.Sales_in_thousands) / 2 + baseY;
        const z = position;
        return `${x} ${y} ${z}`;
      })
      .attr("color", color);
  };

  useEffect(() => {
    if (toyotaData.length > 0) {
      setObject(toyotaRef.current, toyotaData, "-1", "blue");
    }
    if (fordData.length > 0) {
      setObject(fordRef.current, fordData, "-7", "red");
    }
    if (dodgeData.length > 0) {
      setObject(dodgeRef.current, dodgeData, "-5", "yellow");
    }
    if (chevroletData.length > 0) {
      setObject(chevRef.current, chevroletData, "-3", "brown");
    }
    if (mercedesData.length > 0) {
      setObject(mercedesRef.current, mercedesData, "1", "orange");
    }
    if (mitsubishiData.length > 0) {
      setObject(mitsubishiRef.current, mitsubishiData, "3", "green");
    }
  }, [toyotaData]);

  return (
    <div className="App">
      <a-scene>
        {toyotaData.length > 1 && <a-entity ref={toyotaRef}></a-entity>}
        {fordData.length > 1 && <a-entity ref={fordRef}></a-entity>}
        {dodgeData.length > 1 && <a-entity ref={dodgeRef}></a-entity>}
        {chevroletData.length > 1 && <a-entity ref={chevRef}></a-entity>}
        {mercedesData.length > 1 && <a-entity ref={mercedesRef}></a-entity>}
        {mitsubishiData.length > 1 && <a-entity ref={mitsubishiRef}></a-entity>}

        <a-entity
          line="start: -9.2 -0.7 -8.5; end: -9.2 10 -8.5"
          line__2="start: 13.5 -0.7 -8.5; end: 13.5 10 -8.5"
          line__3="start: 13.5 -0.7 5; end: 13.5 10 5"
        ></a-entity>
        <a-entity></a-entity>
        <a-plane
          position="2 -0.5 -2"
          rotation="-90 0 0"
          width="24"
          height="17"
          color="gray"
        ></a-plane>
        <a-entity
          camera=""
          look-controls=""
          wasd-controls=""
          orbit-controls="target: 0 1.6 -0.5; minDistance: 0.5; maxDistance: 180; initialPosition: 2 5 30"
        ></a-entity>
      </a-scene>
    </div>
  );
}

export default App;
