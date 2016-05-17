'use strict';

describe('Directive: bnLazy', function () {

  // load the directive's module
  beforeEach(module('gobzrliteApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bn-lazy></bn-lazy>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the bnLazy directive');
  }));
});
