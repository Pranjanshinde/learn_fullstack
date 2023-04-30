const jwt=require("jsonwebtoken");

const auth=(req,res,next)=>{
    const token=req.headers.authorization;
    console.log(token);
    if(token)
    {
        try {
            const decoded=jwt.verify(token, 'masai');
            if (decoded) {
              req.body.author=decoded.author;
              req.body.author_id=decoded.author_id
                next();
                
            } else {
                res.send({"msg":"please login!!"})
            }
        } catch (error) {
            console.log(error.message);
            res.send("Please login");
        }
    }else{
        res.send({"msg":"please login!!"});
    }
}

module.exports={auth};