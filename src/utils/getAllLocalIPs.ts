import os from 'os';

function getAllLocalIPs() {
  const nets = os.networkInterfaces();
  const results = [];

  for (const [name, addresses] of Object.entries(nets)) {
    if (!addresses) continue;
    for (const addr of addresses) {
      if (!addr.internal) {
        results.push({ interface: name, family: addr.family, address: addr.address });
      }
    }
  }
  return results;
}

export default getAllLocalIPs;
// console.log(getAllLocalIPs());
