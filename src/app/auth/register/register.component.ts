import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../../shared/api.service';

import { GoogleMapsAPIWrapper, MapsAPILoader } from 'angular2-google-maps/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    items: Array <any> = [{
    	id: 1,
    	text: 'Customer'
    }, {
    	id: 2,
    	text: 'Mechanic'
    }];
    userType: any = {};
    lat: number = 51.678418;
    lng: number = 7.809007;
    zoom: number = 15;
    searchControl: FormControl;

    @ViewChild("search") searchElementRef: ElementRef;

    constructor(
        private googleMaps: GoogleMapsAPIWrapper,
    	private mapsAPILoader: MapsAPILoader,
    	private ngZone: NgZone,
    	private router :Router,
        private apiService: ApiService
    ) {
        this.registerForm = new FormGroup({
            username: new FormControl(),
            email: new FormControl(),
            password: new FormControl(),
            confirmPassword: new FormControl(),
            userType: new FormControl(),
            contactNo: new FormControl()
        });
    	this.searchControl = new FormControl();
    }

    ngOnInit() {
        console.log(this.googleMaps);
        navigator.geolocation.getCurrentPosition((position) => {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
        }, function() {});

        this.mapsAPILoader.load().then(() => {
        	let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", () => {
            	this.ngZone.run(() => {
	                //get the place result
	                let place: google.maps.places.PlaceResult = autocomplete.getPlace();

	                //verify result
	                if (place.geometry === undefined || place.geometry === null) {
	                    return;
	                }

	                //set latitude, longitude and zoom
	                this.lat = place.geometry.location.lat();
	                this.lng = place.geometry.location.lng();
	                let latLng = {
	                	lat: this.lat,
	                	lng: this.lng
	                }
	                this.googleMaps.setCenter(latLng);
	                // this.sharedDataService.setLatLng(latLng);
            	});
            });
        });
    }

    selected(value: any): void {
        console.log(value);
        this.userType = value;
    }

    refreshValue(value: any): void {
        console.log(value);
        this.userType = value;
    }

    submit(): void {
        console.log(this.registerForm.value);
    }

	dragEnd(event) {
	    console.log(event);
	    let latLng = {
        	lat: event.coords.lat,
        	lng: event.coords.lng
        };
	    // this.sharedDataService.setLatLng(latLng);
	}
}

