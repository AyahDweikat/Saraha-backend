
import AuthRouter from '../src/Modules/Auth/auth.router.js'
import UserRouter from '../src/Modules/User/user.router.js'

import MessageRouter from '../src/Modules/Message/message.router.js'
import * as dotenv from 'dotenv'
dotenv.config()

const initApp = (app,express)=>{
    app.use(express.json())
    app.get('/',(req, res)=>{
        return res.status(200).json({message:"success connecting!"})
    })

    app.use('/auth', AuthRouter)
    app.use('/auth', AuthRouter)
    app.use('/user', UserRouter)
    app.use('/message', MessageRouter)
    app.use('*', (req, res)=>{
        res.json({message:"page not found"})
    })
}
export default initApp;