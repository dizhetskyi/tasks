const http = require('http');
const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');

const db = require('./../config');


module.exports = {

  githubAuth: (req, res) => {

    const client_id = req.app.get('githubClientId');
    const client_secret = req.app.get('githubSecret');
    const code = req.body.code;

    const secret = req.app.get('secret');

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
      .then(github_token => {

        fetch(`https://api.github.com/user?access_token=${github_token.access_token}`)
          .then(result2 => result2.json())
          .then(githubUser => {

            db.User.findOne({githubId: githubUser.id}, (err, userDoc)=>{

              if (userDoc === null) {

                db.User.create({
                  email: githubUser.email,
                  githubId: githubUser.id,
                  login: githubUser.login,
                  firstname: githubUser.name && githubUser.name.split(' ')[0],
                  lastname: githubUser.name && githubUser.name.split(' ')[1]
                }, (err, createdUser) => {

                  var token = jwt.sign({
                    login: createdUser.login,
                    firstname: createdUser.firstname,
                    lastname: createdUser.lastname
                  }, secret, {
                    expiresIn: 365
                  });

                  res.json({
                    token: token
                  })

                })

              } else {

                var token = jwt.sign({
                  login: userDoc.login,
                  firstname: userDoc.firstname,
                  lastname: userDoc.lastname
                }, secret, {
                  expiresIn: 360
                });

                res.json({
                  token: token
                })
              }

            })

          })



      })

  }

}
