import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { eq } from "drizzle-orm";

import { supabase } from "@/lib/supabase/server";
import { db } from "@/index";
import { aiGeneratedImageData } from "@/db/schema";


const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});


export async function POST(req) {

  try {

    const user = await currentUser();


    const { allInputOfUser } = await req.json();

    const { roomImageInputURL, roomTypeInput, designTypeInput, additionalRequirementsInput } = allInputOfUser;


    // Create the input that will be sent to the Replicate model.
    const input = {
      image: roomImageInputURL,
      prompt: `A ${roomTypeInput} with a ${designTypeInput} style interior ${additionalRequirementsInput}`,
    };

    // Run the Replicate model.
    // The returned value is a Replicate FileOutput object.
    const imageOutputByAI = await replicate.run(
      "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      { input },
    );

    // Convert the Replicate FileOutput into a Blob.
    const generatedImageBlob = await imageOutputByAI.blob();

    // Create a unique file name for the generated image.
    const generatedUniqueFileName = `${crypto.randomUUID()}.png`;

    // Create the path where the generated image will be stored.
    const generatedImageFilePath = `generated-room-images/${generatedUniqueFileName}`;

    /**
     * Upload the generated image directly to the Supabase
     * Storage bucket from the server.
     */
    const { data, error } = await supabase.storage
      .from("myimages")
      .upload(generatedImageFilePath, generatedImageBlob, {
        contentType: "image/png",
        upsert: false,
      });

    if (error) {

      console.error("Supabase upload error:", error);

      throw new Error("Failed to save generated room image.");

    }

    /**
     * Get the public URL of the image that was successfully
     * stored in Supabase Storage.
     */
    const { data: publicUrlData } = supabase.storage
      .from("myimages")
      .getPublicUrl(data.path);

    const generatedImageUrl = publicUrlData.publicUrl;

    // store the result in neon database
    const storeResultInDB = await db
      .insert(aiGeneratedImageData)
      .values({
        roomType: roomTypeInput,
        designType: designTypeInput,
        originalImageUrl: roomImageInputURL,
        generatedAiImageUrl: generatedImageUrl,
        emailIdOfTheUserWhoHasGeneratedTheAIImage: user?.emailAddresses[0]?.emailAddress,
      })
      .returning({
        // returning the ID of the inserted record
        id: aiGeneratedImageData?.id,
      });

    return NextResponse.json({
      success: true,
      data: {
        inputImgUrl: roomImageInputURL,
        generatedAiImageUrl: generatedImageUrl,
      },
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      success: false,
      error:
        error?.message || "Something went wrong while generating the image",
    });

  }

}

/**
 * Why do we convert the Replicate FileOutput into a Blob and
 * upload it to Supabase when Replicate already gives us a URL?
 *
 * The URL provided by Replicate is temporary and automatically
 * expires after a certain amount of time. Therefore, we should
 * not depend on that URL for permanently accessing the generated
 * image.
 *
 * Instead, we convert the Replicate FileOutput into a Blob and
 * upload the image to our own Supabase Storage bucket.
 *
 * This gives us a permanent storage location that we control,
 * allowing our application to continue accessing the generated
 * image even after the temporary Replicate URL expires.
 */

/**
 * EXPLANATION OF THE ABOVE CODE
 *
 * ============================================================
 * STEP 1: Get the data sent by the frontend
 * ============================================================
 *
 * The frontend sends data to this API route using a POST request.
 *
 * For example, imagine the frontend sends this JSON:
 *
 * {
 *   "allInputOfUser": {
 *     "roomImageInputURL": "https://example.com/my-room.jpg",
 *     "roomTypeInput": "bedroom",
 *     "designTypeInput": "modern",
 *     "additionalRequirementsInput": "with warm lighting"
 *   }
 * }
 *
 * req.json() reads the JSON body of the incoming request.
 *
 * Because reading the request body is asynchronous, we use
 * 'await'.
 *
 * So:
 *
 *     await req.json()
 *
 * gives us the complete JavaScript object:
 *
 * {
 *   allInputOfUser: {
 *     roomImageInputURL: "https://example.com/my-room.jpg",
 *     roomTypeInput: "bedroom",
 *     designTypeInput: "modern",
 *     additionalRequirementsInput: "with warm lighting"
 *   }
 * }
 *
 *
 * Then we use destructuring:
 *
 *     const { allInputOfUser } = await req.json();
 *
 * This means:
 *
 * "Take the 'allInputOfUser' property from the object and
 * store its value inside a variable called 'allInputOfUser'."
 *
 * After this line:
 *
 *     allInputOfUser
 *
 * contains:
 *
 * {
 *   roomImageInputURL: "https://example.com/my-room.jpg",
 *   roomTypeInput: "bedroom",
 *   designTypeInput: "modern",
 *   additionalRequirementsInput: "with warm lighting"
 * }
 */

/**
 * ============================================================
 * STEP 2: Get the individual values from allInputOfUser
 * ============================================================
 *
 * Now that we have the 'allInputOfUser' object, we need to
 * extract the four values from it.
 *
 * We again use object destructuring:
 *
 *     const {
 *       roomImageInputURL,
 *       roomTypeInput,
 *       designTypeInput,
 *       additionalRequirementsInput
 *     } = allInputOfUser;
 *
 * This is basically a shorter way of writing:
 *
 *     const roomImageInputURL = allInputOfUser.roomImageInputURL;
 *     const roomTypeInput = allInputOfUser.roomTypeInput;
 *     const designTypeInput = allInputOfUser.designTypeInput;
 *     const additionalRequirementsInput =
 *       allInputOfUser.additionalRequirementsInput;
 *
 *
 * Using our example, the variables now contain:
 *
 * roomImageInputURL
 *     ↓
 * "https://example.com/my-room.jpg"
 *
 * roomTypeInput
 *     ↓
 * "bedroom"
 *
 * designTypeInput
 *     ↓
 * "modern"
 *
 * additionalRequirementsInput
 *     ↓
 * "with warm lighting"
 *
 *
 * So we have now taken the data sent by the frontend and
 * separated it into individual variables that are easier
 * to use.
 */

/**
 * ============================================================
 * STEP 3: Create the input for the Replicate model
 * ============================================================
 *
 * Now we need to prepare the data that we will send to the
 * Replicate AI model.
 *
 * We create an object called 'input':
 *
 *     const input = {
 *       image: roomImageInputURL,
 *       prompt: `A ${roomTypeInput} with a ${designTypeInput}
 *                style interior ${additionalRequirementsInput}`,
 *     };
 *
 *
 * The 'image' property receives:
 *
 *     roomImageInputURL
 *
 * So in our example:
 *
 *     image:
 *       "https://example.com/my-room.jpg"
 *
 *
 * The 'prompt' property uses a JavaScript template literal.
 *
 * We have:
 *
 *     `A ${roomTypeInput} with a ${designTypeInput}
 *      style interior ${additionalRequirementsInput}`
 *
 *
 * JavaScript replaces the ${...} parts with the values stored
 * inside those variables.
 *
 * Our values are:
 *
 * roomTypeInput = "bedroom"
 * designTypeInput = "modern"
 * additionalRequirementsInput = "with warm lighting"
 *
 *
 * Therefore the final prompt becomes:
 *
 *     "A bedroom with a modern style interior with warm lighting"
 *
 *
 * So the complete 'input' object becomes:
 *
 * {
 *   image: "https://example.com/my-room.jpg",
 *   prompt: "A bedroom with a modern style interior with warm lighting"
 * }
 *
 *
 * This is the object that we will give to the Replicate model.
 */

/**
 * ============================================================
 * STEP 4: Run the Replicate AI model
 * ============================================================
 *
 * Now we send our 'input' object to the Replicate model:
 *
 *     const imageOutputByAI = await replicate.run(
 *       "adirik/interior-design:...",
 *       { input }
 *     );
 *
 *
 * The second argument:
 *
 *     { input }
 *
 * is shorthand for:
 *
 *     { input: input }
 *
 *
 * In other words, we are giving Replicate an object like:
 *
 * {
 *   input: {
 *     image: "https://example.com/my-room.jpg",
 *     prompt: "A bedroom with a modern style interior with warm lighting"
 *   }
 * }
 *
 *
 * 'replicate.run()' starts the AI model and waits for the
 * model to finish generating the image.
 *
 * We use 'await' because generating an image takes time.
 *
 * Once the model finishes, Replicate gives us its output.
 *
 * In your case, the output is a Replicate 'FileOutput' object.
 *
 * So:
 *
 *     imageOutputByAI
 *
 * contains the generated image as a Replicate FileOutput.
 *
 *
 * IMPORTANT:
 *
 * At this point, we have NOT converted the output into a
 * normal URL string.
 *
 * We still have the original Replicate FileOutput object.
 *
 * This is important because the FileOutput object provides
 * methods such as '.blob()' and '.url()'.
 */

/**
 * ============================================================
 * STEP 5: Convert the Replicate FileOutput into a Blob
 * ============================================================
 *
 * We now want to upload the generated image to Supabase
 * Storage.
 *
 * For that, we convert the Replicate FileOutput into a Blob:
 *
 *     const generatedImageBlob =
 *       await imageOutputByAI.blob();
 *
 *
 * Think of a Blob as:
 *
 * "The actual binary data of the image."
 *
 * For an image, this means the actual bytes that make up * the image,
 * rather than its name or URL.
 *
 * Think of it this way:
 * URL → The address where the image can be found.
 * Blob → The actual image data received from that address.
 *
 * Computers ultimately store files as binary data, which is made up of bytes (groups of 0s and 1s).
 * Therefore, when we convert an image response into a Blob, we get the actual image data
 * that JavaScript can work with.
 *
 * We can think of the process like this:
 *
 *     imageOutputByAI
 *            ↓
 *     Replicate FileOutput
 *            ↓
 *          .blob()
 *            ↓
 *     generatedImageBlob
 *            ↓
 *       actual image data
 *
 *
 * Why do we do this?
 *
 * Because we want to give the actual image data to Supabase
 * Storage so that Supabase can save it as a file.
 *
 *
 * IMPORTANT:
 *
 * We call '.blob()' on 'imageOutputByAI':
 *
 *     imageOutputByAI.blob()
 *
 * NOT on a URL string.
 *
 * This distinction is important because a URL string does
 * not have a '.blob()' method.
 */

/**
 * ============================================================
 * STEP 6: Create a unique file name
 * ============================================================
 *
 * Before uploading the image to Supabase Storage, we need
 * a file name.
 *
 * We use:
 *
 *     const generatedUniqueFileName =
 *       `${crypto.randomUUID()}.png`;
 *
 *
 * 'crypto.randomUUID()' generates a unique ID.
 *
 * For example, it could generate:
 *
 *     "550e8400-e29b-41d4-a716-446655440000"
 *
 *
 * Then we add '.png':
 *
 *     "550e8400-e29b-41d4-a716-446655440000.png"
 *
 *
 * Why use a random unique name?
 *
 * Imagine 100 users generate images.
 *
 * If every image was simply called:
 *
 *     generated-image.png
 *
 * then different uploads could have the same file name.
 *
 * A UUID gives each generated image a practically unique
 * file name.
 */

/**
 * ============================================================
 * STEP 7: Create the Storage path
 * ============================================================
 *
 * Now we create the location where the image will be stored
 * inside the Supabase Storage bucket.
 *
 *     const generatedImageFilePath =
 *       `generated-room-images/${generatedUniqueFileName}`;
 *
 *
 * Suppose the UUID generated earlier was:
 *
 *     550e8400-e29b-41d4-a716-446655440000.png
 *
 * Then:
 *
 *     generatedImageFilePath
 *
 * becomes:
 *
 *     "generated-room-images/550e8400-e29b-41d4-a716-446655440000.png"
 *
 *
 * Think of 'generated-room-images' as a folder inside your
 * Supabase Storage bucket.
 *
 *
 * Your bucket structure can therefore look like:
 *
 * myimages
 * └── generated-room-images
 *     ├── image-1.png
 *     ├── image-2.png
 *     └── image-3.png
 */

/**
 * ============================================================
 * STEP 8: Upload the image to Supabase Storage
 * ============================================================
 *
 * Now we finally upload the generated image.
 *
 *     const { data, error } = await supabase.storage
 *       .from("myimages")
 *       .upload(
 *         generatedImageFilePath,
 *         generatedImageBlob,
 *         {
 *           contentType: "image/png",
 *           upsert: false,
 *         }
 *       );
 *
 *
 * Let's understand each part.
 *
 *
 * ------------------------------------------------------------
 * .from("myimages")
 * ------------------------------------------------------------
 *
 * This tells Supabase:
 *
 * "Use the Storage bucket called 'myimages'."
 *
 *
 * ------------------------------------------------------------
 * .upload(...)
 * ------------------------------------------------------------
 *
 * This tells Supabase:
 *
 * "Upload a file into this bucket."
 *
 *
 * ------------------------------------------------------------
 * First argument: generatedImageFilePath
 * ------------------------------------------------------------
 *
 * This tells Supabase WHERE to store the file.
 *
 * For example:
 *
 *     "generated-room-images/550e8400-e29b-41d4-a716-446655440000.png"
 *
 *
 * ------------------------------------------------------------
 * Second argument: generatedImageBlob
 * ------------------------------------------------------------
 *
 * This is the actual generated image data that we obtained
 * from Replicate in STEP 5.
 *
 *
 * ------------------------------------------------------------
 * contentType: "image/png"
 * ------------------------------------------------------------
 *
 * This tells Supabase that the uploaded file is a PNG image.
 *
 *
 * ------------------------------------------------------------
 * upsert: false
 * ------------------------------------------------------------
 *
 * 'upsert' controls what happens if a file with the same
 * path already exists.
 *
 * false means:
 *
 * "Do not replace an existing file."
 *
 * Since we are using a UUID for every file name, collisions
 * are extremely unlikely anyway.
 */

/**
 * ============================================================
 * STEP 9: Check whether the Supabase upload failed
 * ============================================================
 *
 * Supabase gives us two important values:
 *
 *     data
 *     error
 *
 * If the upload succeeds, 'data' contains information about
 * the uploaded file.
 *
 * If something goes wrong, 'error' contains information about
 * the problem.
 *
 *
 * So we check:
 *
 *     if (error) {
 *       ...
 *     }
 *
 *
 * If an error exists, we:
 *
 * 1. Print the actual Supabase error in the server console.
 * 2. Throw our own simpler error.
 *
 *
 *     console.error("Supabase upload error:", error);
 *
 * helps us while debugging.
 *
 *
 * Then:
 *
 *     throw new Error("Failed to save generated room image.");
 *
 * stops the normal execution of the try block and moves
 * execution into the 'catch' block.
 */

/**
 * ============================================================
 * STEP 10: Get the public URL of the uploaded image
 * ============================================================
 *
 * The image is now stored in Supabase Storage.
 *
 * However, our application needs a URL that can be used to
 * access that image.
 *
 * We therefore use:
 *
 *     supabase.storage
 *       .from("myimages")
 *       .getPublicUrl(data.path);
 *
 *
 * 'data.path' came from the successful upload.
 *
 * For example:
 *
 *     data.path
 *
 * could be:
 *
 *     "generated-room-images/550e8400-e29b-41d4-a716-446655440000.png"
 *
 *
 * Supabase then gives us information containing the public
 * URL of that stored image.
 *
 *
 * We use destructuring again:
 *
 *     const { data: publicUrlData } = ...
 *
 *
 * Notice that:
 *
 *     data: publicUrlData
 *
 * means:
 *
 * "Take the property called 'data' and store it in a variable
 * called 'publicUrlData'."
 *
 *
 * We then get:
 *
 *     publicUrlData.publicUrl
 *
 * which gives us the actual URL.
 *
 *
 * So:
 *
 *     const generatedImageUrl =
 *       publicUrlData.publicUrl;
 *
 *
 * Now 'generatedImageUrl' might look conceptually like:
 *
 *     "https://your-project.supabase.co/storage/v1/object/public/myimages/generated-room-images/550e8400-e29b-41d4-a716-446655440000.png"
 *
 *
 * This is the URL of the image stored in YOUR Supabase Storage,
 * rather than the temporary Replicate output URL.
 */

/**
 * ============================================================
 * STEP 11: Send the Supabase URL back to the frontend
 * ============================================================
 *
 * Finally, we send a JSON response back to the frontend:
 *
 *     return NextResponse.json({
 *       success: true,
 *       generatedImageUrl,
 *     });
 *
 *
 * The frontend receives something like:
 *
 * {
 *   success: true,
 *   generatedImageUrl:
 *     "https://your-project.supabase.co/..."
 * }
 *
 *
 * The frontend can then use 'generatedImageUrl' to display
 * the generated room image.
 *
 *
 * ============================================================
 * COMPLETE FLOW
 * ============================================================
 *
 * User submits room information
 *             ↓
 * Frontend sends POST request
 *             ↓
 * req.json()
 *             ↓
 * allInputOfUser
 *             ↓
 * Extract individual values
 *             ↓
 * Create Replicate 'input' object
 *             ↓
 * replicate.run()
 *             ↓
 * Replicate generates the room image
 *             ↓
 * FileOutput object
 *             ↓
 * .blob()
 *             ↓
 * Image Blob
 *             ↓
 * Upload Blob to Supabase Storage
 *             ↓
 * Supabase stores the PNG
 *             ↓
 * getPublicUrl()
 *             ↓
 * Supabase public image URL
 *             ↓
 * Send URL back to frontend
 */

export async function GET(req) {

  try {

    const user = await currentUser();

    const allDesignsOfTheCurrentlyAuthenticatedUser = await db
      .select()
      .from(aiGeneratedImageData)
      .where(
        eq(
          aiGeneratedImageData.emailIdOfTheUserWhoHasGeneratedTheAIImage,
          user?.emailAddresses[0]?.emailAddress,
        ),
      );

    return NextResponse.json({
      success: true,
      data: allDesignsOfTheCurrentlyAuthenticatedUser
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      success: false,
      error:
        error?.message || "Something went wrong while generating the image",
    });

  }

}
