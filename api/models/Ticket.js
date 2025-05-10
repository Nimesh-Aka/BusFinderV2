import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
  userId: String,
  totalCost: String,
  routeTo: String,
  busId: String,
  selectedSeats: [String],
});

// Static method to add a ticket
TicketSchema.statics.addTicket = function(details) {
  const ticket = new this(details);
  return ticket.save();
};

// Static method to delete a ticket by ticket ID
TicketSchema.statics.deleteTicketById = function(ticketId) {
  return this.findByIdAndDelete(ticketId);
};

// Static method to get all tickets by user ID
TicketSchema.statics.getTicketsByUserId = function(userId) {
  return this.find({ userId });
};

export default mongoose.model("Ticket", TicketSchema);