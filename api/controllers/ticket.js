import Ticket from "../models/Ticket.js";

// Add a new ticket
export const addTicket = async (req, res) => {
  try {
    const ticket = await Ticket.addTicket(req.body);
    res.status(201).json({ success: true, ticket });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add ticket", error: error.message });
  }
};

// Delete a ticket by ID
export const deleteTicket = async (req, res) => {
  try {
    const { ticketId } = req.body;
    const deleted = await Ticket.deleteTicketById(ticketId);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }
    res.json({ success: true, message: "Ticket deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete ticket", error: error.message });
  }
};

// Get all tickets for a user by userId
export const getTicketsByUserId = async (req, res) => {
  try {
    const { userId } = req.body;
    const tickets = await Ticket.getTicketsByUserId(userId);
    res.json({ success: true, tickets });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to get tickets", error: error.message });
  }
};