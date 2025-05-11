const fs = require('fs');
const assert = require('assert');

eval(fs.readFileSync('code.js')+'');

var arrays = RandomArrays(50);

async function testArrays(arrays) {
  for (a of arrays) {
    var a2 = JSON.parse(JSON.stringify(a));
    var sorted = await ms(a);
    assert(JSON.stringify(sorted) ==
      JSON.stringify(a2.sort(function(a, b)
                  { return a - b; })));
  }
}

testArrays(arrays);


function RandomArrays(n, max = 100) {
  return Array.from({ length: n }, () =>
    Array.from({ length: n }, () =>
      Math.floor(Math.random() * max) + 1
    )
  );
}

