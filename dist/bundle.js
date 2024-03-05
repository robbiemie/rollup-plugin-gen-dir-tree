function a1() {
  console.log('a1');
}

var json = {};

async function test() {
  a1();
  console.log('main', json);
}

await test();
