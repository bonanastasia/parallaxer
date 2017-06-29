"use strict";

describe("Parallaxer", function() {

  var container;

  fixture.setBase('testing/fixtures');

  beforeEach(function() {
    window.resizeTo(800, 600);
    // The first element is the style tag
    container = fixture.load('test.html')[1];
  });

  afterEach(function() {
    window.scrollTo(0, 0);
    fixture.cleanup();
  });

  it("Sanity Check", function() {
    expect(true).to.be.true;
  });

});
