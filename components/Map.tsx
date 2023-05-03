import styled from "styled-components";
import { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapContainer = styled.div`
  height: 400px;
`;

const Sidebar = styled.div`
  background-color: rgba(35, 55, 75, 0.9);
  color: #fff;
  padding: 6px 12px;
  /* z-index: 1; */
  /* position: absolute; */
  /* top: 0; */
  /* left: 0; */
  margin: 12px;
  border-radius: 4px;
`;

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN ?? "";

export default function Map() {
  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/chrstphrddtz/clh7tk8zl00wj01qydpdu22g7",
      center: [9.6401, 50.7214], // center map on Chad
      zoom: 4.57,
    });
  }, []);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, []);

  return (
    <>
      <Sidebar className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </Sidebar>
      <MapContainer className="map-container" ref={mapContainer} />
    </>
  );
}
