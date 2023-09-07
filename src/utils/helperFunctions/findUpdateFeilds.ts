import { UserData } from "../../types/types";

export default function findUpdatedFields(
  initialData: UserData,
  finalData: Partial<UserData>
): Partial<UserData> {
  const updatedFields: Partial<UserData> = {};

  if (finalData.firstName !== initialData.firstName) {
    updatedFields.firstName = finalData.firstName;
     updatedFields.lastName = finalData.lastName;
  }

  if (finalData.lastName !== initialData.lastName) {
    updatedFields.firstName = finalData.firstName;
    updatedFields.lastName = finalData.lastName;
  }

  if (finalData.email !== initialData.email) {
    updatedFields.email = finalData.email;
  }

  if (finalData.phoneNumber !== initialData.phoneNumber) {
    updatedFields.phoneNumber = finalData.phoneNumber;
  }

  if (finalData.address) {
    updatedFields.address = {
      ...updatedFields.address,
      addressLineOne: finalData.address.addressLineOne,
    };

    if (
      finalData.address.addressLineTwo !== initialData.address.addressLineTwo
    ) {
      updatedFields.address = {
        ...updatedFields.address,
        addressLineTwo: finalData.address.addressLineTwo,
      };
    }

    if (finalData.address.city !== initialData.address.city) {
      updatedFields.address = {
        ...updatedFields.address,
        city: finalData.address.city,
      };
    }

    if (finalData.address.district !== initialData.address.district) {
      updatedFields.address = {
        ...updatedFields.address,
        district: finalData.address.district,
      };
    }
  }

  return updatedFields;
}
