import express from "express";
import{addTicket,deleteTicket,getTicketsByUserId} from "../controllers/ticket.js";

const router = express.Router();

router.post("/addticket", addTicket);
router.post("/delteticket", deleteTicket);
router.post("/getticketsbyuserid", getTicketsByUserId);

export default router;
