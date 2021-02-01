import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import CityName from "./CityName";

function MainPage({ state }) {
  let mainPage = useRef(null);

  useEffect(() => {
    if (state.clicked === true) {
      gsap.from(mainPage, {
        y: 650,
        duration: 1.25, //0.75,
        height: 0,
        skewY: 2,
        ease: "none",
      });
    }
  });

  return (
    <div>
      <div ref={(el) => (mainPage = el)} className="main-page">
        <CityName state = { state }/>
      </div>
    </div>
  );
}

export default MainPage;
