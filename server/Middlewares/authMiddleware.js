const jwt = require('jsonwebtoken');

module.exports = async function (req,res,next){
    try {
        let token = req.headers.authorization.split(" ")[1];
        let verifiedToken = jwt.verify(token,process.env.SECRET_KEY);
        req.body.userID = verifiedToken.userID;
        next();
    } catch (error) {
        res.send({
            success:false,
            message:"Invalid Token!"
        })
    }
}