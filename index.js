const http = require('http')

const leak = []

function requestListener(req, res) {

  if (req.url === '/now') {
    let resp = JSON.stringify({ now: new Date() })
    leak.push(JSON.parse(resp))
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write(resp)
    res.end()
  } else if (req.url === '/getSushi') {
    function importantMath() {
      let endTime = Date.now() + (5 * 1000);
      while (Date.now() < endTime) {
        Math.random();
      }
    }

    function theSushiTable() {
      return new Promise(resolve => {
        resolve('🍣');
      });
    }

    async function getSushi() {
      let sushi = await theSushiTable();
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      res.write(`Enjoy! ${sushi}`);
      res.end()
    }

    getSushi()
    importantMath()
  } else {
    res.end('Invalid request')
  }
}

const server = http.createServer(requestListener)
server.listen(process.env.PORT || 3000)
