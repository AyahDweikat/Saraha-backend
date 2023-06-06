export const asyncHandler =(fn)=>{
    return (req, res)=>{
        fn(req, res).catch(error=>{
            return res.status(500).json({messaga:"catch error", error:error.stack})
        })
    }
}