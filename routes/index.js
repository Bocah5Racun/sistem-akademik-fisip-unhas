const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.render('index')
})

// log in to user account
router.get('/login', (req, res) => {
    res.render('login', { title: 'Dashboard Akademik FISIP / Login User', hideNavbar: true})
})

router.post('/login', async (req, res) => {
    res.send("Works!")
})

module.exports = router