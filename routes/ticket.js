import express from 'express';
import {authenticate} from '../middlewares/auth.js'
import { CreateTicket, getAllTickets, getTicket } from '../controllers/ticket.js'

const router = express.Router();

router.get('/',authenticate,getAllTickets);
router.get('/:id',authenticate,getTicket);
router.post("/",authenticate,CreateTicket)


export default router;