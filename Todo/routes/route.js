import {
    getAllAppeals,
    addAppeal,
    editAppeal,
    deleteAppeal,
    cancelAppeal,
    startAppeal,
    completeAppeal,
    cancelinprogressAppeal


} from "../controllers/Controller.js";

import express from "express";
const router = express.Router();

router.get("/", getAllAppeals);
router.post("/", addAppeal);
router.put("/cancelinprogress", cancelinprogressAppeal);
router.put("/:id", editAppeal);
router.delete("/:id", deleteAppeal);
router.put("/:id/cancel", cancelAppeal);
router.put("/:id/start", startAppeal);
router.put("/:id/complete", completeAppeal);




export default router;