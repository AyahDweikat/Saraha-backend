import bcrypt from 'bcrypt';

export const hashFunction =(plainText, saltRound=process.env.SALT_ROUND)=>{
    const hashValue = bcrypt.hashSync(plainText, parseInt(saltRound))
    return hashValue;
}


export const compareFunction=(password, hashValue)=>{
    const hashResult = bcrypt.compareSync(password, hashValue)
    return hashResult;
}
