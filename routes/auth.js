/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/


/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */


const {User} = require("../models/user");
const express = require("express");
const {SECRET_KEY} = require("../config");
const jwt = require("jsonwebtoken");
const router = express.Router();



router.post("/login", async (req, res, next) => {
    const {username, password} = req.body;
    if(User.authenticate(username, password)){
        User.updateLoginTimestamp(username);
        
    }
})

router.post("/register", async (res, req, next) => {
    const {username, password, first_name, last_name, phone} = req.body;

    User.register({username, password, first_name, last_name, phone})
    const token = jwt.sign({username}, SECRET_KEY);

    return res.json(token);

})

module.exports = router;