module.exports.home = function(req, res){
    console.log(req.cookies);
    // We can edit the cookie here
    res.cookie('user_id', 25);
    return res.render('../views/home.ejs', {
        title: "Home" 
    });
};

// module.exports.actionName = function(req, res){};