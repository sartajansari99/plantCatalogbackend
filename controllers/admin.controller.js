import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Admin } from "../models/admin.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const PostAdmin = asyncHandler(async (req, res) => {
  const { plantName, price, category, stock } = req.body;
  if (typeof req.body.category === "String") {
    req.body.category = req.body.category.split(",").map((cat) => cat.trim());
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = coverImageLocalPath
    ? await uploadOnCloudinary(coverImageLocalPath)
    : null;

  if (!avatar?.url) {
    throw new ApiError(500, "Failed to upload avatar");
  }

  const plant = await Admin.create({
    plantName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    price,
    category,
    stock,
  });

  const createdPlant = await Admin.findById(plant._id);

  if (!createdPlant) {
    throw new ApiError(500, "Something went wrong while registering the plant");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdPlant, "Plant registered successfully"));
});

export { PostAdmin };
