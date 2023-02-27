import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { setDoc, serverTimestamp, doc } from "firebase/firestore/lite";
import { firestore } from "../../config/firebase";

const initialState = {
  title: "",
  date: "",
  time: "",
  creator: "",
  location: "",
  description: "",
};
export default function Hero() {
  const { user } = useContext(AuthContext);
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { title, location, description, date, time, creator } = state;
    title = title.trim();
    location = location.trim();
    description = description.trim();
    creator = creator.trim();
    if (title.length < 3) {
      return window.notify("Title length should be at least 3 chars", "error");
    }
    if (location.length < 3) {
      return window.notify("Please enter location", "error");
    }
    if (creator.length < 3) {
      return window.notify("Please enter Creator ", "error");
    }
    if (description.length < 10) {
      return window.notify("Please enter description", "error");
    }
    let formData = { title, location, description, date, time, creator };
    formData.dateCreated = serverTimestamp();
    formData.id = window.getRandomId();
    formData.status = "active";
    formData.createdBy = {
      email: user.email,
      uid: user.uid,
    };
    createDocument(formData);
  };
  const createDocument = async (formData) => {
    setIsProcessing(true);
    try {
      await setDoc(doc(firestore, "events", formData.id), formData);
      window.notify("Event has been successfully added", "success");
    } catch (err) {
      console.error(err);
      window.notify("Something went wrong, event isn't added", "error");
    }
    setIsProcessing(false);
  };

  return (
    <div className="py-5 home d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card p-3 p-md-4 p-lg-5">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col">
                    <h2 className="text-center mb-4">Add Event</h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="creator"
                      placeholder="Enter Creator Name"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      placeholder="Enter Title"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <input
                      type="time"
                      className="form-control"
                      name="time"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 mx-auto col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      placeholder="Enter Location"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <textarea
                      name="description"
                      rows="5"
                      className="form-control"
                      placeholder="Enter Description"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <button
                      className="btn btn-danger w-100"
                      disabled={isProcessing}
                    >
                      {!isProcessing ? (
                        "Add Event"
                      ) : (
                        <div className="spinner-border spinner-border-sm"></div>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
