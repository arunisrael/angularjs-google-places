'use strict';

describe('Service: ngGPlacesAPI', function () {
    var ngGPlacesAPI, $rootScope;

    beforeEach(module('ngGPlaces', 'mockedNearbySearch',
        'mockedPlaceDetails', function ($provide, ngGPlacesAPIProvider,
            defaultNSJSON, defaultPDJSON) {
            $provide.value('gPlaces', {
                PlacesService: function () {
                    this.nearbySearch = function (req, cb) {
                        cb(defaultNSJSON, true);
                    };
                    this.getDetails = function (req, cb) {
                        cb(defaultPDJSON, true);
                    };
                },
                PlacesServiceStatus: {
                    'OK': true
                }
            });
            $provide.value('gMaps', {
                LatLng: function () {}
            });
            ngGPlacesAPIProvider.setDefaults({
                sensor: true
            });
        }));

    describe('Overriding Defaults', function () {
        var defaults;

        beforeEach(inject(function (_ngGPlacesAPI_) {
            ngGPlacesAPI = _ngGPlacesAPI_;
            defaults = ngGPlacesAPI.getDefaults();
        }));

        it('should return default option for radius', function () {
            expect(defaults.radius).toEqual(1000);
        });

        it('should return custom setting for sensor', function () {
            expect(defaults.sensor).toEqual(true);
        });
    });

    describe('Nearby Search', function () {
        beforeEach(inject(function (_ngGPlacesAPI_, _$rootScope_) {
            ngGPlacesAPI = _ngGPlacesAPI_;
            $rootScope = _$rootScope_;
        }));

        it('should return nearby places for a location', function () {
            var results = ngGPlacesAPI.nearbySearch({
                latitude: -33.8665433,
                longitude: 151.1956316
            }).then(function (data) {
                results = data;
            });
            $rootScope.$apply();
            expect(results.length).toEqual(20);
            expect(results[0].name).not.toBeUndefined();
            expect(results[1].vicinity).not.toBeUndefined();
            expect(results[2].reference).not.toBeUndefined();
        });
    });

    describe('Place Details Search', function () {
        beforeEach(inject(function (_ngGPlacesAPI_, _$rootScope_) {
            ngGPlacesAPI = _ngGPlacesAPI_;
            $rootScope = _$rootScope_;
        }));

        it('should return nearby places for a location', function () {
            var results;
            ngGPlacesAPI.nearbySearch({
                latitude: -33.8665433,
                longitude: 151.1956316
            }).then(function (data) {
                results = data;
            });
            $rootScope.$apply();
            expect(results.length).toEqual(20);
            expect(results[0].name).not.toBeUndefined();
            expect(results[1].vicinity).not.toBeUndefined();
            expect(results[2].reference).not.toBeUndefined();
        });


        it('should return place details', function () {
            var result;
            ngGPlacesAPI.placeDetails({
                reference: "CnRnAAAARpMYRKXwEl8UhHfPX84GQNP7HHPru_ry8P9he6SiQ2l8MUv7t1qA8zbq09mTyg2uzr0Cp4h1eJYVtoDEUPL_9zi-ug8w-oVJ8wnz-9xKjdw9yL9mZOuP8-lc57zLNSkqaRTdR-A1jFL_yi7e6KhbeBIQqABCCuYmIMFtkHyBx6Cp7hoUeHx1wbnovws61axvxyUOjR9mINU"
            }).then(function (data) {
                result = data;
            });
            $rootScope.$apply();
            expect(result.formatted_address).toEqual(
                '529 Kent Street, Sydney NSW, Australia');
            expect(result.formatted_phone_number).toEqual(
                '(02) 9267 2900');
            expect(result.website).toEqual(
                'http://www.tetsuyas.com/');
            expect(result.reference).not.toBeUndefined();
        });
    });

});