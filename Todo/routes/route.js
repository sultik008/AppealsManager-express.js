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
router.get('/filter', GetbyDateAppeals); // пример отправки запроса | /appeals?startDate=2025-05-01&endDate=2025-05-25 диапозон дат || /appeals?date=2025-05-25 определенная дата 
router.put("/:id", editAppeal);
router.delete("/:id", deleteAppeal);
router.put("/:id/cancel", cancelAppeal);
router.put("/:id/start", startAppeal);
router.put("/:id/complete", completeAppeal);


export default router;
