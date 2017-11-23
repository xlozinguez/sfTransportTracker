import { Component, Element, Prop, State } from '@stencil/core';

const GMAPS_API_KEY = 'FOO';

@Component({
  styleUrl: 'sf-map.scss',
  tag: 'sf-map'
})
export class SfMap {
  @Prop() public latitude: string;
  @Prop() public longitude: string;
  @Prop() public radius: string;

  @State() public mapReady: boolean = false;

  @Element() public mapEl: HTMLElement;

  public map: null;


  public componentWillLoad() {
    this.initMap();
  }

  public componentDidLoad() {
    this.loadMap();
  }

  public render() {
    return (
      <div id="map">
        <sf-vehicle />
      </div>
    );
  }

  // Initialize google map script
  private initMap = () => {
    const gMapsScript = document.createElement('script');
    gMapsScript.setAttribute('async', '');
    gMapsScript.setAttribute('defer', '');
    gMapsScript.setAttribute('src', `https://maps.googleapis.com/maps/api/js?key=${GMAPS_API_KEY}`);
    this.mapEl.appendChild(gMapsScript);
  }

  // Load map and set to the current position
  private loadMap = () => {
    let timeout = null;
    // Check for map being loaded
    if (!window.hasOwnProperty('google')) {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
      timeout = window.setTimeout(()=>{
        this.loadMap();
      }, 1000);
    } else {
      clearTimeout(timeout);
      // Create the map and set the current position
      const latlng = new (window as any).google.maps.LatLng(+this.longitude,+this.latitude);
      this.map = new (window as any).google.maps.Map(this.mapEl, {
        center: latlng,
        zoom: 13
      });
    }
  }
}