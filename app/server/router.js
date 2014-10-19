var CT = require('./modules/country-list');
var AM = require('./modules/account-manager');
var EM = require('./modules/email-dispatcher');

module.exports = function (app) {

    // Home page - App starting page
    app.get('/', function (req, res) {
        // check if the user's credentials are saved in a cookie //
        if (req.cookies.username == undefined || req.cookies.password == undefined) {
            res.render('login', { title: 'Home' });
        } else {
            // attempt automatic login //
            AM.autoLogin(req.cookies.username, req.cookies.password, function (o) {
                if (o != null) {
                    req.session.userAccount = o;
                    res.redirect('/home');
                } else {
                    res.render('login', { title: 'Home' });
                }
            });
        }
    });

    // Home page - Form Submission
    app.post('/', function (req, res) {
        AM.manualLogin(req.param('username'), req.param('password'), function (e, o) {
            if (!o) {
                res.send(e, 400);
            } else {
                req.session.userAccount = o;
                if (req.param('remember-me') == 'true') {
                    res.cookie('username', o.username, { maxAge: 900000 });
                    res.cookie('password', o.password, { maxAge: 900000 });
                }
                res.send(o, 200);
            }
        });
    });

    // creating new account
    app.get('/signup', function (req, res) {
        res.render('signup', { title: 'Signup' });
    });

    // creating new account - Form Submission
    app.post('/signup', function (req, res) {
        AM.addNewAccount({
            username: req.param('username'),
            password: req.param('password'),
            email: req.param('email')
        }, function (e) {
            if (e) {
                res.send(e, 400);
            } else {
                res.send('ok', 200);
                res.render('login', { 'title': 'Home' });
                AM.getAccountByEmail(req.param('email'), function (o) {
                    if (o) {
                        EM.verifyEmail(o, function (e, m) {
                            // this callback takes a moment to return //
                            // should add an ajax loader to give user feedback //
                            if (!e) {
                                //	res.send('ok', 200);
                            } else {
                                res.send('email-server-error', 400);
                                for (k in e) console.log('error : ', k, e[k]);
                            }
                        });
                    } else {
                        res.send('email-not-found', 400);
                    }
                });
            }
        });
    });

    //Email Verification
    app.get('/email-verify', function (req, res) {
        var un = req.param('username');
        AM.updateEmailverified(un, function (e, o) {
            if (e) {
                console.log(e);
            } else {
                res.render('email-verify', { 'username': un });
            }
        });

    });

    // logged-in user home page
    app.get('/home', function (req, res) {
        var account = req.session.userAccount;
        if (account == null) {
            // if user is not logged-in redirect back to login page //
            res.redirect('/');
        } else {
            res.render('home', {
                title: 'Home',
                userdata: req.session.userAccount
            });
        }
    });

    //editprofile page
    app.get('/editprofile', function (req, res) {        
        AM.getAccountByUsername(req.session.userAccount.username, function (error, result) {
            if (result) {                
                res.render('generalprofile', {
                    title: 'Edit Profile',
                    userdata: result
                });
            }
        });        
    });

    //General Profile
    app.post('/genprofile', function (req, res) {
        AM.updateGeneralProfile(req.body, function (e, o) {
            if (e) {
                res.send('error-updating-account', 400);
            } else {
                AM.findById(req.body.id, function (error, result) {
                    if (result) {
                        res.render('professionalprofile', { userdata: result });
                    }
                });
            }
        });
    });

    //Professional Profile
    app.post('/profprofile', function (req, res) {
        AM.updateProfessionalProfile(req.body, function (e, o) {
            if (e) {
                res.send('error-updating-account', 400);
            } else {
                AM.findById(req.body.id, function (error, result) {
                    if (result) {
                        res.render('educationprofile', { userdata: result });
                    }
                });
            }
        });
    });


    //Education Profile
    app.post('/eduprofile', function (req, res) {
        AM.updateEducationProfile(req.body, function (e, o) {
            if (e) {
                res.send('error-updating-account', 400);
            } else {
                res.send('ok', 200);
            }
        });
    });

    //Add Job Opening page
    app.get('/addjobopening', function (req, res) {
        res.render('addjobopening', {
            title: 'Add Job Opening',
            userdata: req.session.userAccount
        });
    });

    //Add add JobOpening
    app.post('/jobopening', function (req, res) {
        AM.addJobOpening(req.body, function (e, o) {
            if (e) {
                res.send('error-updating-account', 400);
            } else {
                res.send('ok', 200);
            }
        });
    });

    //Get JobOpening
    app.get('/jobopening/:id', function (req, res) {
        var id = Number(req.params.id) - 1;
        AM.getAccountByUsername(req.session.userAccount.username, function (e, o) {
            if (e) {
                res.send('error', 400);
            } else {
                res.render('editjobopening', { id: id, jobopening: o.jobopenings[id] });
            }
        });

    });

    //Update JOb opening    
    app.post('/editjobopening', function (req, res) {
        AM.updateJobOpening(req.body, function (e, o) {
            if (e) {
                res.send('error-updating-account', 400);
            } else {
                res.send('ok', 200);
            }
        });
    });


    //Add Job
    app.post('/jobs', function (req, res) {
        console.log('Add Job');
        AM.addJob(req.session.userAccount.username, req.body, function (e, o) {
            if (e) {
                res.send('error', 400);
            } else {
                res.send('ok', 200);
            }
        });
    });

    //update job
    app.put('/jobs/:id', function (req, res) {
        console.log('Update Job');
        //var id = Number(req.params.id) - 1;          
        console.log(req.params.id);
        //res.send('ok', 200);
        AM.updateJob(req.session.userAccount.username, req.params.id, req.body, function (e, o) {
            if (e) {
                res.send('error', 400);
            } else {
                res.send('ok', 200);
            }
        });
    });

    //Get All Jobs
    app.get('/jobs', function (req, res) {
        AM.getAccountByUsername(req.session.userAccount.username, function (e, o) {
            if (e) {
                res.send('error', 400);
            } else {
                res.send(o.savedjobs, 200);
            }
        });
    });


    //Settings page
    app.get('/accountsettings', function (req, res) {
        res.render('settings', {
            title: 'Account Settings',
            userdata: req.session.userAccount
        });
    });

    //change settings & logout
    app.post('/accountsettings', function (req, res) {
        if (req.param('username') != undefined) {
            AM.updateAccount({
                username: req.param('username'),
                password: req.param('password'),
                email: req.param('email')
            }, function (e, o) {
                if (e) {
                    res.send('error-updating-account', 400);
                } else {
                    req.session.userAccount = o;
                    // update the user's login cookies if they exists //
                    if (req.cookies.username != undefined && req.cookies.password != undefined) {
                        res.cookie('username', o.username, { maxAge: 900000 });
                        res.cookie('password', o.password, { maxAge: 900000 });
                    }
                    res.send('ok', 200);
                }
            });
        }
    });


    //logout
    app.get('/logout', function (req, res) {
        res.clearCookie('username');
        res.clearCookie('password');
        req.session.destroy(function (e) {
            res.redirect('/');
        });
    });

    app.get('/smartedit/:id', function (req, res) {
        var id = Number(req.params.id);
        AM.getAccountByUsername(req.session.userAccount.username, function (e, o) {
            if (e) {
                res.send('error', 400);
            } else {
                res.render('smartedit', { userdata: o, gen: o.generalprofile, prof: o.professionalprofile, edu: o.educationprofile, jobopening: o.jobopenings[id] });
            }
        });
    });

    //run checks
    app.get('/runchecks', function (req, res) {        
        AM.getAccountByUsername(req.session.userAccount.username, function (e, o) {
            if (e) {
                res.send('error', 400);
            } else {
                res.render('runchecks', { userdata: o });
            }
        });
    });




    // password reset //
    app.post('/forgot-un-pwd', function (req, res) {
        // look up the user's account via their email //
        AM.getAccountByEmail(req.param('email'), function (o) {
            if (o) {
                res.send('ok', 200);
                EM.dispatchForgotUsernamePassword(o, function (e, m) {
                    // this callback takes a moment to return //
                    // should add an ajax loader to give user feedback //
                    if (!e) {
                        //	res.send('ok', 200);
                    } else {
                        res.send('email-server-error', 400);
                        for (k in e) console.log('error : ', k, e[k]);
                    }
                });
            } else {
                res.send('email-not-found', 400);
            }
        });
    });

    app.get('/reset-password', function (req, res) {
        var email = req.query["e"];
        var passH = req.query["p"];
        AM.validateResetLink(email, passH, function (e) {
            if (e != 'ok') {
                res.redirect('/');
            } else {
                // save the user's email in a session instead of sending to the client //
                req.session.reset = { email: email, passHash: passH };
                res.render('reset', { title: 'Reset Password' });
            }
        })
    });

    app.post('/reset-password', function (req, res) {
        var nPass = req.param('pass');
        // retrieve the user's email from the session to lookup their account and reset password //
        var email = req.session.reset.email;
        // destory the session immediately after retrieving the stored email //
        req.session.destroy();
        AM.updatePassword(email, nPass, function (e, o) {
            if (o) {
                res.send('ok', 200);
            } else {
                res.send('unable to update password', 400);
            }
        })
    });

    // view & delete accounts //

    app.get('/print', function (req, res) {
        AM.getAllRecords(function (e, accounts) {
            res.render('print', { title: 'Account List', accts: accounts });
        })
    });

    app.post('/delete', function (req, res) {
        AM.deleteAccount(req.body.id, function (e, obj) {
            if (!e) {
                res.clearCookie('user');
                res.clearCookie('pass');
                req.session.destroy(function (e) { res.send('ok', 200); });
            } else {
                res.send('record not found', 400);
            }
        });
    });

    app.get('/reset', function (req, res) {
        AM.delAllRecords(function () {
            res.redirect('/print');
        });
    });

    app.get('*', function (req, res) { res.render('404', { title: 'Page Not Found' }); });

};