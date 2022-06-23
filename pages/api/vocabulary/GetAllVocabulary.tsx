import type { NextApiRequest, NextApiResponse } from 'next';
import { sql_query } from '../../../lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { userEmail, page } = req.query;

        const resultID = await sql_query(
            `select user.UserID from user where UserEmail = '${userEmail}'`
        );
        const id = resultID[0].UserID;
        const offsetValue = (Number(page) - 1) * 10;

        const listVocab = await sql_query(`
        select u.UserID,v.EnglishWord,v.Vietnamese,v.VocabularyID from user as u
        inner join learnvocabularydetail as r
        on u.UserID = r.UserID  
        inner join vocabulary as v
        on r.VocabularyID = v.VocabularyID and r.UserID = ${id} LIMIT 10 OFFSET ${offsetValue}
        `);

        if (listVocab.length >= 0) {
            res.status(200).json(listVocab);
        } else {
            res.status(400).json([]);
        }
    } catch (error) {
        console.log(error);
    }
};

export default handler;
