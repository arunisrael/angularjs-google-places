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

    this.buildParams = function(keys,options) {
      var obj = {};
      angular.forEach(keys,function(opt){
        obj[opt] = options[opt];
      });
      return obj;
    }

    this.parseNSJSON = function(response) {
      var pResp = [];
      var keys = [
                  'name',
                  'reference',
                  'vicinity'
                ];
      response['results'].map(function(result){
        var obj = {}
        angular.forEach(keys,function(k){
          obj[k] = result[k];
        });
        pResp.push(obj);
      })
      return pResp;
    }

    this.parsePDJSON = function(response) {
      var pResp = {};
      var keys = [
                  'formatted_address',
                  'formatted_phone_number',
                  'reference',
                  'website'
                  ];
      angular.forEach(keys,function(k){
        pResp[k] = response['result'][k];
      });
      return pResp;
    }

    this.$get = function($http,$q) {
        var opts = this.options;
        var buildParams = this.buildParams;
        var parseNSJSON = this.parseNSJSON;
        var parsePDJSON = this.parsePDJSON;
        return {
            getOptions: function() {
              return opts;
            },
            placeSearch: function(cparams) {
              var popts = angular.extend(opts,cparams);
              var url = popts['nearbySearchURL'] + '/' + popts['format'];
              var location = {location: popts['latitude'] + ',' + popts['longitude']};
              var deferred = $q.defer();
              $http.get(url, {params: angular.extend(buildParams(['radius',
                'types',
                'names',
                'sensor',
                'key'],popts)
              ,location)})
              .success(function(data){
                return deferred.resolve(parseNSJSON(data));
              })
              .error(function(){
                deferred.reject('error finding nearby places');
              });
              return deferred.promise;
            },
            placeDetails:function(cparams){
              var popts = angular.extend(opts,cparams);
              var url = popts['placeDetailsURL'] + '/' + popts['format'];
              var deferred = $q.defer();
              $http.get(url, {params: buildParams(['reference',
                'sensor',
                'key'],popts)})
              .success(function(data){
                deferred.resolve(parsePDJSON(data));
              })
              .error(function(){
                deferred.reject('error grabbing place details');
              });
              return deferred.promise;
            }
        }
    };

    this.setOptions = function(opts) {
        angular.extend(this.options,opts);
    };

});