import Publication from './publication.model.js';

export const publicationPost = async (req, res) => {
    const username = req.user.username;
    const { title, category, text} = req.body;

    const publication = new Publication({username, title, category, text});

    await publication.save();

    res.status(200).json({ msg: "Public post sucessfully!!!", publication });
}