import { SectionHeading } from "./SectionHeading";
import Button from "../_components/button/Button";
import { useState } from "react";

export const AddressEditSection = ({
  onSave,
  onChange,
  formData,
  currentlyEditingId,
}) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!/^.{10,}$/.test(formData.address.trim())) {
      newErrors.address = "Address should be min 10 letters.";
    }
    if (!/^[A-Za-z\s]{4,}$/.test(formData.city.trim())) {
      newErrors.city = "City name min 4 letters.";
    }
    if (!/^[A-Za-z\s]{4,}$/.test(formData.state.trim())) {
      newErrors.state = "State name is min 4 letters.";
    }
    if (!/^\d{4,}$/.test(formData.pincode))
      newErrors.pincode = "Pincode must be at least 4 digits.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;
    onSave();
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md mb-4 text-sm md:text-base">
      <SectionHeading
        title={currentlyEditingId ? "Edit Address" : "Add New Address"}
      />
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Address Field */}
        <div>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={onChange}
            placeholder="Address"
            className={`border p-2 rounded w-full ${
              errors.address ? "border-blood" : "border-gray-300"
            }`}
          />
          {errors.address && (
            <p className="text-blood text-xs mt-1">{errors.address}</p>
          )}
        </div>

        {/* City Field */}
        <div>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={onChange}
            placeholder="City"
            className={`border p-2 rounded w-full ${
              errors.city ? "border-blood" : "border-gray-300"
            }`}
          />
          {errors.city && (
            <p className="text-blood text-xs mt-1">{errors.city}</p>
          )}
        </div>

        {/* State Field */}
        <div>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={onChange}
            pattern="^[A-Za-z\s]+$"
            placeholder="State"
            className={`border p-2 rounded w-full ${
              errors.state ? "border-blood" : "border-gray-300"
            }`}
          />
          {errors.state && (
            <p className="text-blood text-xs mt-1">{errors.state}</p>
          )}
        </div>

        {/* Pincode Field */}
        <div>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={onChange}
            placeholder="Pincode"
            className={`border p-2 rounded w-full ${
              errors.pincode ? "border-blood" : "border-gray-300"
            }`}
            pattern="\d{4,}"
            title="Pincode should be at least 4 digits"
          />
          {errors.pincode && (
            <p className="text-blood text-xs mt-1">{errors.pincode}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          text="Save Address"
          btnVariant="standard"
          className="bg-blood text-white py-2 px-4 rounded-full hover:shadow-md transition-all"
        />
      </form>
    </div>
  );
};
