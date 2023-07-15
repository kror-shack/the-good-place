import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "./BookTable.scss";
import "firebase/firestore";
import { addDoc, Firestore } from "firebase/firestore";
import { getFirestore, collection } from "firebase/firestore";
import app from "../../firebase";
import { useNavigate } from "react-router-dom";

const BookTable = () => {
  const user = useSelector((state: RootState) => state.rootReducer.user);
  const navigate = useNavigate();

  const [people, setPeople] = useState<number>(1);
  const [time, setTime] = useState<string>("");
  const [optionalNumber, setOptionalNumber] = useState<number | null>(null);
  const [specialRequest, setSpecialRequest] = useState<string | null>(null);

  const handlePeopleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPeople = parseInt(event.target.value, 10);
    setPeople(selectedPeople);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTime = event.target.value;
    setTime(selectedTime);
  };

  const handleOptionalNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedOptionalNumber = parseInt(event.target.value, 10);
    setOptionalNumber(selectedOptionalNumber);
  };

  const handleSpecialRequestChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const selectedSpecialRequest = event.target.value;
    setSpecialRequest(selectedSpecialRequest);
  };

  const firestore = getFirestore(app);
  const addReservation = async () => {
    const reservationsRef = await collection(firestore, "reservations");
    const doc = {
      email: user.email,
      name: user.displayName,
      time: time,
      people: people,
      uid: user.uid,
      number: optionalNumber,
      request: specialRequest,
    };
    try {
      await addDoc(reservationsRef, doc);
      console.log("added");
      navigate("/");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addReservation();
  }

  return (
    <div className="book-table">
      {!user.displayName && <p>Please sign in to continue</p>}

      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="people">People:</label>
        <select id="people" value={people} onChange={handlePeopleChange}>
          {Array.from({ length: 10 }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        <button>Reserve</button>

        <fieldset>
          <legend>Time:</legend>
          <label>
            <input
              type="radio"
              value="5:30 PM"
              checked={time === "5:30 PM"}
              onChange={handleTimeChange}
            />
            5:30 PM
          </label>
          <label>
            <input
              type="radio"
              value="6:30 PM"
              checked={time === "6:30 PM"}
              onChange={handleTimeChange}
            />
            6:30 PM
          </label>
          <label>
            <input
              type="radio"
              value="7:30 PM"
              checked={time === "7:30 PM"}
              onChange={handleTimeChange}
            />
            7:30 PM
          </label>
          <label>
            <input
              type="radio"
              value="8:30 PM"
              checked={time === "8:30 PM"}
              onChange={handleTimeChange}
            />
            8:30 PM
          </label>
          <label>
            <input
              type="radio"
              value="9:30 PM"
              checked={time === "9:30 PM"}
              onChange={handleTimeChange}
            />
            9:30 PM
          </label>
        </fieldset>

        <label htmlFor="optionalNumber">Optional Number:</label>
        <input
          type="number"
          id="optionalNumber"
          value={optionalNumber || ""}
          onChange={handleOptionalNumberChange}
        />

        <label htmlFor="specialRequest">Special Request:</label>
        <textarea
          id="specialRequest"
          value={specialRequest || ""}
          onChange={handleSpecialRequestChange}
        />
      </form>
    </div>
  );
};

export default BookTable;
