// src/components/MapComponent.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Personalizzazione dell'icona del marker
const customMarkerIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // URL dell'icona personalizzata
  iconSize: [32, 32], // Dimensioni dell'icona
  iconAnchor: [16, 32], // Punto dell'icona che corrisponderà alla posizione del marker
  popupAnchor: [0, -32], // Punto del popup che corrisponderà alla posizione del marker
});

const center = {
  lat: 37.919236,
  lng: 13.936539
};

const MapComponent = () => {
  const tomtomApiKey = 'UMV1Glp9BfPiNdAdY3h7MkpPD5yBDFrC';

  return (
    <MapContainer center={center} zoom={15} style={{ height: "300px", width: "80%" }}>
      <TileLayer
        url={`https://api.tomtom.com/map/1/tile/basic/main/{z}/{x}/{y}.png?key=${tomtomApiKey}`}
        attribution='&copy; <a href="https://developer.tomtom.com">TomTom</a> contributors'
      />
      <Marker position={center} icon={customMarkerIcon}>
        <Popup>
          Via Vincenzo Florio, n 23, 90016 Collesano PA
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapComponent;



