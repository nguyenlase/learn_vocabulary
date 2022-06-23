import type { NextApiRequest, NextApiResponse } from 'next';
import { sql_query } from '../../../lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { keySearch } = req.query;

        const result = await sql_query(`
        select v.EnglishWord,v.Vietnamese from vocabulary as v 
where v.EnglishWord like "%${keySearch}%" or v.Vietnamese like "%${keySearch}%"
        `);

        if (result.length > 0) {
            res.status(200).json(result);
        }
    } catch (error) {
        console.log(error);
    }
};

export default handler;