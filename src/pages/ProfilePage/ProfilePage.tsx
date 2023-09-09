import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Input,
  Card,
  CardContent,
  Box,
  Container,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { AddressData } from "../../types/types";
import { fetchUserAddress } from "../../utils/services/fetchUserAddress";
import { fetchUserPhoneNumber } from "../../utils/services/fetchUserPhoneNumber";
import { useUpdateEmail, useUpdateProfile } from "react-firebase-hooks/auth";
import "./ProfilePage.scss";
import app, { auth } from "../../firebase";

import "./ProfilePage.scss";
import getUserProfile from "../../utils/services/getUserProfile";
import { ClassNames } from "@emotion/react";
import findUpdatedFields from "../../utils/helperFunctions/findUpdateFeilds";
import updateUserProfile from "../../utils/services/updateUserProfile";
import {
  changeUserName,
  updateFirstName,
  updateLastName,
  updateUserEmail,
} from "../../features/userSlice";

type UserProfile = {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phoneNumber: number | string | null;
  address: AddressData;
};

const ProfilePage = () => {
  const user = useSelector((state: RootState) => state.rootReducer.user);
  const [updateProfile, updatingFrpmProfile, errorFromProfile] =
    useUpdateProfile(auth);
  const [updateEmail, updatingFromEmail, errorFromEmail] = useUpdateEmail(auth);
  const [isEditing, setIsEditing] = useState(false);
  const [initialUserData, setInitialUserData] = useState<UserProfile>();
  const dispatch: AppDispatch = useDispatch();
  const [formState, setFormState] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    email: user.email,
    phoneNumber: "",
    address: {
      addressLineOne: "",
      addressLineTwo: "",
      district: "",
      city: "",
    },
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  async function updateUserCredentials() {
    if (!initialUserData) return;
    const updatedFeilds = findUpdatedFields(initialUserData, formState);
    if (
      updatedFeilds.firstName ||
      updatedFeilds.lastName ||
      updatedFeilds.email
    ) {
      if (
        updatedFeilds.firstName &&
        updatedFeilds.lastName &&
        updatedFeilds.email
      ) {
        const displayName =
          updatedFeilds.firstName + " " + updatedFeilds.lastName;
        await Promise.all([
          updateProfile({ displayName }),
          updateEmail(updatedFeilds.email),
        ]);
        dispatch(changeUserName(displayName));
        dispatch(updateUserEmail(updatedFeilds.email));
      } else if (updatedFeilds.email) {
        updateEmail(updatedFeilds.email);
        dispatch(updateUserEmail(updatedFeilds.email));
      } else if (updatedFeilds.firstName && updatedFeilds.lastName) {
        const displayName =
          updatedFeilds.firstName + " " + updatedFeilds.lastName;
        updateProfile({ displayName });
        dispatch(changeUserName(displayName));
      }
    }
  }

  const handleSaveClick = async () => {
    setIsEditing(false);
    if (!initialUserData) return;
    const updatedFeilds = findUpdatedFields(initialUserData, formState);
    await Promise.all([
      updateUserCredentials(),
      updateUserProfile(updatedFeilds, user.uid),
    ]);
  };

  async function getInitalUserData() {
    const userData = await getUserProfile(user.displayName, user.uid);
    if (userData) setInitialUserData(userData);
  }

  useEffect(() => {
    getInitalUserData();
  }, []);

  useEffect(() => {
    if (!initialUserData) return;

    setFormState((prevState) => ({
      ...prevState,
      ...initialUserData,
    }));
  }, [initialUserData]);

  return (
    <Container component="main" maxWidth="sm" className="Profile-page">
      <Typography variant="h4">Profile</Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            className="input"
            name="firstName"
            value={formState.firstName}
            onChange={(e) =>
              setFormState({ ...formState, firstName: e.target.value })
            }
            InputProps={{ readOnly: isEditing ? false : true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            className="input"
            name="lastName"
            value={formState.lastName}
            onChange={(e) =>
              setFormState({ ...formState, lastName: e.target.value })
            }
            InputProps={{ readOnly: isEditing ? false : true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            className="input"
            name="email"
            value={formState.email}
            onChange={(e) =>
              setFormState({ ...formState, email: e.target.value })
            }
            InputProps={{ readOnly: isEditing ? false : true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone Number"
            className="input"
            name="phoneNumber"
            value={formState.phoneNumber}
            onChange={(e) =>
              setFormState({ ...formState, phoneNumber: e.target.value })
            }
            InputProps={{ readOnly: isEditing ? false : true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Address Line 1"
            className="address"
            name="addressLineOne"
            value={formState.address.addressLineOne}
            onChange={(e) =>
              setFormState({
                ...formState,
                address: {
                  ...formState.address,
                  addressLineOne: e.target.value,
                },
              })
            }
            InputProps={{ readOnly: isEditing ? false : true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Address Line 2"
            className="address"
            name="addressLineTwo"
            value={formState.address.addressLineTwo}
            onChange={(e) =>
              setFormState({
                ...formState,
                address: {
                  ...formState.address,
                  addressLineTwo: e.target.value,
                },
              })
            }
            InputProps={{ readOnly: isEditing ? false : true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="City"
            className="address"
            name="city"
            value={formState.address.city}
            onChange={(e) =>
              setFormState({
                ...formState,
                address: { ...formState.address, city: e.target.value },
              })
            }
            InputProps={{ readOnly: isEditing ? false : true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="District"
            className="address"
            name="district"
            value={formState.address.district}
            onChange={(e) =>
              setFormState({
                ...formState,
                address: { ...formState.address, district: e.target.value },
              })
            }
            InputProps={{ readOnly: isEditing ? false : true }}
          />
        </Grid>
      </Grid>
      {isEditing ? (
        <Button variant="contained" color="primary" onClick={handleSaveClick}>
          Save
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={handleEditClick}>
          Edit
        </Button>
      )}
    </Container>
  );
};

export default ProfilePage;
