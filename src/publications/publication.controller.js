import { response } from 'express';
import Publication from './publication.model.js';

export const publicationGetAll = async(req, res = response) => {
    const query = { publicationStatus: true};

    const [totalPublication, publications] = await Promise.all([
        Publication.countDocuments(query),
        Publication.find(query)
    ]);

    res.status(200).json({ msg: "Publications:", totalPublication, publications});
}

export const publicationPost = async (req, res) => {
    const username = req.user.username;
    const { title, category, text} = req.body;

    const publication = new Publication({username, title, category, text});

    await publication.save();

    res.status(200).json({ msg: "Public post sucessfully!!!", publication });
}