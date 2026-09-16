/**
 * The work of this component is to check whether the data of the
 * signed-in user exists inside the Neon DB or not.
 *
 * If it exists, we do nothing.
 * If it does not exist, we insert the user's data into the Neon DB.
 */

"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

import { UserDetailsContext } from "./_context/userDetailsContext";


const CheckUserInfoInDbProvider = ({ children }) => {

  const { user } = useUser();

  /**
   * We are storing the user's details from the database in the
   * global context because we need to display the user's total
   * available credits throughout the application.
   *
   * The total credits are retrieved from the database, so keeping
   * the user's details in the global context allows different
   * components (e.g. Header.jsx) to easily access and display the credit information.
   */


  const [userDetailsGlobalContext, setUserDetailsGlobalContext] = useState();


  useEffect(() => {

    // Run the function only when the Clerk user is available.
    if (!user) return;

    const checkUser = async () => {

      try {

        const { data } = await axios.post("/api/check-user-in-db", {
          userInfo: user,
        });

        if (data?.success) {

          setUserDetailsGlobalContext(data?.userInfoFromRoute);

        }

      } catch (error) {

        console.log(error);

      }

    };

    checkUser();

  }, [user]);

  return (
    <UserDetailsContext.Provider value={{ userDetailsGlobalContext, setUserDetailsGlobalContext }}>
      {children}
    </UserDetailsContext.Provider>
  );
};

export default CheckUserInfoInDbProvider;