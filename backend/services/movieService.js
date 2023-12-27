import Movie from "../models/Movie.js";

export const addMovie = async (movie) => {
  const newMovie = new Movie(movie);
  return await newMovie.save();
};
export const getMovies = async (filters, offset, limit) => {
  const movies = Movie.aggregate([
    { $match: filters },
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "movie",
        as: "reviews",
        pipeline: [
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: {
                    path: "$user",
                }
            }
        ]
      },
    },
    {
      $addFields: {
        avgRating: {$round: [{$avg: '$reviews.stars'}, 1]},
        totalReviews: {$size: '$reviews'}
      },
    },
    { $sort: { totalReviews: -1 } },
    { $skip: offset },
    { $limit: limit },
  ]);
  return await movies
};
export const getMovie = async (filters) => {
  return await Movie.findOne(filters).lean();
};
export const destroyMovie = async (id) => {
    return await Movie.findByIdAndDelete(id)
}
