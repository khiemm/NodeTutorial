var firstChildCallback = function () {
    console.log("logFirstChild");
};
var secondChildCallback = function () {
    console.log("logSecondChild");
};
var firstChild = function () {
    // như 1 async call với firstChildCallback là callback, timeout là thời gian async call đó thực thi xong
    // = _promise.then
    setTimeout(firstChildCallback, 0);
};
var secondChild = function () {
    // như 1 async call với secondChildCallback là callback, timeout là thời gian async call đó thực thi xong
    // = _promise.then
    setTimeout(secondChildCallback, 0);
};
var firstFunction = function () {
    console.log("firstFunction 1");
    firstChild()
    console.log("firstFunction 2");
    secondChild()
    console.log("firstFunction 3");
};
var secondFunction = function () {
    console.log("secondFunction");
};
var main = function () {
    firstFunction()
    secondFunction()
};
main()
