import { async } from '@angular/core/testing';
import { BusStopService } from './../../services/bus-stop.service';
import { BusStops } from './../../bus-stops.model';
import { Component, OnInit } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';


declare const google: any;


interface Marker {
lat: number;
lng: number;
label?: string;
 
draggable?: boolean;
}
@Component({
  selector: 'app-busstop-select',
  templateUrl: './busstop-select.component.html',
  styleUrls: ['./busstop-select.component.css']
})
export class BusstopSelectComponent implements OnInit {
    location: Location;
    state$: Observable<object>;
    myVar : any;
    private busStop: BusStops =new BusStops();
  constructor(private firestore: AngularFirestore,location: Location,public Route: ActivatedRoute,private route: Router,private BusStopService :BusStopService,private toastr: ToastrService ) {
      this.location = location;
   }

  ngOnInit() {
    
    // console.log(this.Route.snapshot.paramMap.getAll("name"));
    this.busStop.name = this.Route.snapshot.paramMap.getAll("name").toString();
    // this.BusStopService.createBusStop({
    //     "name": this.busStop.name,
    // }).catch(error=>{
        
    //     this.toastr.error(error.message, 'Failed');
       
    //   }).then(()=>{
    //     this.toastr.success("Sent Successfully", 'SUCCESS');
    //   });
    
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
   
          
    var marker = new google.maps.Marker({
        position: myLatlng,
        title: "Hello World!",

    });

    let infoWindow = new google.maps.InfoWindow({
        content: "Click the map to get select location",
        position: myLatlng,
      });
      infoWindow.open(map);
    
    
    marker.setMap(map);
    map.addListener("click",async (mapsMouseEvent) => {
        // Close the current InfoWindow.
        infoWindow.close();
        console.log( JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2
         ))
         var temp = JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2
         );
         console.log();
        
        this.firestore.collection('busStops').add({
        "name": this.busStop.name,
         "latitude" : mapsMouseEvent.latLng.toJSON()["lat"],
         "longitude" : mapsMouseEvent.latLng.toJSON()["lng"],

    }).catch(error=>{
        
        this.toastr.error(error.message, 'Failed');
       
      }).then(docRef=>{
       
            this.toastr.success("Sent Successfully", 'SUCCESS');
            this.location.back();
      
      });
          
        //this.busStop.latitude = mapsMouseEvent.latLng
        // Create a new InfoWindow.
        // infoWindow = new google.maps.InfoWindow({
        //   position: mapsMouseEvent.latLng,
        // });
        // infoWindow.setContent(
        //   JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2
        // );
        // infoWindow.open(map);
      });
  }


}
