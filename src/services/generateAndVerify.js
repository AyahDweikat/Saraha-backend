import jwt from 'jsonwebtoken';
export const generateToken=(payLoad, signature=process.env.SIGNATURE, expiresIn='1h')=>{
    const token = jwt.sign(payLoad, signature, {expiresIn})
    return token;
}

export const verifyToken =(token,signature= process.env.SIGNATURE)=>{
    const decoded = jwt.decode(token,signature)
    return decoded;
}