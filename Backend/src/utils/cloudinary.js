import cloudinary from "cloudinary";
import "dotenv/config"
import fs from "fs";


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET

});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return console.log("no local file path found || cloudinary util ")
        }
        const response = await cloudinary.v2.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        return response


    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log("internal server error cloudinary util", error)

    }
}

export { uploadOnCloudinary }