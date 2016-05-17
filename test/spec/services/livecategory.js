'use strict';

describe('Service: liveCategory', function () {

  // load the service's module
  beforeEach(module('gobzrliteApp'));

  // instantiate service
  var liveCategory;
  beforeEach(inject(function (_liveCategory_) {
    liveCategory = _liveCategory_;
  }));

  it('should do something', function () {
    expect(!!liveCategory).toBe(true);
  });

});
