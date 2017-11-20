import { Component, Prop, Element, State } from '@stencil/core';

const GMAPS_API_KEY = 'FOO';

@Component({
  tag: 'sf-map',
  styleUrl: 'sf-map.scss'
})
export class SfMap {
  @Prop() longitude: string;
  @Prop() latitude: string;
  @Prop() radius: string;

  @State() mapReady: boolean = false;

  @Element() mapEl: HTMLElement;

  map: null;

  // Initialize google map script
  _initMap = () => {
    var gMapsScript = document.createElement('script');
    gMapsScript.setAttribute('async', '');
    gMapsScript.setAttribute('defer', '');
    gMapsScript.setAttribute('src', `https://maps.googleapis.com/maps/api/js?key=${GMAPS_API_KEY}`);
    this.mapEl.appendChild(gMapsScript);
  }

  // Load map and set to the current position
  _loadMap = () => {
    var timeout = null;
    // Check for map being loaded
    if (!window.hasOwnProperty('google')) {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
      timeout = window.setTimeout(()=>{
        this._loadMap();
      }, 1000);
    } else {
      clearTimeout(timeout);
      // Create the map and set the current position
      let latlng = new (window as any).google.maps.LatLng(+this.longitude,+this.latitude);
      this.map = new (window as any).google.maps.Map(this.mapEl, {
        center: latlng,
        zoom: 13
      });
    }
  }

  componentWillLoad() {
    this._initMap();
  }

  componentDidLoad() {
    this._loadMap();
  }

  render() {
    return (
      <div id="map">
        <sf-vehicle />
      </div>
    );
  }
}