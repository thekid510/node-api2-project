// require your server and launch it here
const server = require('./api/server')

const PORT = 6000

server.listen(PORT,()=> {
    console.log(`waiting on`, PORT)
})