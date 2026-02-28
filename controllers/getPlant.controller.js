import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Admin } from "../models/admin.models.js"; 

export const getPlants = asyncHandler(async (req, res) => {
  const {
    search,
    category,
    page = 1,
    limit = 10,
    minPrice,
    maxPrice,
  } = req.query;

  let query = {};

  if (search) {
    query.$or = [
      { plantName: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
    ];
  }

  if (category) {
    query.category = { $regex: `^${category}$`, $options: "i" };
  }

  if (minPrice && maxPrice) {
    query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
  }

  const skip = (page - 1) * limit;

  const plants = await Admin.find(query).skip(skip).limit(Number(limit));

  const total = await Admin.countDocuments(query);

  if (!plants || plants.length === 0) {
    throw new ApiError(404, "No plants found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        data: plants,
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
      },
      "Plants fetched successfully"
    )
  );
});

export const getPlantById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const plant = await Admin.findById(id); 

  if (!plant) {
    throw new ApiError(404, "Plant not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, plant, "Plant fetched successfully"));
});