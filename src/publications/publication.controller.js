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

export const putMyPublication = async ( req, res) => {
    const { id } = req.params;
    const username = req.user.username;

    try {
        const publication = await Publication.findById(id);

        if (publication.username === username) {
            const { _id, username, pubicationStatus, ...resto} = req.body;
            await Publication.findByIdAndUpdate(id, resto);

            const updatePost = await Publication.findOne({_id: id});

            res.status(200).json({ msg: "Update sucessfully!!!", updatePost});
        }
    } catch (e) {
        return res.status(500).json({ msg: "Conflict when updating"});
    }
}