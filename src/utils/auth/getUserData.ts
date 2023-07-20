import { UserCredential } from "firebase/auth";

export function getUserData(user: UserCredential) {
  const displayName = user.user.displayName;
  const uid = user.user.uid;
  const email = user.user.email;
  const photoURL = user.user.photoURL;

  if (photoURL) {
    return {
      displayName: displayName,
      uid: uid,
      email: email,
      photoURL: photoURL,
    };
  } else {
    return {
      displayName: displayName,
      uid: uid,
      email: email,
    };
  }
}
