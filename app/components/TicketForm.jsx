"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const TicketForm = ({ ticket }) => {
  const EDITMode = ticket._id === "new" ? false : true;
  const router = useRouter();
  const StartingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "Not started",
    category: "Hardware Problem",
  };
  if (EDITMode) {
    (StartingTicketData.title = ticket.title),
      (StartingTicketData.description = ticket.description),
      (StartingTicketData.priority = ticket.priority),
      (StartingTicketData.progress = ticket.progress),
      (StartingTicketData.status = ticket.status),
      (StartingTicketData.category = ticket.category);
  }

  const [formData, setFormData] = useState(StartingTicketData);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // handle submit function
  const handleSubmit = async (e) => {
    if (EDITMode) {
      e.preventDefault();
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to update Ticket.");
      }
    } else {
      e.preventDefault();
      const res = await fetch("/api/Tickets", {
        method: "POST",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to create Ticket.");
      }
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3> {!EDITMode ? "Create Your Ticket!" : "Edit Post"} </h3>
        <label> Title </label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />
        <label> Description </label>
        <textarea
          name="description"
          id="description"
          onChange={handleChange}
          required={true}
          rows={5}
          value={formData.description}
        />
        <label> Category </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Hardware Problem"> Hardware Problem </option>
          <option value="Software Problem"> Software Problem </option>
          <option value="Project"> Project </option>
        </select>
        <label> Priority </label>
        <div>
          
          {[1, 2, 3, 4, 5, 6].map((priority) => (
            <React.Fragment key={priority}>
              <input
                id={`priority-${priority}`}
                name="priority"
                type="radio"
                onChange={handleChange}
                value={priority}
              />
              <label htmlFor={`priority-${priority}`}> {priority} </label>
            </React.Fragment>
          ))}
        </div>
        <label> Progress </label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min={0}
          max={100}
          onChange={handleChange}
        />
        <label> Status </label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Not started"> Not Started </option>
          <option value="Started"> Started </option>
          <option value="Done"> Done </option>
        </select>
        <input
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          type="submit"
          value={!EDITMode ? "Create Ticket" : "Edit Ticket"}
        />
      </form>
    </div>
  );
};

export default TicketForm;
