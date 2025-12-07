import bcrypt from 'bcryptjs';
import {pool} from "../config/db.js"
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req,res) => {
    const {username,email,password} = req.body;

    try{
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1',[email]);
        if(userExists.rows.length > 0){
            return res.status(400).json({message:"User already exists"});

        }

        const salt = await bcrypt.gensalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = await pool.query(
            'INSERT INTO users (username,email , password_hash) values ($1,$2,$3) returning id,username,email,role',
            [username,email,hashedPassword]
        );

        const user = newUser.rows[0];
        res.status(201).json({
            id:user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user.id),
        });

    } catch(error){
        console.error(error.message);
        res.status(500).send('Server Error')
    }
}

export const loginUser = async(req,res) =>{
    const {email,password} = req.body;
    try{
        const result = await pool.query('select * from users where email = $1',[email]);
        const user = result.rows[0];

        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const isMatch = await bcrypt.compare(password,user.password_hash);

        if(!isMatch){
            return res.status(400).json({message:"Invalid Credentials"});

        }

        res.json({
            id:user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user.id),
        });

    } catch(error){
        console.error(error.message);
        res.status(500).send('Server Error')
    }
}