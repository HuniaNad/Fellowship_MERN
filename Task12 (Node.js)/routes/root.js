const express = require('express');
const router = express.Router();
const path = require('path');

//^ begins, $ ends, | OR operator
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

// router.get('/old-page(.html)?', (req, res) => {
//     //to tell search engine that page has been moved permanently. 301 status code is used
//     res.redirect(301, '/new-page.html'); //by default 302
// });

module.exports = router;