import { useEffect, useRef, useState } from "react";
import data from "../carData.json";
import * as d3 from "d3";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Label from "./Label";
import Axis from "./Axis";


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

const tooltip = (value) => {
  const el = document.createElement("a-text");
  el.setAttribute("id", "tooltip");
  el.setAttribute("position", "0 18 -1");
  el.setAttribute("value", value);
  el.setAttribute("align", "center");
  el.setAttribute("width", "3");
  el.setAttribute("height", "3");
  el.setAttribute("font", "https://cdn.aframe.io/fonts/Exo2Bold.fnt");
  el.setAttribute("color", "goldenrod");
  el.setAttribute("scale", "10 10 10");

  const scene = document.querySelector("a-scene");
  scene.appendChild(el);
};

const removeToolTip = () => {
  const scene = document.querySelector("a-scene");
  const el = document.getElementById("tooltip");
  scene.removeChild(el);
};

  const heightScale = d3.scaleLinear().domain([0, 550]).range([0, 17 ]);
  const baseY = 0;
  const tickValues = heightScale.ticks(10);

  const setObject = (ref, dat, position, color) => {
    
    d3.select(ref)
      .selectAll("a-cylinder")
      .data(dat)
      .join("a-cylinder")
      .attr("height", (d) => heightScale(d.Sales_in_thousands))
      .attr("radius", 0.8)
      .attr("position", (d, i) => {
        const x = i * 1.9 - 6.9;
        const y = heightScale(d.Sales_in_thousands) / 2 + baseY;
        const z = position;
        return `${x} ${y} ${z}`;
      })
      .attr("color", color)
      .on("click", (d, event) =>
        toast.info(
          <>
            <h2>Car data</h2>
            <h3>Manufacturer: {event.Manufacturer}</h3>
            <h3>Model: {event.Model}</h3>
            <h3>Price: ${Math.floor(event.Price_in_thousands)},000</h3>
            <h3>Horsepower: {event.Horsepower}hp</h3>
            <h3>Date of launch: {event.Latest_Launch}</h3>
          </>
        )
      )
      .on("mouseenter", (d, event) => {
        tooltip(event.Sales_in_thousands);
      })
      .on("mouseleave", () => removeToolTip());
      
   
  };

  useEffect(() => {
    if (toyotaData.length > 0) {
      setObject(toyotaRef.current, toyotaData, "2", "blue");
    }
    if (fordData.length > 0) {
      setObject(fordRef.current, fordData, "-7", "red");
    }
    if (dodgeData.length > 0) {
      setObject(dodgeRef.current, dodgeData, "-4", "yellow");
    }
    if (chevroletData.length > 0) {
      setObject(chevRef.current, chevroletData, "-1", "brown");
    }
    if (mercedesData.length > 0) {
      setObject(mercedesRef.current, mercedesData, "5", "orange");
    }
    if (mitsubishiData.length > 0) {
      setObject(mitsubishiRef.current, mitsubishiData, "8", "green");
    }
  }, [toyotaData]);

  return (
    <div className="App">
      <ToastContainer />
      <a-scene className="a-scene">
        <Label />
        <Axis />
        {toyotaData.length > 1 && <a-entity ref={toyotaRef}></a-entity>}
        {fordData.length > 1 && <a-entity ref={fordRef}></a-entity>}
        {dodgeData.length > 1 && <a-entity ref={dodgeRef}></a-entity>}
        {chevroletData.length > 1 && <a-entity ref={chevRef}></a-entity>}
        {mercedesData.length > 1 && <a-entity ref={mercedesRef}></a-entity>}
        {mitsubishiData.length > 1 && <a-entity ref={mitsubishiRef}></a-entity>}

        {tickValues.map((item, index) => (
          <a-entity key={index}>
            <a-entity
              line={`start: -9.2 ${heightScale(
                item
              )} -8.5; end: 13.5 ${heightScale(item)} -8.5; color: lightblue`}
            ></a-entity>
            <a-entity
              line={`start: 13.5 ${heightScale(
                item
              )} -8.5; end: 13.5 ${heightScale(item)} 8.5; color: lightblue`}
            ></a-entity>
            <a-text
              value={item}
              position={`13.8 ${heightScale(item)} 8.5`}
              color="blue"
              scale="3 3 3"
            ></a-text>
            <a-text
              value={item}
              position={`-10.8 ${heightScale(item)} -8.5`}
              color="blue"
              scale="3 3 3"
            ></a-text>
          </a-entity>
        ))}

        <a-plane
          position="0 -0.5 -2"
          rotation="-90 0 0"
          width="30"
          height="24"
          color="gray"
        ></a-plane>
        <a-entity
          camera=""
          look-controls=""
          wasd-controls=""
          orbit-controls="target: 0 1.6 -0.5; minDistance: 0.5; maxDistance: 180; initialPosition: 0 45 30"
          cursor-listener="true"
          emitevents="true"
          cursor="rayOrigin: mouse"
        ></a-entity>
      </a-scene>
    </div>
  );
}

export default App;
