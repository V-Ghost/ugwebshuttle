import { BusStops } from './../bus-stops.model';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ShuttleServiceService } from 'app/services/shuttle-service.service';
import { Shuttle } from 'app/shuttle.model';

declare const google: any;

interface Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable?: boolean;
}
@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
    policies: any[] = [];
    constructor(private firestore: AngularFirestore, private policyService: ShuttleServiceService) { }
    markers : any[] = [];
    ngOnInit() {

        var myLatlng = new google.maps.LatLng(5.637255296908295, -0.18530727364529917);
        var mapOptions = {
            zoom: 13,
            center: myLatlng,
            scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
            styles: [{
                "featureType": "water",
                "stylers": [{
                    "saturation": 43
                }, {
                    "lightness": -11
                }, {
                    "hue": "#0088ff"
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [{
                    "hue": "#ff0000"
                }, {
                    "saturation": -100
                }, {
                    "lightness": 99
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#808080"
                }, {
                    "lightness": 54
                }]
            }, {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ece2d9"
                }]
            }, {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ccdca1"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#767676"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "poi",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "landscape.natural",
                "elementType": "geometry.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#b8cb93"
                }]
            }, {
                "featureType": "poi.park",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "poi.sports_complex",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "poi.medical",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "poi.business",
                "stylers": [{
                    "visibility": "simplified"
                }]
            }]

        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);





        // let infoWindow = new google.maps.InfoWindow({
        //     content: "Click the map to get select location",
        //     position: myLatlng,
        // });
        // infoWindow.open(map);



        var k = 0;
        // const query = this.firestore.collection('cities');
        this.policyService.getPolicies().subscribe(data => {
            if (k > 0) {
               for(var i = 0 ; i < this.policies.length;i++){

                        this.markers[i].setMap(null);
                    }
                    this.policies = [];
                    this.markers = [];
            }

            this.policies = data.map(e => {
                let payload = {
                    id: e.payload.doc.id,
                    ...e.payload.doc.data() as {}
                }





                return payload as any;
            })

           
            k++;
          
           
            for(var i = 0 ; i < this.policies.length;i++){

                var latlng = new google.maps.LatLng(Number(this.policies[i].latitude), Number(this.policies[i].longitude));
                const infoWindow = new google.maps.InfoWindow({
                    content: this.policies[i].id
                  });
            
                var marker = new google.maps.Marker({
                    position: latlng,
                    title: this.policies[i].id,
                    id : this.policies[i].id
                });
                marker.addListener("click", () => {
                    infoWindow.open(map);
                  });
            
                this.markers.push(marker);
                marker.setMap(map);
            }

        })

       
    }
  
}
