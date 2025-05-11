const { parentPort, workerData } = require('node:worker_threads');

function mergeSort(a) {
  if (a.length < 2) { return a; }

  var m = Math.floor(a.length / 2);
  var l = mergeSort(a.slice(0, m));
  var r = mergeSort(a.slice(m));

  return merge(l, r);
}

function merge(l, r) {
  var result = [];

  var i = 0;
  var j = 0;

  while (i < l.length && j < r.length) {
    if (l[i] < r[j]) {
      result.push(l[i++]);
    }
    else {
      result.push(r[j++]);
    }
  }

  return result.concat(l.slice(i)).concat(r.slice(j));
}

parentPort.postMessage(mergeSort(workerData));


