
export const profile=(req, res)=>{
    const {id} = req;
    return res.json({message:"user profile", id})
}