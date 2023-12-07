require('dotenv').config()
const express = require('express');
const expressLayout = require("express-ejs-layouts")
const router = express.Router();
const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(expressLayout)
app.set('layout','./layouts/main')
app.set('view engine','ejs')

app.get("/", (req, res) => {
    const locals = {
        title: "AlexaSoft",
        description: "Cómo estás?"
    }
    res.render("index", locals)
})

module.exports = router;