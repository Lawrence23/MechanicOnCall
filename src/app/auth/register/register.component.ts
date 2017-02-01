import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../../shared/api.service';

import { GoogleMapsAPIWrapper, MapsAPILoader } from 'angular2-google-maps/core';
import { CustomValidators } from 'ng2-validation';

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
    vechicles: number = 1;
    count: number[];
    submitted: boolean

    @ViewChild("search") searchElementRef: ElementRef;

    constructor(
        private googleMaps: GoogleMapsAPIWrapper,
    	private mapsAPILoader: MapsAPILoader,
    	private ngZone: NgZone,
    	private router :Router,
        private apiService: ApiService
    ) {
        this.registerForm = new FormGroup({
            firstname: new FormControl('', Validators.required),
            lastname: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, CustomValidators.email]),
            passwordGroup: new FormGroup({
				password: new FormControl('', Validators.required),
				confirmPassword: new FormControl('', Validators.required)
			}, CustomValidators.equalTo),
            userType: new FormControl('', Validators.required),
            contactNo: new FormControl('', Validators.required)
        });
    	this.searchControl = new FormControl();
    	this.count = Array.from(Array(this.vechicles),(x,i)=>i);
    	this.submitted = false;
    }

    ngOnInit() {

    }

    selected(value: any): void {
        console.log(value);
        this.userType = value;
        this.registerForm.patchValue({
        	userType: value
        })
        if (this.userType.text === 'Mechanic') {
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
    }

    incrementCounter() :void {
    	this.vechicles++;
    	this.count = Array.from(Array(this.vechicles),(x,i)=>i);
    }

    refreshValue(value: any): void {
        console.log(value);
        this.userType = value;
    }

    submit(): void {
		this.submitted = true;
		if (this.registerForm.valid) {
			this.apiService.checkUser(this.registerForm.value).subscribe(
	            (data :any) => {
	                if (data.data.length === 0) {
	                	this.register();
	                }
	            },
	            (error :Error) => alert(error.message)
	        );
		}
    }

    register() :void {
    	switch (this.userType.text) {
    		case "Customer":
    			// code...
    			break;

    		case "Mechanic":
    			// code...
    			break;


    		default:
    			// code...
    			break;
    	}
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

