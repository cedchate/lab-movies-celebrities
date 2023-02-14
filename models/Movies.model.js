const { Schema, model } = require('mongoose')
const moviesSchema= new Schema(
    {
        title: String,
        genre: String,
        plot: String,
        cast: [Schema.Types.ObjectId]
    }
)

const Movie= model('Movie', moviesSchema);

module.exports= Movie;