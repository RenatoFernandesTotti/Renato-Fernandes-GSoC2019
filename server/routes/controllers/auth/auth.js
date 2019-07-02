const router = require('express').Router()
const GSoC = require('liquidsensors')
var keys = require('../../../keys.min')
const bodyParser = require('body-parser')
const axios = require('axios')
const uuid = require('uuid/v4')
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto')
const maxAge = 24 * 60 * 60 * 1000
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));
GSoC.createConnection(keys)



passport.use(new LocalStrategy({
        usernameField: 'name'
    },
    (name, password, done) => {
        user(name)
            .then(res => {
                const user = res
                var hash = password



                if (!user) {
                    return done(null, false, {
                        message: 'Invalid credentials.\n'
                    });
                }
                for (i = 0; i < 100; i++) {
                    hash = crypto.createHash('sha512').update(hash).digest('hex')
                }
                if (hash != user.userPass) {
                    return done(null, false, {
                        message: 'Invalid credentials.\n'
                    });
                }

                return done(null, user);
            })
            .catch(error => done(error));
    }
));

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
    done(null, user.idUsers);
});

passport.deserializeUser((id, done) => {

    user(id)
        .then(res => {
            done(null, res)
        })
        .catch(error => done(error, false))
});


router.use(session({
    genid: (req) => {
        return uuid() // use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: maxAge,
    }
}))
router.use(passport.initialize());
router.use(passport.session());


router.get('/auth/logout', (req, res) => {
    req.logout();
    res.clearCookie("valid");
    return res.send();
})

router.post('/auth/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {


        if (info) {

            return res.status(418).send(info.message)
        }
        if (err) {

            return res.status(500).send(err)
        }
        if (!user) {

            return res.status(401).send("User not found");
        }
        req.login(user, (err) => {
            if (err) {

                return res.status(401).send(err);
            }
            setCookies(res,maxAge-4)
            return res.status(200).send("ok");
        })
    })(req, res, next);
})

router.post('/auth/register', (req, res) => {
    GSoC.registerUser({
        userName: req.body.name,
        userMail: req.body.email,
        userPass: req.body.password
    }).then(result => {

        axios.post('http://localhost:8888/auth/login', {
            name: req.body.name,
            password: req.body.password
        }).then(result => {

            if (result.status == 200)
                res.status(200).send("Registered!")
        })
    })
})

router.get('/auth/check', (req, res) => {
    console.log(req);
    console.log(req.isAuthenticated());
    
    if (!req.isAuthenticated()) {
        res.status(400).send('You are not authenticated')
    } else {
        res.status(200).send(req.user.userName)
    }
})

const setCookies =(res,exp)=>{res.cookie('valid','true',{maxAge:exp,httpOnly:false})}

const user = (name) => {
    return new Promise((resolve, reject) => {
        GSoC.getUser(name).then(result => {
            resolve(result)
        })
    })
}




module.exports = router