const express = require('express');
const postgres = require('postgres');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors())
app.use(bodyParser.json())

const sql = postgres("postgres://john310897:Gc2DXjI1ROqw@ep-aged-dew-06191585.ap-southeast-1.aws.neon.tech/neondb", { ssl: 'require' });

const executeQuery = async (query) => {
    let result = await sql.unsafe(query)
    return result
}

const getAllRegistrations = async () => {
    return await executeQuery('select * from registration order by id').then(res => {
        return res
    })
}

app.get('/registrations-all', async (req, resp) => {
    resp.send(await getAllRegistrations())
    console.log("result sent")
})

app.post('/registration', async (req, resp) => {
    const columns = Object.keys(req.body)
    const values = Object.values(req.body)?.map(a => `'${a}'`)
    const query = `insert into registration (${columns})  values (${values})`
    await executeQuery(query);
    resp.send(await getAllRegistrations())
})
app.put('/registration/:id', async (req, resp) => {
    const columns = Object.keys(req.body)
    const values = Object.values(req.body)?.map(a => `'${a}'`)
    const setClause = columns?.map((column, index) => `${column}=${values[index]}`);
    const query = `update registration set ${setClause} where id=${req?.params?.id}`
    await executeQuery(query);
    resp.send(await getAllRegistrations())
})
app.delete('/registration/:id', async (req, resp) => {
    const query = `delete from registration where id=${req?.params?.id}`
    await executeQuery(query);
    resp.send(await getAllRegistrations())
})

app.get('/', function (req, res) {
    res.send("server listening at port 8080");
});

app.listen(8080, '', (error) => {
    if (!error) {
        console.log("server listening at port 8080")
    } else {
        console.log(error)
    }
})