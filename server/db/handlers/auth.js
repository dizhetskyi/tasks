const http = require('http');
const db = require('./../config');

const jwt = require('jsonwebtoken');

module.exports = {

  githubAuth: (req, res) => {

    const client_id = 'e7037ffd60cfd5c102ff';
    const client_secret = '4ee8fd0af026dcd9ce572efcfb8145e1b4ffc4ec';
    const code = req.body.code;

    const secret = 'adasdsada11'

    fetch(`https://github.com/login/oauth/access_token`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: client_id,
        client_secret: client_secret,
        code: code
      })
    })
      .then(result => result.json())
      .then(json => {

        fetch(`https://api.github.com/user?access_token=${json.access_token}`)
          .then(result2 => result2.json())
          .then(json2 => {

            var token = jwt.sign({
              username: json2.name,
              token: json.access_token
            }, secret, {
              expiresIn: 120
            });

            res.json({
              token: token
            })

          })
        
        

      })

  }

}