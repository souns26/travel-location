import { useState, useEffect, useRef } from "react";
import Maps from "./Maps";
import { ThreeDots } from "react-loader-spinner";

function GetLocation(location) {
  const API_KEY = "5ae2e3f221c38a28845f05b6259a29973e54a21d2ea41327334defad";
  const RADIUS = 1000;

  const [mapLocation, setMapLocation] = useState(null);
  const [loading, setLoading] = useState(null);

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
  useEffect(() => {
    setLoading(true);
    let lat_lon = [];
    const url =
      "https://api.opentripmap.com/0.1/en/places/geoname?apikey=" +
      API_KEY +
      "&name=" +
      location.location.capital;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        lat_lon.push([data.lat, data.lon]);
        const url =
          "https://api.opentripmap.com/0.1/en/places/radius?apikey=" +
          API_KEY +
          "&radius=" +
          RADIUS +
          "&lon=" +
          data.lon +
          "&lat=" +
          data.lat +
          "&rate=2&limit=10";
        fetch(url)
          .then((response) => response.json())
          .then(async (data) => {
            let array = [];
            for (const i in data.features) {
              await sleep(150);
              let xid = data.features[i].properties.xid;
              const url =
                "https://api.opentripmap.com/0.1/en/places/xid/" +
                xid +
                "?apikey=" +
                API_KEY;
              fetch(url)
                .then((response) => response.json())
                .then((data) => {
                  array.push(data);
                });
            }
            setMapLocation([array, lat_lon]);
            setLoading(false);
          });
      });
  }, []);

  // console.log("mapLocation",typeof(loading));

  return (
    <div>
      <ThreeDots 
        visible={loading}
        type="ThreeDots"
        color="#00BFFF"
        height={80}
        width={80}
      />
      {mapLocation && <Maps xid={mapLocation} />}{" "}
    </div>
  );
}

export default GetLocation;
