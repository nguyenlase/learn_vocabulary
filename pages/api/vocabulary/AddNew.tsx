import type { NextApiRequest, NextApiResponse } from 'next';
import { sql_query } from '../../../lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { vnWord, enWord, userEmail } = req.query;

        const addVocab = await sql_query(`
        Insert into vocabulary(EnglishWord,Vietnamese,IsReLearn)
            values ('${enWord}', '${vnWord}',false)
        `);

        if (addVocab) {
            const idVocab = await sql_query(
                `Select v.VocabularyID from vocabulary as v where v.EnglishWord = '${enWord}'`
            );
            const idUser = await sql_query(
                `Select u.UserID from user as u where u.UserEmail = '${userEmail}'`
            );

            const idVocabString = idVocab[0].VocabularyID;
            const idUserString = idUser[0].UserID;

            if (idVocab && idUser) {
                const linkTable =
                    await sql_query(`Insert into learnvocabularydetail (UserID,VocabularyID,DateTime)
                values(${idUserString},${idVocabString},'6/21/2022')`);

                res.status(200).json({ linkTable, userEmail });
            }
        }
    } catch (error) {
        console.log(error);
    }
};

export default handler;