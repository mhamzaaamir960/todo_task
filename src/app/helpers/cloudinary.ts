import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImageOnCloudinary = async (imagePath: string) => {
  try {
    const response = await cloudinary.uploader.upload(imagePath, {
      resource_type: "auto",
    });
    console.log(`Image uploaded Successfully on cloudinary! ${response.url}`);
    return response;
  } catch (error: unknown) {
    console.error(`Error: ${error}`);
    return null;
  }
};
