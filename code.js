const { Worker } = require('node:worker_threads');

//asked chatgpt how to spawn a worker with worker_threads and to send it an array/data
function spawnWorker(a) {
  return new Promise((resolve, reject) => {
    const w = new Worker('./w.js', { workerData: a });
    w.on('message', resolve);
    w.on('error', reject);
    w.on('exit', code => {
      if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
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

async function ms(a) {
  if (a.length < 2) { return a; }

  var m = Math.floor(a.length/2);
  var l = a.slice(0, m);
  var r = a.slice(m);

  const [sl, sr] = await Promise.all([
    spawnWorker(l),
    spawnWorker(r)
  ]);

  return merge( sl, sr );
}
