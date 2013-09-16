'use strict';

angular.module('gPlaces',[]);

angular.module('gPlaces').
  provider('gPlacesAPI', function() {

    this.options = {
      nearbySearchURL:'https://maps.googleapis.com/maps/api/place/nearbysearch',
      placeDetailsURL:'https://maps.googleapis.com/maps/api/place/details',
      key:null,
      radius:1000,
      sensor:false,
      location:{
        latitude:null,
        longitude:null
      },
      format:'json',
      types:'food'
    }

    this.$get = function($http) {
        var opts = this.options;
        return {
            getOptions: function() {
              return opts;
            },
            placeSearch: function(cparams) {
              var popts = angular.extend(opts,cparams);
              var url = popts['nearbySearchURL'] + '/' + popts['format'];
              return $http.get(url, {
                  params: {
                    location : popts['latitude'] + ',' + popts['longitude'],
                    radius : popts['radius'],
                    types : popts['types'],
                    name : popts['name'],
                    sensor : popts['sensor'],
                    key : popts['key']
                  }
              });
            },
            placeDetails:function(opts){
              return opts;
            }
        }
    };

    this.setOptions = function(opts) {
        angular.extend(this.options,opts);
    };

});