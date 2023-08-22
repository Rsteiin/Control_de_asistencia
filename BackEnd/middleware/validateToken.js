const { decrypt } = require('./decrypt');


const tokenValid = (req, res, next) => {
    const { token, tokenEncrypted } = req.body;
    if(!token || !tokenEncrypted){
        res.status(403).send(`Invalid token`);
    } 
    try{
        let tokenDecrypted = decrypt(tokenEncrypted);
        if (tokenDecrypted === token) {
            next();
          } else {
            res.status(403).send(`Invalid token`);
          }
    }catch(e){
        res.status(403).send(`Invalid token`);

    }
  
}

module.exports = tokenValid;