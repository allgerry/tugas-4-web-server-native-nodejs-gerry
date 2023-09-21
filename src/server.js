const http = require("http")
const router = require("./router/router")

const boot = () => {
    const init = http.createServer((req,res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        if(req.method === "GET" || req.method === "POST"){
            router.init(req,res)
        }else {
            res.end("Route Not Found !")
        }
    })
    return init
}

module.exports = boot