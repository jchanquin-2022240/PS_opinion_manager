import { Routes } from "express";
import { check } from "express-validator";

import {
    userPost
} from "./user.controller.js";

import { validateFields } from "../middlewares/validate-fields.js";


const router = Router ();