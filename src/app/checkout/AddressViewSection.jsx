import { SectionHeading } from "./SectionHeading";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Button from "../_components/button/Button";

export const AddressViewSection = ({
  addresses,
  selectedAddressId,
  onSelect,
  onEdit,
  onEditAddress,
  onDeleteAddress,
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow text-xs md:text-[1rem] mb-4">
      <div className="flex items-center w-full justify-between">
        <SectionHeading title="Delivery Address" number="2" />
        <Button
          onClick={onEdit}
          text="Add New"
          btnVariant="btnBaseClasses"
          className="text-bold text-accent underline pb-3"
        />
      </div>
      <div className="mt-4 space-y-3">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`flex items-start justify-between p-3 rounded border ${
              selectedAddressId === addr.id
                ? "border-primary-light "
                : "border-gray-200"
            }`}
          >
            <label className="flex items-start space-x-3 cursor-pointer w-full">
              <input
                type="radio"
                name="delivery-address"
                checked={selectedAddressId === addr.id}
                onChange={() => onSelect(addr.id)}
                className="mt-1 accent-primary"
              />
              <div>
                <p className="text-gray-700 font-medium">{addr.address}</p>
                <p className="text-gray-600">
                  {addr.city}, {addr.state} - {addr.pincode}
                </p>
              </div>
            </label>

            <div className="flex gap-2 items-start ml-4 pt-1">
              <button
                onClick={() => onEditAddress(addr.id)}
                className="text-primary"
                title="Edit"
              >
                <FiEdit2 size={16} />
              </button>
              <button
                onClick={() => onDeleteAddress(addr.id)}
                className="text-blood"
                title="Delete"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
