const mongoose = require('mongoose')
const TicketSchema = mongoose.model('TicketSchema')

// Get Open Tickets
exports.openTickets = async (req, res) => {
    // console.log("Open Tickets API HIT")
    
    try {
        TicketSchema.find({ status: 'issued', assignedto: req.user._id })
        .then((tickets) => {
         res.json({tickets})
        })
    } catch (error) {
        console.log(error)
        return res.status(404)
    }
}

// Get unIssued Tickets
exports.unissuedTickets = async (req, res) => {
    // console.log("Unissued ticket API HIT")
    try {
        TicketSchema.find({ status: 'unissued'})
        .then((tickets) => {
            res.json({tickets})
        })
        return res.status(200)
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
}

exports.completedTickets = async (req, res) => {
    // console.log("Unissued ticket API HIT")
    try {
        TicketSchema.find({ status: 'completed',  assignedto: req.user._id })
        .then((tickets) => {
            res.json({tickets})
        })
        return res.status(200)
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
}


// Create a new ticket
exports.createTicket = async (req, res) => {

    console.log("Create a new ticket API HIT")
    try {
        const {name, company, issue, priority} = req.body
        if (!name || !company || !issue || !priority ) {
            return res.status(422).json({error: "Please add all the fields"})
        }
        const newTicket = new TicketSchema({
            name,
            company,
            issue,
            priority,
        })
        newTicket.save().then(result=>{
            res.json({newTicket:result})
        })
        return res.status(200)
    } catch (error) {
        console.log(error)
    }
}

// Convert a ticket 
exports.convertTicket = async (req, res) => {
    // console.log('conversion made \n')
    // console.log(req.user._id)
    // console.log(ticketId)

    const {data} = req.body
    const ticketId = data['0']._id

    try {
        TicketSchema.findByIdAndUpdate(ticketId), {
            $push: {assignedto : req.user._id}
        }
    } catch (error) {
        console.log(error)
    }
}