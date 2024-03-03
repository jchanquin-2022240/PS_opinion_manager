import { Router } from "express";
import { check } from "express-validator";

import {
    publicationPost,
    publicationGetAll,
    putMyPublication
} from "./publication.controller.js";

import { validateFields } from "../middlewares/validate-fields.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

const router = Router();

router.get("/", validateJWT, publicationGetAll);

router.post(
    "/",
    [
        validateJWT,
        check('title', "The title cannot be empty").not().isEmpty(),
        check('category', "The post category cannot be empty").not().isEmpty(),
        check('text', "The text cannot be empty").not().isEmpty(),
        validateFields,
    ], publicationPost);

router.put(
    "/updateMyPost/:id",
    [
        validateJWT,
        check('id', "ID invalid").isMongoId(),
        validateFields,
    ], putMyPublication);

export default router;