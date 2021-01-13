<template>
  <div id="map"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl';

export default {
  data() {
    return {
      mapToken:
        'pk.eyJ1Ijoiam9uYXNzY2htZWR0bWFubiIsImEiOiJjam54ZmM5N3gwNjAzM3dtZDNxYTVlMnd2In0.ytpI7V7w7cyT1Kq5rT9Z1A',
    };
  },
  props: ['tour'],
  mounted() {
    const mapStylesheet = document.createElement('link');
    mapStylesheet.setAttribute(
      'href',
      'https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css',
    );
    mapStylesheet.setAttribute('rel', 'stylesheet');
    document.head.appendChild(mapStylesheet);

    this.createMap();
  },
  methods: {
    createMap() {
      mapboxgl.accessToken = this.mapToken;

      const geojson = {
        type: 'FeatureCollection',
      };

      geojson.features = this.tour.locations.map((el) => ({
        type: 'Feature',
        geometry: {
          type: el.type,
          coordinates: el.coordinates,
        },
        properties: {
          description: el.description,
        },
      }));

      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/jonasschmedtmann/cjnxfn3zk7bj52rpegdltx58h', // stylesheet location
        scrollZoom: false,
        interactive: false,
      });

      const bounds = new mapboxgl.LngLatBounds();
      const routeCoordinates = [];

      geojson.features.forEach((marker) => {
        const el = document.createElement('div');
        el.className = 'marker';

        new mapboxgl.Marker({
          element: el,
          anchor: 'bottom',
        })
          .setLngLat(marker.geometry.coordinates)
          .addTo(this.map);

        new mapboxgl.Popup({
          offset: 30,
          closeOnClick: false,
        })
          .setLngLat(marker.geometry.coordinates)
          .setHTML(`<p>${marker.properties.description}</p>`)
          .addTo(this.map);

        bounds.extend(marker.geometry.coordinates);
        routeCoordinates.push(marker.geometry.coordinates);
      });

      this.map.fitBounds(bounds, {
        padding: {
          top: 200,
          bottom: 150,
          left: 50,
          right: 50,
        },
      });

      this.map.on('load', () => {
        this.map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: routeCoordinates,
              },
            },
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#55c57a',
            'line-opacity': 0.6,
            'line-width': 3,
          },
        });
      });
    },
  },
};
</script>

<style>
</style>
