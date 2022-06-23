import type { NextApiRequest, NextApiResponse } from 'next';
import { sql_query } from '../../../lib/db';
const jwt = require('jsonwebtoken');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { userEmail, password, userName } = req.body;
        const data = await sql_query(
            `Select * from user where UserEmail = '${userEmail}' and Password = '${password}'`
        );
        console.log(data);
        if (data.length === 0) {
            console.log('1');
            const addUser =
                await sql_query(`Insert into user (UserEmail,Password,Address,Phone,isAdmin,UserName) 
            values( '${userEmail}' , '${password}' , '319 Tran Phu' , '0932132123' , false , '${userName}')`);

            if (addUser) {
                console.log('2');
                const token = await jwt.sign(
                    { userEmail },
                    process.env.JWT_KEY,
                    {
                        expiresIn: '7d',
                    }
                );

                res.status(200).json({ addUser, token });
            }
        } else {
            res.status(400).json('This account was already');
        }
    } catch (error) {
        console.log(error);
    }
};

export default handler;