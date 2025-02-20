

exports.authenticateRequest = (req, res, next)  => {
    const appKeyAuth  = req.headers['app-auth-key'];

    if (!appKeyAuth || appKeyAuth != process.env.APP_KEY_AUTH){
        return res.status(401).json({msg: 'Unauthorized: Missing or Invalid API Key'})
    }

    next()
}