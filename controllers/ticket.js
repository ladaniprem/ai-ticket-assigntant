import inngest from "../inngest/client.js";
import ticket from "../models/ticket.model.js";


// created ticket 
export const CreateTicket = async(req,res) => {
    try {
        const {title,description} = req.body
        if(!title||!description){
            return res.status(400).json({
                message:"Title and description are required"
            })
        }
        ticket.create({
            title,
            description,
            createdBy: req.user._id.toString()
        })

      // this is the ai pipeline 
        await inngest.send({
            name:"ticket/created",
            data: {
                ticketId: (
                    await newTicket
                )._id.toString(),
                title,
                description,
                createdBy:req.user._id.toString()
            }
        });
       // new ticket created it  
        return res.status(201).json({
            message:"Ticket created and processing started",
            ticket: newTicket
        })

    } catch (error) {
       console.error("Error creating ticket",error.message) 
       return res.status(500).json({
        message:"Internal Server Error"
    })
    }
}

export const getAllTickets = async(req,res) => {
    try {
        const user = req.user
        let tickets = []
        if (user.role!=="user") {
            tickets = await ticket.find({})
            .populate("assignTo",["email","_id"])
            .sort({createdAt:-1})
        }
        else {
            tickets = await ticket.find({
                createdBy:user._id
            })
            .select("title description status createdAt")
            .sort({createdAt:-1})
        }
        return res.status(200).json(tickets)
    } 
    catch (error) {
       console.error("Error fetching tickets",error.message) 
       return res.status(500).json({
        message:"Internal Server Error"
    })
    }
}

export const getTicket = async(req,res) => {
    try {
        const user = req.user
        let ticket;
        if (user.role!=="user") {
            ticket = await ticket.findById(req.params.id)
            .populate("assignTo",["email","_id"])
            .sort({createdAt:-1})
        }
        else {
            await ticket.findOne({
                createdBy:user._id,
                _id:req.params.id
            })
            .select("title description status createdAt")
        }
        if(!ticket){
            return res.status(404).json({
                message:"Ticket not found "
            })
        }
    } 
    catch (error) {
       console.error("Error fetching ticket",error.message) 
       return res.status(500).json({
        message:"Internal Server Error"
    })
    }
}