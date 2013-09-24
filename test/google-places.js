'use strict';

describe('Service: gPlacesAPI', function () {
    var gPlacesAPI;

    beforeEach(module('gPlaces', function (gPlacesAPIProvider) {
        gPlacesAPIProvider.setOptions({
            key: 'test'
        });
    }));

    describe('Option Parsing', function () {
        var opts;

        beforeEach(inject(function (_gPlacesAPI_) {
            gPlacesAPI = _gPlacesAPI_;
            opts = gPlacesAPI.getOptions();
        }));

        it('should return default option for radius', function () {
            expect(opts.radius).toEqual(1000);
        });

        it('should return custom option for key', function () {
            expect(opts.key).toEqual('test');
        });
    });

    describe('Nearby Search', function () {
        // var $httpBackend;

        // var nearbySearchURL =
        //     'https://maps.googleapis.com/maps/api/place' +
        //     '/nearbysearch/json?key=test&location=10,-20&radius=1000&' +
        //     'sensor=false&types=food';

        // beforeEach(module('mockedNearbySearch'));

        beforeEach(inject(function (_gPlacesAPI_, _$httpBackend_,
            defaultNSJSON) {
            gPlacesAPI = _gPlacesAPI_;
            // $httpBackend = _$httpBackend_;
            // $httpBackend.whenGET(nearbySearchURL).respond(
            //     defaultNSJSON);
        }));

        // afterEach(function () {
        //     $httpBackend.verifyNoOutstandingExpectation();
        //     $httpBackend.verifyNoOutstandingRequest();
        // });

        it('should return nearby places for a location', function () {
            var results;
            gPlacesAPI.placeSearch({
                latitude: 10,
                longitude: -20
            }).then(function (data) {
                results = data;
            });
            // $httpBackend.flush();
            expect(results.length).toEqual(3);
            expect(results[0].name).not.toBeUndefined();
            expect(results[1].vicinity).not.toBeUndefined();
            expect(results[2].reference).not.toBeUndefined();
        });
    });

    // describe('Place Details Search', function () {
    //     var $httpBackend;

    //     var placeDetailsURL =
    //         'https://maps.googleapis.com/maps/api/place' +
    //         '/details/json?key=test&reference=reference_id&sensor=false';

    //     beforeEach(module('mockedPlaceDetails'));

    //     beforeEach(inject(function (_gPlacesAPI_, _$httpBackend_,
    //         defaultPDJSON) {
    //         gPlacesAPI = _gPlacesAPI_;
    //         $httpBackend = _$httpBackend_;
    //         $httpBackend.whenGET(placeDetailsURL).respond(
    //             defaultPDJSON);
    //     }));

    //     afterEach(function () {
    //         $httpBackend.verifyNoOutstandingExpectation();
    //         $httpBackend.verifyNoOutstandingRequest();
    //     });

    //     it('should return place details', function () {
    //         var result;
    //         gPlacesAPI.placeDetails({
    //             reference: 'reference_id'
    //         }).then(function (data) {
    //             result = data;
    //         });
    //         $httpBackend.flush();
    //         expect(result.formatted_address).toEqual(
    //             '37 Rio Robles East, San Jose, CA, United States');
    //         expect(result.formatted_phone_number).toEqual(
    //             '(408) 577-0300');
    //         expect(result.website).toEqual(
    //             'http://www.quiznos.com/restaurants/CA/San%20Jose');
    //         expect(result.reference).not.toBeUndefined();
    //     });
    // });

});