import { useState, useRef, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { gsap } from "gsap";
import L from "leaflet";
import useScript from "../hooks/useScript";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-shadow.png";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function Maps(props) {
  // console.log("x",props.loading);
  useScript("https://widgets.skyscanner.net/widget-server/js/loader.js");

  const [activeLocation, setActiveLocation] = useState(null);
  let mapContainer = useRef(null)

  let locate = [];

  for (const i in props.xid[0]) {
    if (!props.xid[0][i].error) locate.push(props.xid[0][i]);
  }

  useEffect(() => {
  gsap.fromTo(mapContainer, {opacity: 0}, {opacity: 1, duration: 10 , ease: "elastic"});
  },[props]);

  return (
    <div ref={(el) => (mapContainer = el)}>
      <MapContainer center={props.xid[1][0]} zoom={14}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {locate.map((mark) => (
          <Marker
            key={mark.xid}
            position={[mark.point.lat, mark.point.lon]}
            eventHandlers={{
              click: (e) => {
                if (!activeLocation)
                  setActiveLocation(mark);
                else 
                  setActiveLocation(null);
              },
            }}
          />
        ))}

        {activeLocation && (
          <Popup
            position={[activeLocation.point.lat, activeLocation.point.lon]}
            eventHandlers={{
              close: (e) => {
                setActiveLocation(null);
              },
            }}
          >
            <div>
              <h2>{activeLocation.name}</h2>
              <a href={activeLocation.wikipedia} target="_blank" rel="noreferrer">
                { (activeLocation.preview.source) ? <img src={activeLocation.preview.source} width="100%" height="270px" alt="maps"></img> :<p>No Image</p> }
              </a>
            </div>
          </Popup>
        )}
      </MapContainer>
      <br></br>
      <div
        className="sky-widget"
        data-skyscanner-widget="LocationWidget"
        data-locale="en-US"
        data-market="IN"
        data-currency="INR"
        data-origin-geo-lookup="true"
        data-colour="loch"
        // data-destination-name="'London'"
      ></div>
    </div>
  );
}

export default Maps;
