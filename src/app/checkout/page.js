"use client";
import { useState, useEffect } from "react";
import { initialAddresses as defaultAddresses } from "@/userDetails";
import { SectionHeading } from "./SectionHeading";
import { useCart } from "../context/CartContext";
import { useBuyNow } from "../context/BuyNowContext";
import { LoginViewSection } from "./LoginViewSection";
import { AddressViewSection } from "./AddressViewSection";
import { AddressEditSection } from "./AddressEditSection";
import { OrderSummarySection } from "./OrderSummarySection";
import { PriceDetailsSection } from "./PriceDetailsSection";
import { PaymentOptionsSection } from "./PaymentOptionsSection";
import { useRouter } from "next/navigation";
import Button from "../_components/button/Button";

export const CheckoutPage = () => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(1);
  const [activeSection, setActiveSection] = useState("");
  const [addresses, setAddresses] = useState(defaultAddresses);
  const { setIsCartOpen, cartItems, removeFromCart } = useCart();
  const [newAddress, setNewAddress] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [currentlyEditingId, setCurrentlyEditingId] = useState(null);
  const { buyNowProduct, clearBuyNow } = useBuyNow();
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const handleBack = () => {
    router.push("/");
  };

  useEffect(() => {
    if (buyNowProduct) {
      setProducts([buyNowProduct]);
    } else {
      setProducts(cartItems);
    }
  }, [buyNowProduct, cartItems]);

  const handleAddOrUpdateAddress = () => {
    if (currentlyEditingId) {
      const updatedAddresses = addresses.map((addr) =>
        addr.id === currentlyEditingId ? { ...addr, ...newAddress } : addr
      );
      setAddresses(updatedAddresses);
    } else {
      const id = addresses.length
        ? Math.max(...addresses.map((a) => a.id)) + 1
        : 1;
      const updatedAddresses = [...addresses, { id, ...newAddress }];
      setAddresses(updatedAddresses);
      setSelectedAddressId(id);
    }

    setShowAddressForm(false);
    setNewAddress({ address: "", city: "", state: "", pincode: "" });
    setCurrentlyEditingId(null);
  };

  const handleEditAddress = (id) => {
    const addr = addresses.find((a) => a.id === id);
    if (addr) {
      setNewAddress({
        address: addr.address,
        city: addr.city,
        state: addr.state,
        pincode: addr.pincode,
      });
      setShowAddressForm(true);
      setCurrentlyEditingId(id);
    }
  };

  const handleDeleteAddress = (id) => {
    const updated = addresses.filter((a) => a.id !== id);
    setAddresses(updated);
    if (selectedAddressId === id && updated.length > 0) {
      setSelectedAddressId(updated[0].id);
    } else if (updated.length === 0) {
      setSelectedAddressId(null);
    }
  };

  const handleProceedToPayment = () => {
    setIsCartOpen(false);
    setActiveSection("PAYMENT");
  };

  const handleBackToSummary = () => {
    setActiveSection("SUMMARY");
  };

  const handleSuccessfulPayment = () => {
    console.log("success");
    //cartItems.forEach((item) => removeFromCart(item.id));
  };

  const selectedAddress = addresses.find(
    (addr) => addr.id === selectedAddressId
  );

  return (
    <div className="text-xs md:text-[1rem] bg-gray-100 min-h-screen py-8 px-6">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <div className="flex items-center gap-2 mb-6 ">
            <Button btnVariant="back" onClick={handleBack} />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Order Checkout
            </h1>
          </div>
          <LoginViewSection />

          {activeSection === "ADDRESS" ? (
            <>
              <AddressViewSection
                addresses={addresses}
                selectedAddressId={selectedAddressId}
                onSelect={(id) => setSelectedAddressId(id)}
                onEdit={() => {
                  setCurrentlyEditingId(null);
                  setShowAddressForm(true);
                  setNewAddress({
                    address: "",
                    city: "",
                    state: "",
                    pincode: "",
                  });
                }}
                onEditAddress={handleEditAddress}
                onDeleteAddress={handleDeleteAddress}
              />

              {showAddressForm && (
                <AddressEditSection
                  onSave={handleAddOrUpdateAddress}
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      [e.target.name]: e.target.value,
                    })
                  }
                  formData={newAddress}
                  currentlyEditingId={currentlyEditingId}
                />
              )}
            </>
          ) : (
            <div className="bg-white rounded-2xl p-4 shadow mb-4">
              <div className="flex justify-between items-center">
                <SectionHeading number="2" title="Delivery Address" />
              </div>
              <div className="mt-2 text-gray-700">
                {selectedAddress ? (
                  <>
                    <p>{selectedAddress.address}</p>
                    <p>
                      {selectedAddress.city}, {selectedAddress.state} -{" "}
                      {selectedAddress.pincode}
                    </p>
                  </>
                ) : (
                  <p className="text-blood">No address selected.</p>
                )}
              </div>
              <div className="flex justify-end w-full mt-4">
                <button
                  onClick={() => setActiveSection("ADDRESS")}
                  className="text-white bg-primary text-xs md:text-[1rem] px-3 py-2 rounded"
                >
                  Add/Edit Address
                </button>
              </div>
            </div>
          )}

          <div className="lg:hidden my-4">
            <PriceDetailsSection products={products} />
          </div>

          <OrderSummarySection
            activeSection={activeSection}
            onProceedToPayment={handleProceedToPayment}
            products={products}
            setProducts={setProducts}
          />

          {activeSection === "PAYMENT" && (
            <>
              <PaymentOptionsSection
                isActive={true}
                onBack={handleBackToSummary}
                onPaymentSuccess={handleSuccessfulPayment}
              />
            </>
          )}
        </div>

        <div className="hidden lg:block mt-15  lg:col-span-1">
          <PriceDetailsSection products={products} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
