'use strict';
/*
look at github other provider examples to see how internal Fns are organized
fix variable names opts cparams defaults
better org defaults with _ naming convention for internally used vars?
e.g. apifncalls should not be modified by user?
maybe put those in constants?
prettify source code
why so many dependency injections?
how to inject into provider? thats why common api needs to be under $get scope to get $q??
tests - mock out gService with custom response

readme
plnkr with google img to adhere to TOS
minify

blog:
why create map elem
angular copy/extend issue with multiple callbacks? overwriting default shared opt
post to google group for feedback
rootscope apply

 */
angular.module('gPlaces', []);

angular.module('gPlaces').value('googlePlaces',google.maps.places);
angular.module('gPlaces').value('googleMaps',google.maps);

angular.module('gPlaces').
provider('gPlacesAPI', function () {

    var defaults = {
        radius: 1000,
        sensor: false,
        latitude: null,
        longitude: null,
        types: ['food'],
        map: null,
        elem: null,
        nearbySearchKeys: ['name','reference','vicinity'],
        placeDetailsKeys: ['formatted_address', 'formatted_phone_number', 'reference', 'website'],
        nearbySearchErr: 'error finding nearby places',
        placeDetailsErr: 'error finding place details',
        nearbySearchApiFnCall: 'nearbySearch',
        placeDetailsApiFnCall: 'getDetails'
    };

    this.parseNSJSON = function (response) {
        var pResp = [];
        var keys = defaults.nearbySearchKeys;
        response.map(function (result) {
            var obj = {};
            angular.forEach(keys, function (k) {
                obj[k] = result[k];
            });
            pResp.push(obj);
        });
        return pResp;
    };

    this.parsePDJSON = function (response) {
        var pResp = {};
        var keys = defaults.placeDetailsKeys;
        angular.forEach(keys, function (k) {
            pResp[k] = response[k];
        });
        return pResp;
    };

    this.$get = function ($http, $rootScope,$q,googleMaps,googlePlaces,$window) {
        var opts = defaults;
        var parseNSJSON = this.parseNSJSON;
        var parsePDJSON = this.parsePDJSON;

        function commonAPI (options) {
            var popts = angular.copy(defaults, {});
            angular.extend(popts, options);
            var deferred = $q.defer();
            if (popts._genLocation) {
                popts.location = new googleMaps.LatLng(popts.latitude,popts.longitude);
            }
            function callback(results, status) {
                if (status == googlePlaces.PlacesServiceStatus.OK) {
                    $rootScope.$apply(function(){
                        return deferred.resolve(popts._parser(results));
                    });
                }
                else {
                    $rootScope.$apply(function(){
                        deferred.reject(popts._errorMsg);
                    });
                }
            }
            var elem;
            if (popts.map) {
              elem = popts.map;
            }
            else if (popts.elem) {
              elem = popts.elem;
            }
            else {
              elem = $window.document.createElement('div');
            }
            var service = new googlePlaces.PlacesService(elem);
            service[popts._apiFnCall](popts, callback);
            return deferred.promise;
        };

        return {
            getDefaults: function () {
                return defaults;
            },
            nearbySearch: function (cparams) {
                cparams._genLocation = true;
                cparams._errorMsg = defaults.nearbySearchErr;
                cparams._parser = parseNSJSON;
                cparams._apiFnCall = defaults.nearbySearchApiFnCall;
                return commonAPI(cparams);
            },
            placeDetails: function (cparams) {
                cparams._errorMsg = defaults.placeDetailsErr;
                cparams._parser = parsePDJSON;
                cparams._apiFnCall = defaults.placeDetailsApiFnCall;
                return commonAPI(cparams);
            }
        };
    };

    this.setDefaults = function (opts) {
        angular.extend(defaults, opts);
    };

});