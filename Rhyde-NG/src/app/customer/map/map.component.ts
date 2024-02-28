import { Component } from '@angular/core';
// import { LeafletModule } from '@asymmetrik/ngx-leaflet';
// import * as Leaflet from 'leaflet'

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {

  // constructor(){}

  // options: Leaflet.MapOptions = {
  //   layers: getLayers(),
  //   zoom: 12,
  //   center: new Leaflet.LatLng(43.530147, 16.488932)
  // };

}

// export const getLayers = (): Leaflet.Layer[] => {
//   return [
//     new Leaflet.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; OpenStreetMap contributors'
//     } as Leaflet.TileLayerOptions),
//   ] as Leaflet.Layer[]; 
// };