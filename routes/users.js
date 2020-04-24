const express = require('express')
const router = express.Router()
const User = require('../models/user')

// show user profile data
router.get('', (req, res) => {
    res.render('user/index', { title: 'Dashboard Akademik FISIP / Profil User', user: new User() })
})

// edit user profile data
router.get('/edit', (req, res) => {
    res.render('user/edit', { title: 'Dashboard Akademik FISIP / Edit Profil'})
})

// register new user
router.get('/register', (req, res) => {
    res.render('user/register', { title: 'Dashboard Akademik FISIP / Daftar User Baru', hideNavbar: true})
})

// process form inputs
router.post('/', (req, res) => {
    res.send("Processing Input Fields")
})

module.exports = router