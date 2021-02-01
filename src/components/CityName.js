import { useEffect, useRef, useState } from "react";
import GetLocation from "./GetLocation";
import { gsap } from "gsap";

function CityName({ state }) {
  let cityName = useRef(null);
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (state.clicked === true) {
      gsap.fromTo(cityName, {opacity: 0}, {opacity: 1, duration: 50 , ease: "elastic"});

      const url = "https://restcountries.eu/rest/v2/all?fields=name;capital"; //"https://countriesnow.space/api/v0.1/countries/capital";
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data.length);
          // let datas = data.data;
          let selectedCity = data[Math.floor(Math.random() * data.length)];
          setCity(selectedCity.capital + ", " + selectedCity.name);
          setLocation(selectedCity)
          // console.log("1", city);
        });
    }
  }, []);

  // console.log("2", location,city);

  return (
    <div>
      <div ref={(el) => (cityName = el)} className="city-name">
        {city}
      </div>
      { location && (<GetLocation location = { location }/>)}
      {/* <div
        data-skyscanner-widget="LocationWidget"
        data-locale="en-US"
        data-market="IN"
        data-currency="INR"
        data-origin-geo-lookup="true"
        data-destination-name={city.capital}
      ></div> */}
    </div>
  );
}

export default CityName;
