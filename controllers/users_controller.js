const User = require('../models/user.js');

module.exports.profile = function(req, res){
    // if(req.cookies.user_id){
    //     User.findById(req.cookies.user_id, function(err, user){
    //         if(user){
    //             return res.render('user_profile.ejs', {
    //                 title: "User Profile",
    //                 user: user
    //             })
    //         }
        
    //         return res.redirect('/users/sign-in');

    //     });   
    // }else{
    //     return res.redirect('/users/sign-in');
    // }

    try {
        if (req.cookies.user_id) {
          User.findById(req.cookies.user_id, function(err, user) {
            if (user) {
              return res.render('user_profile.ejs', {
                title: "User Profile",
                user: user
              });
            }
      
            return res.redirect('/users/sign-in');
          });
        } else {
          return res.redirect('/users/sign-in');
        }
      } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
      }

};

module.exports.signUp = function(req, res){
    return res.render('user_sign_up.ejs', {
        title: "Home"
    });
};

module.exports.signIn = function(req,res){
    return res.render('user_sign_in.ejs', {
        title: "Home"
    });
};

// get the sign up data
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    // User.findOne({email: req.body.email}, function(err, user){
    //     if(err){console.log("Error in finding the user"); return;}

    //     if(!user){
    //         User.create(req.body, function(err, user){
    //             if(err){console.log("Error in creating user while signing up"); return;}
    //         });
    //         return res.redirect('/users/sign-in');
    //     }else{
    //         return res.redirect('back');
    //     }
    // });

    User.findOne({email: req.body.email})
    .then((user) => {
        if(!user){
            User.create(req.body)
            .then((createdUser) => {
                return res.redirect('/users/sign-in');
            })
            .catch((err) => {
                console.log("Error in creating the user");
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
    .catch((err) => {
        console.log('Error in finding the user in signing up');
        return res.redirect('back');
    })

};

// // action to sign in and create a session for the user
// module.exports.createSession = function(req, res){
//     // Find the user
//     User.findOne({email: req.body.email})
//     .then((user) => {
//         if(!user){
//             return res.redirect('back');
//         }else{
//             if(user.password != req.body.password){
//                 return res.redirect('back');
//             }else{
//             res.cookie('user_id', user.id);
//             return res.redirect('/users/profile');
//             }
//         }
//     })
//     // If I get error
//     .catch((err) => {
//         console.log("Error in finding the user in signing in");
//         return;
//     })
// }



// sign in and create a session for the user
module.exports.createSession = function(req, res) {
    // steps to authenticate
    // find the user
    User.findOne({ email: req.body.email })
      .then(function(user) {
        // handle user found
        if (user) {
          // handle password which doesn't match
          if (user.password != req.body.password) {
            return res.redirect('back');
          }
  
          // handle session creation
          res.cookie('user_id', user._id);
          return res.redirect('/users/profile');
        } else {
          // handle user not found
          return res.redirect('back');
        }
      })
      .catch(function(err) {
        console.log('error in finding user in signing in', err);
        return res.redirect('back');
      });
  };  