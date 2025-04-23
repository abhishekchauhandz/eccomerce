import React from "react";

const Specifications = ({
    seller,
    rating,
    returnPolicy,
    description,
    specifications,
}) => {
    return (
        <div className="mt-4 sm:mt-6 bg-white p-3 sm:p-4 rounded-lg shadow-md">
            {/* Seller Section */}
            <div className="mb-3 sm:mb-4">
                <h2 className="text-base sm:text-lg font-semibold">Seller</h2>
                <p className="text-xs sm:text-sm text-gray-600">
                    {seller}{" "}
                    <span className="text-primary font-semibold">⭐ {rating}</span>
                </p>
                <p className="text-xs sm:text-sm text-gray-500">{returnPolicy}</p>
            </div>

            {/* Description Section */}
            <div className="mb-4 sm:mb-6">
                <h2 className="text-base sm:text-lg font-semibold">Description</h2>
                <p className="text-xs sm:text-sm text-gray-600">{description}</p>
            </div>

            {/* Specifications Section */}
            <div>
                <h2 className="text-base sm:text-lg font-semibold">Specifications</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs sm:text-sm text-left text-gray-600 mt-3 sm:mt-4 border">
                        <tbody>
                            {specifications.map((spec, index) => (
                                <tr key={index} className="border-t">
                                    <td className="py-2 px-2 sm:px-4 font-medium whitespace-nowrap">{spec.key}</td>
                                    <td className="py-2 px-2 sm:px-4">{spec.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Specifications;
