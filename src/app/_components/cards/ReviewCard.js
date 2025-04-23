import Image from "next/image";

const ReviewCard = ({
    user,
    rating,
    date,
    comment,
    images = [],
}) => {
    return (
        <div className="border-b border-gray-300 py-3 sm:py-4">
            <h3 className="font-semibold text-sm sm:text-base">{user}</h3>
            <div className="flex items-center">
                <span className="text-yellow-400 text-sm sm:text-base">{"★".repeat(rating)}</span>
                <span className="text-gray-500 ml-2 text-xs sm:text-sm">{date}</span>
            </div>
            <p className="mt-1.5 sm:mt-2 text-gray-700 text-xs sm:text-sm">{comment}</p>
            {images.length > 0 && (
                <div className="flex gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
                    {images.map((img, index) => (
                        <Image
                            width={100}
                            height={100}
                            key={index}
                            src={img}
                            alt="Review"
                            className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
export default ReviewCard;