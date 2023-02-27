import React from "react";
import "../../../../scss/eventcard.scss";

function EventCard(props) {
  return (
    <div className="event-card-container">
      <div className="event-card-component mt-3">
        <div
          className="card-body"
          data-bs-toggle="modal"
          data-bs-target="#editModal"
        >
          <h2>{props.title}</h2>
          <p>Creator: {props.creator}</p>
          <p>Location:{props.location}</p>
          <p>Date: {props.date}</p>
          <p>Time: {props.time}</p>
          <p>Description:{props.description}</p>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
