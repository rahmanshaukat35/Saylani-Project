import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore/lite";
import { firestore } from "../../../config/firebase";
import EventCard from "../components/Event-Card/EventCard";
import { motion } from "framer-motion";
import "../../../scss/events.scss";

export default function Events() {
  const { user } = useContext(AuthContext);

  const [documents, setDocuments] = useState([]);
  const [event, setEvent] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchDocuments = async () => {
    let array = [];

    const querySnapshot = await getDocs(collection(firestore, "events"));
    querySnapshot.forEach((doc) => {
      let data = doc.data();

      array.push(data);
    });
    setDocuments(array);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const joinIn = async () => {
    let formData = {
      event,
      user: JSON.parse(JSON.stringify(user)),
      dateCreated: serverTimestamp(),
      id: window.getRandomId(),
    };
    try {
      await setDoc(doc(firestore, "Joined", formData.id), formData, {
        merge: true,
      });
      window.notify("Successfully Join In", "success");
    } catch (err) {
      console.error(err);
      window.notify("Something went wrong", "error");
    }
  };
  return (
    <>
      <div className="  py-5 home d-flex justify-content-center align-items-center bg-info text-light">
        <div className="container">
          <div className="row">
            <div className="col">
              <h2 className="text-center mb-4 fs-1 fw-bold">Events</h2>
            </div>
          </div>
          {!isLoading ? (
            <div>
              {documents.map((events) => {
                return (
                  <>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="card-container"
                    >
                      <div
                        className="card mt-3 events"
                        onClick={() => {
                          setEvent(events);
                        }}
                      >
                        <div
                          className="card-body text-dark"
                          data-bs-toggle="modal"
                          data-bs-target="#editModal"
                        >
                          <h2>{events.title}</h2>
                          <p>Creator: {events.creator}</p>
                          <p>Location:{events.location}</p>
                          <p>Date: {events.date}</p>
                          <p>Time: {events.time}</p>
                        </div>
                      </div>
                    </motion.div>
                  </>
                );
              })}
            </div>
          ) : (
            <div className="text-center">
              <div className="spinner-grow"></div>
            </div>
          )}
        </div>
      </div>
      <div className="modal fade" id="editModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Update Todo</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-12 col-md-6 mb-3">
                  <EventCard
                    title={event.title}
                    creator={event.creator}
                    date={event.date}
                    time={event.time}
                    location={event.location}
                    description={event.description}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={() => joinIn()}
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
