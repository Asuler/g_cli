import { networkInterfaces } from 'os';

function hasIPv6() {
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family === 'IPv6' && !net.internal) {
        return true;
      }
    }
  }
  return false;
}

export default hasIPv6;
