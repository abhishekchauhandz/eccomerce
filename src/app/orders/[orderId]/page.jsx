import Image from "next/image";
import OrderStatus from "@/app/_components/OrderStatus";
import Button from "@/app/_components/button/Button";
import { orders } from "@/userDetails";
import Link from "next/link";

export default async function OrderDetails({ params }) {
  const { orderId } = await params;
  const order = orders.find((ord) => ord.id === orderId);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Order Not Found
        </h2>
        <Link href="/orders">
          <Button btnVariant="back">Back to Order History</Button>
        </Link>
      </div>
    );
  }

  const totalAmount = order.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-gray-100 p-4 lg:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/orders">
            <Button
              btnVariant="back"
              className="gap-2"
              text={
                <span className="text-2xl md:text-3xl font-bold text-gray-800  gap-2">
                  Order #{order.id}
                </span>
              }
            />
          </Link>
        </div>

        <div className="text-sm text-gray-500 mb-6 lg:ps-2">
          Date: {order.date} | Status:{" "}
          <span className="font-medium">{order.status}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left-> Order */}
          <div className="flex-1">
            <div className="bg-white shadow rounded p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Order Items
              </h2>
              <div className="divide-y">
                {order.items.map((item, index) => (
                  <div key={index} className="py-4 flex gap-4 items-center">
                    <div className="w-20 h-20 relative flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-600">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white shadow rounded p-4 mt-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Delivery Status
              </h2>
              <OrderStatus status={order.status} />
            </div>
          </div>

          {/* Right-> Address, Price Details */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            {/* Addressection */}
            <div className="bg-white shadow rounded p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Shipping Address
              </h2>
              <p className="text-sm text-gray-700">
                {order.address.name}
                <br />
                {order.address.phone}
                <br />
                {order.address.street}, {order.address.city},<br />
                {order.address.state} - {order.address.pincode}
              </p>
            </div>

            {/* PriceDetails */}
            <div className="bg-white shadow rounded p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Price Details
              </h2>
              <div className="text-sm text-gray-700 space-y-2">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <hr />
                <div className="flex justify-between font-semibold pt-2">
                  <span>Total</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
