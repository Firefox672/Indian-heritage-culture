import React from "react";
import Navbar from "./Navbar";

const Comingsoon = () => {
  return (
    <div>
      <Navbar />
      <div
        style={{
          marginTop: 270,
          padding: 40,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            padding: 30,
            margin: 10,
            borderRadius: "50rem",
            maxWidth: 800,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            overflow: "hidden",
            zIndex: 1,
          }}
        >
          <h1
            style={{
              color: "white",
            }}
          >
            Adding Valuable data by Experts Soon...
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Comingsoon;
