AngularJS-Google-Places
=========

An angular.js wrapper around the Google Places API

Bower
--
This module is available as bower package, install it with this command:

```bash
bower install angularjs-google-places
```
or

```bash
bower install git://github.com/arunisrael/angularjs-google-places.git
```

Usage
--
- Add gPlaces as a dependency
- Set your API key in the setOptions method of the gPlacesAPIProvider
- Inject gPlacesAPI as a dependency to your controller or other service
- Invoke the placeSearch method and pass in a latitude/longitude
- Invoke the placeDetails method and pass in a google places api reference

Example
--
```
var myApp = angular.module('myApp',['gPlaces']);

myApp.config(function(gPlacesAPIProvider){
  gPlacesAPIProvider.setOptions({
    key:'FILL_IN_YOUR_GOOGLE_PLACES_API_KEY'
  });
});

myApp.controller('mainCtrl',function($scope,gPlacesAPI){
  $scope.places = gPlacesAPI.placeSearch({
    latitude:'37.4064516',
    longitude:'-121.93664650000001'
  }).then(function(data){
    return data;
  });
  $scope.placeDetails = gPlacesAPI.placeDetails({
    reference:'CnRlAAAASWB_FqYrxoADITNAh0aLdMEvkm80kUFT_pDHQd5ujO75D-zGSh3LKhyxWMl4zGTdtK3ObWW3-OG-1N923reKd0FMYsw9bPfcFeAaP8e_G9e9V3UTcojLSXPmVn4Cr-h8jgFsmrTt0YDubNJwIHWheBIQol-hO_j2JQe13f-Nl4oxaBoUxdADCJXSCFGdhwkwpqnQEB6WDlk'
  }).then(function(data){
    return data;
  });
});
```
Further Customizations
--
You can override any default option below via setOptions on the gPlacesAPIProvider
Or by passing it in to the placeSearch or placeDetails method
```
this.options = {
    nearbySearchURL: 'https://maps.googleapis.com/maps/api/place/nearbysearch',
    placeDetailsURL: 'https://maps.googleapis.com/maps/api/place/details',
    key: null,
    radius: 1000,
    sensor: false,
    location: {
        latitude: null,
        longitude: null
    },
    format: 'json',
    types: 'food'
}
```
Testing
--
```
grunt test
```

License
--
MIT