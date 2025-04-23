import RatingBar from "../RatingBar";


const RatingSummary = ({
    totalRatings,
    averageRating,
    ratings,
}) => {
    return (
        <div className="flex flex-col">
            <h2 className="text-lg sm:text-xl font-bold mb-2">Customer Reviews</h2>
            <div className="flex items-center">
                <span className="text-2xl sm:text-3xl font-bold text-yellow-400">{averageRating}</span>
                <span className="ml-2 text-sm sm:text-base font-bold">{`out of 5`}</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500">{totalRatings} global ratings</p>
            <div className="mt-3 sm:mt-4">
                {ratings.map((rating) => (
                    <RatingBar key={rating.stars} stars={rating.stars} percentage={rating.percentage} />
                ))}
            </div>
        </div>
    );
};

export default RatingSummary;