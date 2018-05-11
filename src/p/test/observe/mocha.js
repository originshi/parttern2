require("../../../../demo08/mocha.css");
mocha.setup("bdd");
let chai = require("chai");
let expect = chai.expect;
var should = chai.should();
describe("simple test", function() {
  it("should equal 0 when n === 0", function() {
    fibonacci().should.equal(0);
  });
});
describe("异步 beforeEach 示例", function() {
  var foo = false;

  beforeEach(function(done) {
    setTimeout(function() {
      foo = true;
      done();
    }, 50);
  });

  it("全局变量异步修改应该成功", function() {
    expect(foo).to.be.equal(true);
  });
});
function fibonacci() {
  return 2;
}
mocha.run();
