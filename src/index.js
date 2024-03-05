import a from './tree/a'
import json from './imgages/1'

async function test() {
  a()
  console.log('main', json)
}

await test()

