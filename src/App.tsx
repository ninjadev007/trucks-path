import { APIProvider } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import { apiKey as key } from "./utils"
import "./index.css"

function App() {
  let map;
  const [loaded,setLoaded]=useState(false)

  async function initMap({ pick, drop }: { pick: { lat: number, lng: number }, drop: { lat: number, lng: number } }) {
    var pointA = new google.maps.LatLng(pick.lat, pick.lng)
    var pointB = new google.maps.LatLng(drop.lat, drop.lng)
    var myOptions = {
      zoom: 7,
      center: pointA
    }
    const { Map } = await (globalThis as any).google.maps.importLibrary("maps");
    map = new Map(document.getElementById("extension-map-load"), myOptions);
    let directionsService = new google.maps.DirectionsService
    let directionsDisplay = new google.maps.DirectionsRenderer({
      map: map
    })
    calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);
  }
  function calculateAndDisplayRoute(directionsService: any, directionsDisplay: any, pointA: any, pointB: any) {
    directionsService.route({
      origin: pointA,
      destination: pointB,
      avoidTolls: true,
      avoidHighways: false,
      travelMode: google.maps.TravelMode.DRIVING
    }, function (response: any, status: any) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  useEffect(() => {
    if(!loaded) return
    const params = new URLSearchParams(window.location.search) as any;
    const query: any = {};
    for (const [key, value] of params) {
      query[key] = value;
    }
    if (!query.drop_latitude || !query.drop_longitude) return
    if (!query.pick_latitude || !query.pick_longitude) return
    initMap({
      drop: {
        lat: Number(query.drop_latitude),
        lng: Number(query.drop_longitude)
      },
      pick: {
        lat: query.pick_latitude,
        lng: query.pick_longitude
      }
    })
  }, [loaded])
  return (
    <APIProvider apiKey={key} onLoad={() => setLoaded(true)}>
      <div style={{ width: "100vw", height: "100vh", borderWidth: 1 }} id="extension-map-load">

      </div>
    </APIProvider>
  )
}

export default App
