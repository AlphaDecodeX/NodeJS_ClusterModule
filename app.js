const express = require('express');
const cluster = require('cluster');
const os = require('os');

const app = express();
const numCpus = os.cpus().length;
const PORT = 3000;

app.get('/', (req, res)=>{
    for (let i = 0; i < 1e8; i++) {
        //   
    }
    res.send(`OK :- ${process.pid}`);
    // cluster.worker.kill();
})

if(cluster.isMaster){
    for (let i = 0; i < numCpus; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal)=>{
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork();
    })
}else{
    app.listen(PORT, ()=>console.log(`Server Working with pid ${process.pid} at localhost with port `+PORT));
}

// app.listen(PORT, ()=>console.log("Server Working at localhost with port "+PORT));