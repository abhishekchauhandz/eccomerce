import Button from "../button/Button";
import RatingSummary from "./RatingSummary";
import ReviewCard from "../cards/ReviewCard";

const RatingAndReviews = ({
    summary,
    reviews,
}) => {
    return (
        <div className="mt-4 sm:mt-6 md:mt-8 p-4 sm:p-6 md:p-10 grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-6 md:gap-9">
            <div>
                <RatingSummary
                    totalRatings={summary.totalRatings}
                    averageRating={summary.averageRating}
                    ratings={summary.ratings}
                />
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-100 rounded-lg">
                    <h4 className="text-base sm:text-lg font-bold mb-2">Review this product</h4>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                        Share your thoughts with other customers
                    </p>
                    <Button
                        btnVariant="standard"
                        text="Write a product review"
                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary text-white rounded hover:bg-green-700 text-xs sm:text-sm"
                    />
                </div>
            </div>
            <div className="flex justify-center flex-col">
                <h3 className="text-base sm:text-lg font-bold mt-4 sm:mt-6 mb-3 sm:mb-4">Top Reviews</h3>
                {reviews.map((review, index) => (
                    <ReviewCard key={index} {...review} />
                ))}
            </div>
        </div>
    );
};

export default RatingAndReviews;
