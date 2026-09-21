import { auth } from "@clerk/nextjs/server"

import HouseDesignsAIOfUser from "./_components/HouseDesignsAIOfUser"


const Page = async () => {

  // Redirect unauthenticated users to the Clerk sign-in page.
  await auth.protect();

  return (
    <div>
      
      <HouseDesignsAIOfUser />
      
    </div>
  )
}

export default Page
