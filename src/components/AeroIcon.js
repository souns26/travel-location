import plane from "../icons/plane.svg";
import { useState, useRef } from "react";
import { gsap } from "gsap";
import MainPage from "./MainPage";

const AeroIcon = () => {
  const [state, setState] = useState({
    clicked: null,
  });

  let logoItem = useRef(null);
  let mainPage;

  function handleClick() {
    setState({ clicked: true });

    gsap.to(logoItem, {
      y: -1030,
      duration: 3, //2,
    });
  }

  if (state.clicked === true) {
    mainPage = <MainPage state = { state } />;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <img
        ref={(el) => {
          logoItem = el;
        }}
        alt=""
        src={plane}
        className="Aero-logo"
        onClick={handleClick}
      />
      {mainPage}
    </div>
  );
};

export default AeroIcon;
