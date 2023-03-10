const requireAdminAuth = async (req, res, next) => {
  if(req.user.admin === true){
    next()
  }else{
    res.status(401).json({ error: "Request is not authorized" })
  }
}

module.exports = requireAdminAuth
