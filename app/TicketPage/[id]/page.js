import React from "react";
import TicketForm from "@/app/components/TicketForm";

const getTicketById = async (id) => {
  const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed To Edit Ticket");
  }
  return res.json();
};

const TicketPage = async ({ params }) => {
  const EDITMode = params.id === "new" ? false : true;
  let updateTicketData = {};
  if (EDITMode) {
    updateTicketData = await getTicketById(params.id);
    updateTicketData = updateTicketData.foundTicket;
  } else {
    updateTicketData = {
      _id: "new",
    };
  }
  return (
    <div>
      <TicketForm ticket={updateTicketData} />{" "}
    </div>
  );
};

export default TicketPage;