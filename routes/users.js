const express = require("express");
const router = express.Router();
const {SECRET_KEY} = require("../config");
const jwt = require("jsonwebtoken");
const {User} = require("../models/user");
const {ensureLoggedIn, ensureCorrectUser} = require("../middleware/auth")


/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/

router.get("/", ensureLoggedIn, async(req, res, next) => {
    const results = User.all()

    return res.json(results);
})

/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/

router.get("/:username", ensureLoggedIn, ensureCorrectUser, async (req, res, next) => {
    const {username} = req.body;
    const results = User.get(username)

    return res.json(results);
})

/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

router.get("/:username/to", ensureLoggedIn, ensureCorrectUser, async (req, res, next) => {
    const {username} = req.body;
    const results = User.messagesTo(username);

    return res.json(results)
})

/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/


router.get("/:username/from", ensureLoggedIn, ensureCorrectUser, async (req, res, next) => {
    const {username} = req.body;
    const results = User.messagesFrom(username);

    return res.json(results);
})


module.exports = router;