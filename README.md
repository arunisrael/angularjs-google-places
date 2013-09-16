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
- Add the gPlaces module as dependency
- Inject the gPlaces service (yes, it has the same name)
- TBD Invoke the getLocation method on the geolocation service to retrieve a promise
- TBD The promise will be resolved with the position returned by window.navigator.getCurrentPosition if the user allows the browser to access their location
- TBD The promise will be rejected if the user rejects location access or the browser does not support it

Example
--
```
angular.module('myApp',['geolocation'])
  .controller('mainCtrl', function ($scope,geolocation) {
    $scope.coords = geolocation.getLocation().then(function(data){
      return {lat:data.coords.latitude, long:data.coords.longitude};
    });
});
```

Demo
--
See this [plunker](http://embed.plnkr.co/TM71LBh6ttYotOo6t7oX/preview) that displays your latitude/longitude

Error Handling
--
The geolocation module defines a geolocation-msgs constant holding error msgs that are broadcast if the user rejects location access:
```
$rootScope.$broadcast('error',CONSTANTS['errors.location.notFound']);
```

or if the browser does not support geolocation:
```
$rootScope.$broadcast('error',geolocation_msgs['errors.location.unsupportedBrowser']);
```

Testing
--
```
grunt test
```

License
--
MIT
