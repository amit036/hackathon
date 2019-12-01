import React from "react";
import ParticleField from "react-particles-webgl";
import "./../App.css";
import Navbar from "./Navbar";

function LandingPage() {
  const config = {
    showCube: false,
    dimension: "2D",
    velocity: 2.5,
    boundaryType: "bounce",
    antialias: true,
    direction: {
      xMin: -1,
      xMax: 1,
      yMin: -1,
      yMax: 1,
      zMin: -1,
      zMax: 1
    },
    lines: {
      colorMode: "solid",
      color: "#3FB568",
      transparency: 0.9,
      limitConnections: true,
      maxConnections: 20,
      minDistance: 60,
      visible: true
    },
    particles: {
      colorMode: "solid",
      color: "#3FB568",
      transparency: 0.9,
      shape: "circle",
      boundingBox: "canvas",
      count: 300,
      minSize: 40,
      maxSize: 60,
      visible: true
    },
    cameraControls: {
      enabled: false,
      enableDamping: true,
      dampingFactor: 0.2,
      enableZoom: true,
      autoRotate: false,
      autoRotateSpeed: 0.3,
      resetCameraFlag: true
    }
  };

  return (
    <div className="App">
      <div className="offset-5">
      <Navbar/>
      </div>

      <ParticleField config={config} />
      <img className="hint-overlay" src="https://i.graphicmama.com/uploads/2019/3/5c98cbdd6241b-Italian%20Chef%20Cartoon%20Vector%20Character.png" style={{height:"750px"}}></img>
      <div className="hint-overlay1">
      <img className="hint-overlay2" src="https://i.graphicmama.com/uploads/2019/3/5c9a37738322e-Cartoon%20Cook%20Vector%20Character.png" style={{height:"750px"}}></img>
      </div>
    </div>
  );
}
export default LandingPage