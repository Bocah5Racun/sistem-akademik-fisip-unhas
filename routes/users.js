const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

// edit user profile data
router.get('/edit', (req, res) => {
    res.render('/edit', { title: 'Dashboard Akademik FISIP / Edit Profil'})
})

// recover account
router.get('/recover', (req, res) => {
    res.send('Recover your password')
})

// register pages
router.get('/register', (req, res) => {
    res.render('user/register', { title: 'Dasbor Akademik FISIP / Daftar User Baru', hideNavbar: true })
})

router.post('/register', async (req, res) => {
    const { nama, nim, telefon, email, password, confirmedPassword, prodi, jenjang } = req.body
    var errors = []

    // check if passwords are the same
    if(password != confirmedPassword){
        errors.push({ msg: 'Password tidak sama.' })
    }

    //check password length
    if(password.length < 8){
        errors.push({ msg: 'Password harus terdiri atas minimal 8 karakter' })
    }

    if(errors.length > 0){
        console.log(errors)
        res.render('user/register', {
            hideNavbar: true,
            errors,
            nama,
            nim,
            telefon,
            email,
            prodi,
            jenjang
        })
    } else{

        User.findOne({ $or: [
            { email: email },
            { nim: nim }
         ] }, async (err, obj) => {
            try{
                if(obj){
                    errors.push({ msg: 'Email atau NIM sudah terdaftar' })
                    res.render('user/register', {
                        hideNavbar: true,
                        errors,
                        nama,
                        nim,
                        telefon,
                        email,
                        prodi,
                        jenjang
                    })
                } else{
                    try{
                        const salt = await bcrypt.genSalt()
                        const hashedPassword = await bcrypt.hash(password, salt)
                        const newUser = new User({
                            nama: nama,
                            nim: nim,
                            email: email,
                            telefon: telefon,
                            password: hashedPassword,
                            prodi: prodi,
                            jenjang: jenjang
                        })
                        newUser.save((err, savedAuthor) => {
                            if(err){
                                throw err
                            } else{
                                res.redirect('/login')
                            }
                        })
                        
                    } catch(err){
                        res.send(err)
                    }
                }
            } catch(err){
                throw err
            }
        })
    }
})

// process form inputs
router.post('/', (req, res) => {
    res.send("Processing Input Fields")
})

module.exports = router