import { toast } from 'react-toastify';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Router, useRouter } from 'next/router';
import { sql_query } from '../../../lib/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { userEmail, password } = req.body;

        const data = await sql_query(`select * from user 
        where UserEmail = '${userEmail}' and Password = '${password}' `);

        if (data.length > 0) {
            res.status(200).json(data);
        } else {
            res.status(400).json('Bad request ne');
        }
    } catch (error) {
        console.log(error);
    }
}
  