import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/index";
import { usersTable } from "@/db/schema";


export async function POST(req) {

  try {

    const { userInfo } = await req.json();


    const doesUserInformationAlreadyExistInDB = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable?.email, userInfo?.emailAddresses[0]?.emailAddress));


    if (doesUserInformationAlreadyExistInDB?.length === 0) {

      /**
       * If the query returns an empty array, it means that
       * no user with this email address exists in the database.
       */

      const userDataSavedInDB = await db
        .insert(usersTable)
        .values({
          name: userInfo?.fullName,
          email: userInfo?.emailAddresses[0]?.emailAddress,
        })
        .returning({
          userDataInsertedInDB: usersTable,
        });

      // Return the data that was inserted into the database.
      return NextResponse.json({
          success: true,
          userInfoFromRoute: userDataSavedInDB,
        }, { status: 201 });
    }

    // If the data of a user is already present in the db, then return the 'userInfo' as it is
    return NextResponse.json({
        success: true,
        userInfoFromRoute: userInfo,
      }, { status: 200 });

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      success: false,
      message:
        error?.message || "Something went wrong. Please try again after sometime.",
    });

  }
  
}
