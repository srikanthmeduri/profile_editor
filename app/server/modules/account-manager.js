
var crypto = require('crypto');
var MongoDB = require('mongodb').Db;
var Server = require('mongodb').Server;
var moment = require('moment');

var dbPort = 27017;
var dbHost = 'localhost';
var dbName = 'profiles';

/* establish the database connection */
var db = new MongoDB(dbName, new Server(dbHost, dbPort, { auto_reconnect: true }), { w: 1 });
db.open(function (e, d) {
    if (e) {
        console.log(e);
    } else {
        console.log('connected to database :: ' + dbName);
    }
});
var accounts = db.collection('accounts');

/* login validation methods */
exports.autoLogin = function (username, password, callback) {    
    accounts.findOne({ username: username }, function (e, o) {
        if (o) {            
            o.password == password ? callback(o) : callback(null);
        } else {                        
            callback(null);
        }
    });
}

exports.manualLogin = function (username, password, callback) {
    accounts.findOne({ username: username }, function (e, o) {
        if (o) {
            o.password == password ? callback(null, o) : callback('invalid-password');
        } else {
            callback('user-not-found');
        }
    });
}

/* record insertion, update & deletion methods */
exports.addNewAccount = function (newData, callback) {
    accounts.findOne({ username: newData.username }, function (e, o) {
        if (o) {
            callback('username-taken');
        } else {
            accounts.findOne({ email: newData.email }, function (e, o) {
                if (o) {
                    callback('email-taken');
                } else {
                    newData.creationdate = new Date();
                    newData.emailverified = false;
                    newData.generalprofile = null;
                    newData.professionalprofile = null;
                    newData.educationprofile = null;
                    newData.jobopenings = null;
                    newData.savedjobs = null;

                    accounts.insert(newData, { safe: true }, callback);
                }
            });
        }
    });
}

exports.updateAccount = function (newData, callback) {
    accounts.findOne({ username: newData.username }, function (e, o) {
        o.password = newData.password;
        o.email = newData.email;
        accounts.save(o, { safe: true }, callback);
    });
}

exports.updatePassword = function (email, newPass, callback) {
    accounts.findOne({ email: email }, function (e, o) {
        if (e) {
            callback(e, null);
        } else {
            o.password = newPass;
            accounts.save(o, { safe: true }, callback);
        }
    });
}

exports.updateEmailverified = function (username, callback) {
    accounts.findOne({ username: username }, function (e, o) {
        if (e) {
            callback(e, null);
        } else {
            o.emailverified = true;
            accounts.save(o, { safe: true }, callback);
        }
    });
}


//update general profile
exports.updateGeneralProfile = function (newData, callback) {
    accounts.findOne({ _id: getObjectId(newData.id) }, function (e, o) {
        if (e) {
            callback(e, null);
        } else {            
            o.generalprofile = newData;
            accounts.save(o, { safe: true }, callback);
        }
    });
}



exports.updateProfessionalProfile = function (newData, callback) {
    accounts.findOne({ _id: getObjectId(newData.id) }, function (e, o) {
        if (e) {
            callback(e, null);
        } else {
            o.professionalprofile = newData;
            accounts.save(o, { safe: true }, callback);
        }
    });
}


exports.updateEducationProfile = function (newData, callback) {    
    accounts.findOne({ _id: getObjectId(newData.id) }, function (e, o) {
        if (e) {
            callback(e, null);
        } else {
            o.educationprofile = newData;            
            accounts.save(o, { safe: true }, callback);
        }        
    });
}


exports.addJobOpening = function (newData, callback) {    
    accounts.findOne({ _id: getObjectId(newData.id) }, function (e, o) {
        if (e) {
            callback(e, null);
        } else {
            if(o.jobopenings != null){
                o.jobopenings.push(newData);
            }else{
                var temp = [];
                temp.push(newData);
                o.jobopenings = temp;
                temp=null;
            }            
            accounts.save(o, { safe: true }, callback);
        }        
    });
}

exports.updateJobOpening = function (newData, callback) {    
    accounts.findOne({ _id: getObjectId(newData.id) }, function (e, o) {
        if (e) {
            callback(e, null);
        } else {                    
            o.jobopenings[newData.rowid] = newData;                                    
            accounts.save(o, { safe: true }, callback);
        }        
    });
}

exports.addJob = function (username, newData, callback) {    
    accounts.findOne({ username: username }, function (e, o) {
        if (e) {
            callback(e, null);
        } else {
            if(o.savedjobs != null){
                o.savedjobs.push(newData);
            }else{
                var temp = [];
                temp.push(newData);
                o.savedjobs = temp;
                temp=null;
            }            
            accounts.save(o, { safe: true }, callback);
        }
    });
}

exports.updateJob = function (username,id, newData, callback) {    
    accounts.findOne({ username: username }, function (e, o) {
        if (e) {
            callback(e, null);
        } else {                                    
            console.log('account manager');
            console.log(newData);
            o.savedjobs[id] = newData;
            accounts.save(o, { safe: true }, callback);
        }
    });
}

/* account lookup methods */
exports.deleteAccount = function (id, callback) {
    accounts.remove({ _id: getObjectId(id) }, callback);
}

exports.getAccountByEmail = function (email, callback) {
    accounts.findOne({ email: email }, function (e, o) { callback(o); });
}

exports.getAccountByUsername = function (uname, callback) {    
    accounts.findOne({ username: uname }, function (e, o) {
        if (e) { callback(e,null); 
        }else{             
            callback(null,o);
        }        
    });
}

exports.validateResetLink = function (email, passHash, callback) {
    accounts.find({ $and: [{ email: email, pass: passHash }] }, function (e, o) {
        callback(o ? 'ok' : null);
    });
}

exports.getAllRecords = function (callback) {
    accounts.find().toArray(
		function (e, res) {
		    if (e) callback(e)
		    else callback(null, res)
		});
};

exports.delAllRecords = function (callback) {
    accounts.remove({}, callback); // reset accounts collection for testing //
};

exports.findById = function (id, callback) {
    accounts.findOne({ _id: getObjectId(id) }, function (e, res) {
        if (e) {
            callback(e)
        } else {
            callback(null, res);
        }
    });
};




/* auxiliary methods */

var getObjectId = function (id) {
    return accounts.db.bson_serializer.ObjectID.createFromHexString(id)
}




var findByMultipleFields = function (a, callback) {
    // this takes an array of name/val pairs to search against {fieldName : 'value'} //
    accounts.find({ $or: a }).toArray(
		function (e, results) {
		    if (e) callback(e)
		    else callback(null, results)
		});
}
