const RatingBar = ({ stars, percentage }) => {
    return (
        <div className="flex items-center mb-1.5 sm:mb-2">
            <span className="w-10 sm:w-12 text-xs sm:text-sm">{stars} star</span>
            <div className="w-full bg-gray-200 h-1.5 sm:h-2 rounded-lg mx-2">
                <div
                    className="bg-yellow-400 h-1.5 sm:h-2 rounded-lg"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            <span className="text-xs sm:text-sm text-gray-600">{percentage}%</span>
        </div>
    );
};

export default RatingBar;