var os = require('os-utils');



export default async function handler (req, res) {

    os.cpuUsage(v=> res.send(JSON.stringify({
        cpu:v,
        total_mem:os.totalmem(),
        free_mem:os.freemem()
    })) ); 
   
}