const app = require('./app')
const http = require('http')


const PORT = process.env.PORT || 5000;

const server = http.createServer(app)

server.listen(PORT, ()=> {
    console.log(`Server is UP on port: ${PORT}`)
})





// app.post('/v1/login', async (req,res) => {
//     try {
//         const {email, hashed_password} = req.body;
//         // console.log(req.body)
        
//         if (!email || !hashed_password){
//             return res.status(400).json({error: 'Email and password are required'})
//         }

//         const user = await User.findOne( {email} );
//         if (!user) {
//             return res.status(401).json({ error: 'Invalid email or password' });
//           }
//         //   console.log('user :' ,user.hashed_password)

//         //  const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
//         const isPasswordValid = user.hashed_password === hashed_password

//         if (!isPasswordValid) {
//             return res.status(401).json({ error: 'Invalid email or password' });
//         }

//         return res.status(200).send('Logged in')

//     }catch (err){
//         console.error('Error during login:', err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
//     })


//     app.post()

