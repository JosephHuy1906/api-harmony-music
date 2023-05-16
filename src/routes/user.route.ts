import { Router } from 'express';

import UserController from '@/controllers/user.controller';
import passport from 'passport';

const router: Router = Router();

router.get('/', (req, res) => {
    res.render('user page')
})


router.get('/login/success', isLoggedIn,  (req, res) => {
    if(req.user){
        res.status(200).json({
            success: true,
            message: "login successfull",
            user: req.user,
        })
        
    }
});

router.get('/login/failed', isLoggedIn,  (req, res) => {
    res.status(401).json({
        success: false,
        message: "login failure"
    })
});

router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
}));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/login/success',
        failureRedirect: '/login/failed'
    }));

router.get('/logout',  (req, res) => {
    req.logout;
    res.redirect('/');
});

function isLoggedIn(req:any, res: any, next: any) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
export default router;
