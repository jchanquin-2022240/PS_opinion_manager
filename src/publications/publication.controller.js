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

            res.status(200).json({ msg: "Post update successfully!!!", updatePost});
        } else {
            res.status(403).json({ msg: "You can't edit this post" });
        }
    } catch (e) {
        return res.status(500).json({ msg: "Conflict when updating"});
    }
}

export const deleteMyPublication = async (req, res) => {
    const {id} = req.params;
    const username = req.user.username;

    try {
        const publication = await Publication.findById(id);

        if (publication.username === username) {
            const publication = await Publication.findByIdAndUpdate(id, {publicationStatus : false});
            const deletePost = await Publication.findOne({ _id : id});

            res.status(200).json({ msg: "Post successfully deleted", publication, deletePost})
        } else {
            res.status(403).json({ msg: "You can't delete this post"});
        }
    } catch (e) {
        return res.status(500).json({ msg: "Conflict when deleting" });
    }
}


//comments

export const putAddComment = async (req, res) => {
    const { id } = req.params;
    const { _id, username, title, category, pubicationStatus, ...resto} = req.body;

    const commentUser = req.user.username;
    const addComment = { commentUser: commentUser, ...resto};

    await Publication.findByIdAndUpdate( id, { $push: { comments: addComment }});
    const publication = await Publication.findOne({ _id: id});

    res.status(200).json({ msg: "Added comment successfully!!!", publication});
}

export const updateMyComment = async (req = request, res = response) => {
    const { title, commentID } = req.params;
    const commentUser = req.user.username;

    try {
        const publication = await Publication.findOne({ title });

        if (!publication) {
            return res.status(404).json({ msg: "Post not found" });
        }

        if (!publication.publicationStatus) {
            return res.status(403).json({ msg: "You can't update comments on an inactive post" });
        }

        const comentario = publication.comments.find(comment => comment._id.toString() === commentID);

        if (!comentario) {
            return res.status(404).json({ msg: "Comment not found" });
        }

        if (comentario.commentUser === commentUser) {
            const { _id, ...rest } = req.body;

            await Publication.findOneAndUpdate(
                { title, "comments._id": commentID },
                { $set: { "comments.$.commentU": rest.commentU, "comments.$.otherField": rest.otherField, "comments.$.commentUser": commentUser } }
            );

            const updatedPublication = await Publication.findOne({ title });

            res.status(200).json({
                msg: "Comment updated successfully",
                publicationN: updatedPublication
            });
        } else {
            res.status(403).json({
                msg: "You are not the author of this comment"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

export const deleteMyComment = async (req = request, res = response) => {
    const { title, commentID } = req.params;
    const commentUser = req.user.username;

    try {
        // Utilizamos findOneAndUpdate para actualizar y obtener la publicación actualizada
        const publicationN = await Publication.findOneAndUpdate(
            { title, "comments._id": commentID, "comments.commentUser": commentUser },
            { $pull: { comments: { _id: commentID, commentUser: commentUser } } },
            { new: true }
        );

        if (!publicationN) {
            // Si no se encuentra la publicación, entonces no existía o no se cumplían las condiciones
            return res.status(404).json({ msg: "Post or comment not found" });
        }

        res.status(200).json({
            msg: "Comment successfully deleted",
            publicationN
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};
