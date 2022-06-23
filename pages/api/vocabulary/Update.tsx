import type { NextApiRequest, NextApiResponse } from 'next';
import { sql_query } from '../../../lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id, english, vietnamese } = req.query;

        const result = await sql_query(`update vocabulary 
        set Vietnamese = '${vietnamese}', EnglishWord = '${english}'
        where VocabularyID = ${id}`);

        if (result) {
            res.status(200).json({ message: 'Update data success' });
        }
    } catch (error) {
        console.log(error);
    }
};

export default handler;