'use strict';

describe('Service: gPlacesAPI', function () {
  var gPlacesAPI, opts, $httpBackend;
  var nearbySearchURL = 'https://maps.googleapis.com/maps/api/place'
  + '/nearbysearch/json?key=test&location=10,-20&radius=1000&'
  + 'sensor=false&types=food';

  var placeDetailsURL = 'https://maps.googleapis.com/maps/api/place'
  + '/details/json?key=test&reference=reference_id&sensor=false';

  beforeEach(module('gPlaces','mockedNearbySearch','mockedPlaceDetails',
    function(gPlacesAPIProvider){
      gPlacesAPIProvider.setOptions({key:'test'});
    }
  ));

  beforeEach(inject(function (_gPlacesAPI_,_$httpBackend_,defaultNSJSON,defaultPDJSON) {
    gPlacesAPI = _gPlacesAPI_;
    opts = gPlacesAPI.getOptions();
    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET(nearbySearchURL).respond(defaultNSJSON);
    $httpBackend.whenGET(placeDetailsURL).respond(defaultPDJSON);
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should return default option for radius', function () {
    expect(opts.radius).toEqual(1000);
  });

  it('should return custom option for key', function () {
    expect(opts.key).toEqual('test');
  });

  it('should return nearby places for a location', function () {
    var results;
    gPlacesAPI.placeSearch({latitude:10,longitude:-20}).then(function(data){
      results = data;
    });
    $httpBackend.flush();
    expect(results.length).toEqual(3);
    expect(results[0].name).not.toBeUndefined();
    expect(results[1].vicinity).not.toBeUndefined();
    expect(results[2].reference).not.toBeUndefined();
  });

  it('should return place details', function () {
    var results;
    gPlacesAPI.placeDetails({reference:'reference_id'}).then(function(data){
      results = data;
    });
    $httpBackend.flush();
    expect(results.formatted_address).toEqual('37 Rio Robles East, San Jose, CA, United States');
    expect(results.formatted_phone_number).toEqual('(408) 577-0300');
    expect(results.website).toEqual('http://www.quiznos.com/restaurants/CA/San%20Jose');
    expect(results.reference).not.toBeUndefined();
  });

});
