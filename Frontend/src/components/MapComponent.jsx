// src/components/MapComponent.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Risolve problemi con l'icona di Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://img.freepik.com/free-vector/location_53876-25530.jpg?size=338&ext=jpg&ga=GA1.1.1413502914.1719878400&semt=ais_user',
  iconUrl: 'https://img.freepik.com/free-vector/location_53876-25530.jpg?size=338&ext=jpg&ga=GA1.1.1413502914.1719878400&semt=ais_user',
//   shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const center = {
  lat: 	37.923299, 
  lng: 	13.939015 
};

const MapComponent = () => {
  return (
    <MapContainer center={center} zoom={15} style={{ height: "300px", width: "80%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={center}>
        <Popup>
          Via Vincenzo Florio, n 23, 90016 Collesano PA
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default MapComponent;
