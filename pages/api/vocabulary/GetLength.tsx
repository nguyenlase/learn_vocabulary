import type { NextApiRequest, NextApiResponse } from 'next';
import { sql_query } from '../../../lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { userEmail } = req.query;

        const resultID = await sql_query(
            `select user.UserID from user where UserEmail = '${userEmail}'`
        );
        const id = resultID[0].UserID;

        const lengthList =
            await sql_query(`select u.UserID,v.EnglishWord,v.Vietnamese from user as u
            inner join learnvocabularydetail as r
            on u.UserID = r.UserID
            inner join vocabulary as v
            on r.VocabularyID = v.VocabularyID and r.UserID = ${id}`);

        if (lengthList.length > 0) {
            const handleLength = Math.ceil(lengthList.length / 10);

            res.status(200).json({ lengthPage: handleLength });
        }
    } catch (error) {
        console.log(error);
    }
};

export default handler;