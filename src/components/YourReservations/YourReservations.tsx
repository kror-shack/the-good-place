import {
  collection,
  Firestore,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import app from "../../firebase";
import { RootState } from "../../store/store";
import { useCollection } from "react-firebase-hooks/firestore";
import "./YourReservations.scss";

type ReservationData = {
  name: string;
  time: string;
  people: number;
  request: number;
  email: string;
  number: number;
};

const YourReservations = () => {
  const user = useSelector((state: RootState) => state.rootReducer.user);
  const [value, setValue] = useState<any>();

  const firestore = getFirestore(app);

  async function getYourReservations() {
    if (user.isAdmin) {
      const reservationsRef = await collection(firestore, "reservations");
      const reservationList: Partial<ReservationData>[] = [];
      getDocs(reservationsRef)
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            console.log(doc.data());
            reservationList.push({ ...doc.data() });
          });
          console.log(reservationList);
          setValue(reservationList);
          console.log(value);
        })

        .catch((err) => {
          console.log(err);
        });
    } else {
      const reservationsRef = await collection(firestore, "reservations");
      const q = query(reservationsRef, where("uid", "==", user.uid));
      const reservationList: Partial<ReservationData>[] = [];
      getDocs(q)
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            console.log(doc.data());
            reservationList.push({ ...doc.data() });
          });
          console.log(reservationList);
          setValue(reservationList);
          console.log(value);
        })

        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    getYourReservations();
  }, []);
  return (
    <main className="Your-reservations">
      <div>
        <h2>Reservations</h2>
        {value ? (
          <table>
            <thead>
              <tr>
                <th>No. of Guests</th>
                <th>Time</th>
                <th>Date</th>
                <th>Request</th>
              </tr>
            </thead>
            <tbody>
              {value.map((item: any, index: number) => (
                <tr className="reservation" key={index}>
                  <td>{item.people}</td>
                  <td>{item.time}</td>
                  <td>{item.date}</td>
                  <td>{item.request || "none"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    </main>
  );
};

export default YourReservations;
