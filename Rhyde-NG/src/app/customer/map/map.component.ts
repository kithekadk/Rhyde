
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {

  map: any;
  markersLayer: any;
  index!:number
  hidelist = true

  matchingLocations: any[]=[]

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude
        const long = position.coords.longitude


        import('leaflet').then((Leaflet) => {
          this.map = Leaflet.map('map', {
            center: [lat, long], // Initial map center coordinates
            zoom: 13 // Initial zoom level
          });

          Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(this.map);

          // adding marker
          const marker = Leaflet.marker([lat, long]).addTo(this.map)

          marker.bindPopup('You').openPopup()

          this.map.setView([lat, long], 16);
        }).catch((error) => {
          console.error('Error loading Leaflet:', error);
        });

      }), () => {
        console.log('Enable location to automate the process');

      }

    }
  }

  searchLocation(query: string) {
    this.hidelist = false
    if (isPlatformBrowser(this.platformId)) {
      import('leaflet').then((Leaflet) => {
        if (query.trim() === '') return;

        fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`)
          .then(response => {
            return response.json()
          })
          .then(data => {
            this.matchingLocations = data
            console.log(data);
          })
          .catch(error => console.error('Error searching location:', error));
      })
    }
  }

  getLocationCoordsForSelectedLocation(index:number){

    this.hidelist = true

    this.index = index

    if (isPlatformBrowser(this.platformId)) {
      import('leaflet').then((Leaflet) => {
    if (this.matchingLocations.length > 0) {
      const { lat, lon } = this.matchingLocations[this.index];
      
      this.map.setView([lat, lon], 16);
      const marker = Leaflet.marker([lat, lon]).addTo(this.map)

      marker.bindPopup(this.matchingLocations[index].name).openPopup()
      this.addMarker([lat, lon]);
    } else {
      console.error('Location not found');
    }
  }
      )
  }}

  addMarker(coordinates: [number, number]): void {
    if (isPlatformBrowser(this.platformId)) {
      import('leaflet').then((Leaflet) => {
        this.markersLayer.clearLayers(); // Clear existing markers
        Leaflet.marker(coordinates).addTo(this.markersLayer);
      })
    }
  }

}
