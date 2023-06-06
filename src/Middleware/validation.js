
const dataMethods =['body', 'query', 'params']
export const validationFun =(schema)=>{
    return (req, res, next)=>{
        const validationErrors=[]
        dataMethods.forEach((method)=>{
            if(schema[method]){
                const validationResult = schema[method].validate(req[method], {abortEarly:false});
                if(validationResult?.error){
                    validationErrors.push(validationResult.error.details)
                }
            }
        })


        // if(schema.body){
        //     const validationResult = schema.body.validate(req.body, {abortEarly:false});
        //     if(validationResult?.error){
        //         validationErrors.push(validationResult.error)
        //     }
        // }


        if(validationErrors.length>0){
            return res.json({message:'validation errors',validationErrors})
        }
        else {
            return next()
        }
    }
}