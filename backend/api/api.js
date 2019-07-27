const services = require('../service/services');

  exports.Login = (req, res) => {
      //console.log("here")

    services.Login(req.body).then((LoggedIn) => {
       
            res.send("User LoggedIn");
        
    }).catch(function(error) {
        res.status(500).send(error);
      });
    
};
