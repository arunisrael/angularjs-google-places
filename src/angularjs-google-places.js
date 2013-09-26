'use strict';

angular.module('ngGPlaces', []);
angular.module('ngGPlaces').value('gPlaces', google.maps.places);
angular.module('ngGPlaces').value('gMaps', google.maps);

angular.module('ngGPlaces').
provider('ngGPlacesAPI', function () {

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
        _nearbySearchApiFnCall: 'nearbySearch',
        _placeDetailsApiFnCall: 'getDetails'
    };

    var parseNSJSON = function (response) {
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

    var parsePDJSON = function (response) {
        var pResp = {};
        var keys = defaults.placeDetailsKeys;
        angular.forEach(keys, function (k) {
            pResp[k] = response[k];
        });
        return pResp;
    };

    this.$get = function ($rootScope, $q, gMaps, gPlaces, $window) {

        function commonAPI(args) {
            var req = angular.copy(defaults, {});
            angular.extend(req, args);
            var deferred = $q.defer();
            var elem, service;

            function callback(results, status) {
                if (status == gPlaces.PlacesServiceStatus.OK) {
                    $rootScope.$apply(function () {
                        return deferred.resolve(req._parser(results));
                    });
                } else {
                    $rootScope.$apply(function () {
                        deferred.reject(req._errorMsg);
                    });
                }
            }
            if (req._genLocation) {
                req.location = new gMaps.LatLng(req.latitude, req.longitude);
            }
            if (req.map) {
                elem = req.map;
            } else if (req.elem) {
                elem = req.elem;
            } else {
                elem = $window.document.createElement('div');
            }
            service = new gPlaces.PlacesService(elem);
            service[req._apiFnCall](req, callback);
            return deferred.promise;
        }

        return {
            getDefaults: function () {
                return defaults;
            },
            nearbySearch: function (args) {
                args._genLocation = true;
                args._errorMsg = defaults.nearbySearchErr;
                args._parser = parseNSJSON;
                args._apiFnCall = defaults._nearbySearchApiFnCall;
                return commonAPI(args);
            },
            placeDetails: function (args) {
                args._errorMsg = defaults.placeDetailsErr;
                args._parser = parsePDJSON;
                args._apiFnCall = defaults._placeDetailsApiFnCall;
                return commonAPI(args);
            }
        };
    };

    this.$get.$inject = ['$rootScope', '$q', 'gMaps', 'gPlaces', '$window'];

    this.setDefaults = function (args) {
        angular.extend(defaults, args);
    };

});