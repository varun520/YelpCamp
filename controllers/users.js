const User = require('../models/user')

module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register')
}

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const user = new User({ email, username })
        const newUser = await User.register(user, password)
        req.login(newUser, function (err) {
            if (err) return next(err)
            req.flash('success', 'Welcome to YelpCamp!')
            res.redirect('/campgrounds')
        })
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login')
}

module.exports.login = (req, res) => {
    const redirectUrl = res.locals.returnTo || '/campgrounds'
    // console.log(redirectUrl)
    req.flash('success', 'Welcome Back')
    res.redirect(redirectUrl)
}

module.exports.logout = (req, res, next) => { 
    req.logout(function (err) {
        if (err) {
            return next(err)
        }
        req.flash('success', 'Bye Bye!!')
        res.redirect('/campgrounds')
    })
}