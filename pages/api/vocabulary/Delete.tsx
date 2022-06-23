import type { NextApiRequest, NextApiResponse } from 'next';
import { sql_query } from '../../../lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = req.query;

        const deleteDetail = await sql_query(`
        delete from learnvocabularydetail as l
        where l.VocabularyID IN ( select v.VocabularyID from vocabulary as v where v.VocabularyID = ${id});
        `);

        if (deleteDetail) {
            const deleteVocabulary = await sql_query(`
            delete from vocabulary as v
            where v.VocabularyID = ${id}
            `);

            if (deleteVocabulary) {
                res.status(200).json({ message: 'Delete success' });
            }
        }
    } catch (error) {
        console.log(error);
    }
};

export default handler;