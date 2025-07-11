const wrapAsync = (fn)=>{
    return (req, res, next) => {
        fn(req, res).catch(next)
    }
}

module.exports = wrapAsync