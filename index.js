const app = require('express')();
const bodyparser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql2')

app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors())
app.use(require('express').json());

const PORT = 8000;
const data = {
    name: "Sidhant Nahak",
    qualification: "B-tech",
    age: 22
}
const data2 = {
    name: "xyz",
    qualification: "xyz",
    age: 22
}
const pool = mysql.createPool({
    host: "141.136.43.151",
    user: 'u188495358_pvAPMDB',
    password: '9830pvAPM9831@@',
    database: 'u188495358_pvAPMDB',
    waitForConnections: true,
    multipleStatements: true
})
const promisePool = pool.promise();

app.get("/connect-to-database",async(req,res)=>{
    await promisePool.getConnection()
    .then((result)=>{
        console.log("connected to database! ")
        return res.status(200).json({message:"Connected to database!",sucess:true})
    }
    )
    .catch((err)=>{
        console.log(err.message);
        return res.status(400).json({error:err.message,sucess:false})
    })

})
app.get("/inverter-efficiency", async (req, res) => {
    let connection;
    try {
        connection = await promisePool.getConnection()
        await connection.beginTransaction();
        const [result, fields] = await connection.query("select * from inverterDetails")
        await connection.commit();
        return res.status(200).json({ result: result, sucess: true });

    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ error: error.message, sucess: false });

    }
     finally {
        // connection?.release();
        console.log("request completed!")
    }
})
app.get("/test", async (req, res) => {
    return res.status(200).json({ message: "Getting Response", sucess: true })
})

app.get("/test2", async (req, res) => {
    res.send("Hi'there we are getting response")
})

app.get("/getData", async (req, res) => {
    return res.status(200).json({ message: `Name: ${data.name}, qualification: ${data.qualification}, age is ${data.age}`, sucess: true })
})
app.get("/getData2", async (req, res) => {
    return res.status(200).json({ message: `Name: ${data2.name}, qualification: ${data2.qualification}, age is ${data2.age}`, sucess: true })
})

app.post("/postData", async (req, res) => {
    try {
        const { name, age } = req.body;
        return res.status(200).json({ message: `Your name is ${name} and Your age is ${age}`, sucess: true })
    } catch (error) {
        return res.status(400).json({ error: error.message, sucess: false })
    }
})

process.on("uncaughtException", err => {
    console.log("Server is closing due to uncaughtException occured!")
    console.log("Error :", err.message)
    server.close(() => {
        process.exit(1);
    })
})

const server = app.listen(PORT, () => {
    console.log("server is running at port : ", server.address().port)
})
console.log("Express application running fine")

process.on("unhandledRejection", err => {
    console.log("Server is closing due to unhandledRejection occured!")
    console.log("Error is:", err.message)
    server.close(() => {
        process.exit(1);
    })
})
