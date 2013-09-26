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

Demo
--
See this [plunker](http://embed.plnkr.co/6kKlcbafz57lS7HEPPMx/preview)

Usage
--
- Include the [Google Maps JS library](http://maps.googleapis.com/maps/api/js?libraries=places&sensor=true_or_false) in your app
- Add ngGPlaces as a dependency
- Inject ngGPlacesAPI as a dependency to your controller or other service
- Invoke the nearbySearch method and pass in a latitude/longitude
- Invoke the placeDetails method and pass in a Google Places reference id

Example
--
```
var myApp = angular.module('myApp',['ngGPlaces']);

// optional if you want to modify defaults
myApp.config(function(ngGPlacesAPIProvider){
  ngGPlacesAPIProvider.setDefaults({
    radius:500
  });
});

myApp.controller('mainCtrl',function($scope,ngGPlacesAPI){
  $scope.details = ngGPlacesAPI.placeDetails({reference:"really_long_reference_id"}).then(
    function (data) {
      return data;
    });

  $scope.data = ngGPlacesAPI.nearbySearch({latitude:-33.8665433, longitude:151.1956316}).then(
    function(data){
      return data;
    });
});
```

Further Customizations
--
You can override any default option below via setDefaults on the ngGPlacesAPIProvider
Or by passing that property to the nearbySearch or placeDetails method
```
var defaults = {
    radius: 1000,
    sensor: false,
    latitude: null,
    longitude: null,
    types: ['food'],
    map: null,
    elem: null,
    nearbySearchKeys: ['name', 'reference', 'vicinity'],
    placeDetailsKeys: ['formatted_address', 'formatted_phone_number',
        'reference', 'website'
    ],
    nearbySearchErr: 'Unable to find nearby places',
    placeDetailsErr: 'Unable to find place details',
};
```

Testing
--
```
grunt test
```

License
--
MIT