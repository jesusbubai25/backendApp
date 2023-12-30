const app = require('express')();
const bodyparser = require('body-parser')
const cors = require('cors')

app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors())
app.use(require('express').json());

const PORT = 8443;
const data = {
    name: "Sidhant Nahak",
    qualification: "B-tech",
    age: 22
}

app.get("/test", async (req, res) => {
    return res.status(200).json({ message: "Getting Response", sucess: true })
})

app.get("/test2", async (req, res) => {
    res.send("Hi'there we are getting response")
})

app.get("/getData", async (req, res) => {
    return res.status(200).json({ message: `Name: ${data.name}, qualification: ${data.qualification}, age is ${data.age}`, sucess: true })
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