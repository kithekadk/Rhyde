
import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
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
  index!: number
  hidelist = true

  currentLat!: number
  currentLong!: number

  matchingLocations: any[] = []

  // accssing directions

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private elementRef: ElementRef) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude
        const long = position.coords.longitude

        this.currentLat = lat
        this.currentLong = long

        import('leaflet').then((Leaflet) => {
          this.map = Leaflet.map('map', {
            center: [lat, long], // Initial map center coordinates
            zoom: 20 // Initial zoom level
          });

          Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(this.map);

          const customIcon = Leaflet.icon({
            iconUrl: 'assets/marker.png',
            iconSize: [35, 35],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76]
          });

          this.markersLayer = Leaflet.layerGroup().addTo(this.map);

          // adding marker
          const marker = Leaflet.marker([lat, long], {icon: customIcon}).addTo(this.map)

          marker.bindPopup('You').openPopup()

          this.map.setView([lat, long], 10);
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

        const countryCode = 'KE'

        fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&bounded=1&countrycodes=${countryCode}`)
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

  getLocationCoordsForSelectedLocation(index: number) {

    this.hidelist = true

    this.index = index

    if (isPlatformBrowser(this.platformId)) {
      import('leaflet').then((Leaflet) => {
        if (this.matchingLocations.length > 0) {
          const { lat, lon } = this.matchingLocations[this.index];
          console.log(((Number(lat) + Number(this.currentLat)) / 2));

          this.map.setView([((Number(lat) + Number(this.currentLat)) / 2), ((Number(lon) + Number(this.currentLong)) / 2)], 8);
          const marker = Leaflet.marker([lat, lon]).addTo(this.map)

          marker.bindPopup(this.matchingLocations[index].name).openPopup()
          this.addMarker([lat, lon]);


        } else {
          console.error('Location not found');
        }
      }
      )
    }
  }

  addMarker(coordinates: [number, number]): void {
    if (isPlatformBrowser(this.platformId)) {
      import('leaflet').then((Leaflet) => {

        // Clear existing markers
        this.map.eachLayer((layer: { _url: any; }) => {
          if (!layer._url) {

            this.map.removeLayer(layer);
          }
        }); 
        this.drawRoute(Leaflet.latLng(this.currentLat, this.currentLong), Leaflet.latLng(coordinates[0], coordinates[1]))
        
        const customIcon = Leaflet.icon({
          iconUrl: 'assets/marker.png',
          iconSize: [35, 35],
          iconAnchor: [22, 94],
          popupAnchor: [-3, -86]
        });

        Leaflet.marker(coordinates ,{icon:customIcon}).addTo(this.map);

      })
    }
  }

  drawRoute(startPoint: L.LatLngExpression, endPoint: L.LatLngExpression) {
    import('leaflet-routing-machine').then(() => {
        import('leaflet').then((L) => {
          if (this.map) {
            const control = L.Routing.control({
              waypoints: [
                L.latLng(startPoint),
                L.latLng(endPoint)
              ],
              routeWhileDragging: true,
              lineOptions: {
                styles:[{color:'red', weight: 5,
                }],
                missingRouteTolerance: 2,
                extendToWaypoints: true
              }
            }).addTo(this.map);
            // console.log(startPoint);
            // console.log(endPoint);

            setTimeout(() => {
              this.getDirection()
            }, 1000);
          }
        })
      }
    )
  }

  getDirection(){
    const parentElement = this.elementRef.nativeElement.getElementsByClassName('leaflet-routing-alt ')[0]
    console.log(parentElement );

    if (parentElement) {
        // Accessing text content of parent element without tags
      const textContent = parentElement.innerText;

      // Replace newline characters with comma and trim excess whitespace
      const formattedText = textContent.replace(/\n/g, ',').trim();

      console.log(formattedText);

      const utterence = new SpeechSynthesisUtterance(formattedText)

      const voices = speechSynthesis.getVoices()

      console.log(voices);
      utterence.voice = voices[0] 

      speechSynthesis.speak(utterence)
      
    }
  }

  // createFence(){
  //   import('leaflet').then((Leaflet) => {
  //     const nyeriBounds = Leaflet.latLngBounds([5.0, 33.9], [-4.7, 42.0])
  //     Leaflet.rectangle(nyeriBounds, {color: "", weight: 1, fillOpacity: 0.2}).addTo(this.map);
  //   })
  // }
}
