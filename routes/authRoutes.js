const passport = require('passport');
const router = require('express').Router();
// logout route
router.get('/logout', (req, res) => {
	// deletes req.user object
	req.logout();
	// deletes cookie from client
	req.session = null;

	res.redirect('http://localhost:3000/');
});

//this route can be used to check authentication status on the front end
router.get('/isauthenticated', (req, res) => {
	res.json({
		user: req.user
	});
});

// Google Oauth Routes
router.get(
	'/google',
	passport.authenticate('google', {
		scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email']
	})
);
router.get(
	'/google/callback',
	passport.authenticate('google', { successRedirect: 'http://localhost:3000/dashboard', failureRedirect: '/' })
);

// Github Oauth Routes
router.get('/github', passport.authenticate('github'));
router.get(
	'/github/callback',
	passport.authenticate('github', { successRedirect: 'http://localhost:3000/dashboard', failureRedirect: '/' })
);

// LinkedIn Oauth Routes
router.get('/linkedin', passport.authenticate('linkedin', { state: true }));
router.get(
	'/linkedin/callback',
	passport.authenticate('linkedin', {
		successRedirect: 'http://localhost:3000/dashboard',
		failureRedirect: '/'
	})
);

module.exports = router;