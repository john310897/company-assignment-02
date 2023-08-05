const express = require('express');
const postgres = require('postgres');
const cors=require('cors');
const app = express();
app.use(cors())

const sql = postgres("postgres://john310897:Gc2DXjI1ROqw@ep-aged-dew-06191585.ap-southeast-1.aws.neon.tech/neondb", { ssl: 'require' });

const executeQuery=async(query)=>{
    return await sql`select * from registration`
}

app.get('/registrations-all',(req,resp)=>{
    executeQuery('select * from registration').then(resp=>{
        resp.send(returnJsonResp(queryResp))
    })
})
app.post('/registration',(req,resp)=>{
    console.log("frontend request",req)
})
app.get('/', function (req, res) {
    res.send("server listening at port 8080");
});

const returnJsonResp=(result)=>{
    console.log(result)
    return {status:200,data:result}
}
app.listen(8080,'',(error)=>{
    if(!error){
        console.log("server listening at port 8080")
    }else{
        console.log(error)
    }
})