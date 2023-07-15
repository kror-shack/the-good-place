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
    <div>
      <p>
        {value && (
          <span>
            Collection:{" "}
            <div>
              {value.map((item: any, index: number) => (
                <div key={index}>
                  <p>People: {item.people}</p>
                  <p>Request: {item.request || "No request"}</p>
                  <p>Time: {item.time || "No time selected"}</p>
                  <p>Email: {item.email}</p>
                  <p>Name: {item.name}</p>
                  <p>Number: {item.number || "No number provided"}</p>
                </div>
              ))}
            </div>
          </span>
        )}
      </p>
    </div>
  );
};

export default YourReservations;
