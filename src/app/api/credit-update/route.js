import { currentUser } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/index";
import { usersTable } from "@/db/schema";


export async function PATCH(req) {

  try {

    const user = await currentUser();

    if (!user) {

      return NextResponse.json(
        {
          success: false,
          error: "User is not authenticated.",
        },
        { status: 401 },
      );

    }

    const { creditsSelectedByUser } = await req.json();

    const userCreditUpdated = await db
      .update(usersTable)
      .set({
        totalCredits: sql`${usersTable.totalCredits} + ${Number(creditsSelectedByUser?.credits)}`,
      })
      .where(eq(usersTable.email, user?.emailAddresses[0]?.emailAddress))
      .returning(); // Returning the updated user record so we can use the latest credit balance.

    // Make sure a user record was actually updated.
    if (userCreditUpdated.length === 0) {

      return NextResponse.json(
        {
          success: false,
          error: "User record was not found.",
        },
        { status: 404 },
      );

    }


    return NextResponse.json(
      {
        success: true,
        message: "Your credits have been updated successfully.",
        userDataWithUpdatedCredits: userCreditUpdated[0],
      },
      { status: 200 },
    );

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong while updating your credits.",
      },
      { status: 500 },
    );

  }

}
