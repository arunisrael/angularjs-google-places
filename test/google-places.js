'use strict';

describe('Service: gPlacesAPI', function () {
  var gPlacesAPI, opts, $rootScope, $httpBackend;

  beforeEach(module('gPlaces',function(gPlacesAPIProvider){
    gPlacesAPIProvider.setOptions({key:'test'});
  }));

  beforeEach(inject(function (_gPlacesAPI_,_$rootScope_,_$httpBackend_) {
    gPlacesAPI = _gPlacesAPI_;
    opts = gPlacesAPI.getOptions();
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    $httpBackend.when('GET', 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=test&location=10,-20&radius=1000&sensor=false&types=food')
        .respond({userId: 'userX'}, {'A-Token': 'xxx'});
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

  it('should return place data for a location', function () {
    var results;
    gPlacesAPI.placeSearch({latitude:10,longitude:-20}).then(function(data){
      results = data;
    });
    $httpBackend.flush();
    expect(results).toEqual(5);
  });


});
