/**
 * The work of this component is to check wheather the data of the signed-in user is inside the neon db or not, if yes, then, do nothing
 * but if no, then, insert it in the neon db.
 */

'use client';

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";


const CheckUserInfoInDbProvider = ({ children }) => {

  const { user } = useUser();

  const doesSignedInUserDataExistInDB = async () => {

    try {

      const res = await axios.post('/api/check-user-in-db', {
        userInfo: user
      });

      console.log(res?.data);
      
    } catch (error) {
      
      console.log(error);
      
    }

  }

  useEffect(() => {

    // run the function only when the 'user' is available
    user && doesSignedInUserDataExistInDB();

  }, [user]);

  return (
    <>
      {children}
    </>
  )
}

export default CheckUserInfoInDbProvider
