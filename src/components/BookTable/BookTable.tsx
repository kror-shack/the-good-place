import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "./BookTable.scss";
import "firebase/firestore";
import { addDoc, Firestore } from "firebase/firestore";
import { getFirestore, collection } from "firebase/firestore";
import app from "../../firebase";
import { Link, useNavigate } from "react-router-dom";

const BookTable = () => {
  const user = useSelector((state: RootState) => state.rootReducer.user);
  const navigate = useNavigate();

  const [people, setPeople] = useState<number>(1);
  const [time, setTime] = useState<string>("");
  const [optionalNumber, setOptionalNumber] = useState<number | null>(null);
  const [specialRequest, setSpecialRequest] = useState<string | null>(null);
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handlePeopleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedPeople = parseInt(event.target.value, 10);
    if (selectedPeople < 1 || !selectedPeople) setPeople(1);
    else if (selectedPeople > 15) setPeople(15);
    else setPeople(selectedPeople);
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

  const handleDateChange = (e: string) => {
    setSelectedDate(e);
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
    <main className="Book-table">
      <div>
        <img src={require(`../../assets/images/Group 16(1).png`)} alt=""></img>
      </div>
      <div className="content-container">
        <h2>Book A Table</h2>

        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="people">
            People
            <input
              type="number"
              id="people"
              name="people"
              step="1"
              min="1"
              max="15"
              value={people}
              onChange={(e) => handlePeopleChange(e)}
            />
          </label>
          <label htmlFor="date">
            Select a date
            <input
              type="date"
              id="date"
              name="date"
              value={selectedDate}
              min={today}
              onChange={(e) => handleDateChange(e.target.value)}
            />
          </label>
          <fieldset>
            <legend>Time</legend>

            <div>
              <input
                id="first-time"
                type="radio"
                value="5:30 PM"
                checked={time === "5:30 PM"}
                onChange={(e) => handleTimeChange(e)}
              />
              <label htmlFor="first-time">5:30 PM</label>
            </div>
            <div>
              <input
                id="second-time"
                type="radio"
                value="6:30 PM"
                checked={time === "6:30 PM"}
                onChange={handleTimeChange}
              />
              <label htmlFor="second-time">6:30 PM</label>
            </div>
            <div>
              <input
                id="third-time"
                type="radio"
                value="7:30 PM"
                checked={time === "7:30 PM"}
                onChange={handleTimeChange}
              />
              <label htmlFor="third-time">7:30 PM</label>
            </div>
            <div>
              <input
                id="fourth-time"
                type="radio"
                value="8:30 PM"
                checked={time === "8:30 PM"}
                onChange={handleTimeChange}
              />
              <label htmlFor="fourth-time">8:30 PM</label>
            </div>
            <div>
              <input
                id="fifth-time"
                type="radio"
                value="9:30 PM"
                checked={time === "9:30 PM"}
                onChange={handleTimeChange}
              />
              <label htmlFor="fifth-time">9:30 PM</label>
            </div>
          </fieldset>
          <label htmlFor="optionalNumber">
            Phone Number:
            <input
              type="number"
              id="optionalNumber"
              value={optionalNumber || ""}
              placeholder="Optional"
              onChange={handleOptionalNumberChange}
            />
          </label>
          <label htmlFor="specialRequest">
            Special Request:
            <textarea
              id="specialRequest"
              value={specialRequest || ""}
              onChange={handleSpecialRequestChange}
              placeholder="Optional"
            />
          </label>
          <div className="button-container">
            {!user.displayName && (
              <div className="login-warning">
                <p>Please sign in to continue!</p>{" "}
                <Link to="/signIn">Login</Link>
              </div>
            )}
            <button disabled={!user.email} type="submit">
              Reserve
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default BookTable;
