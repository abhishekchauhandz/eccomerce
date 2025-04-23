"use client";
import { useState, useMemo } from "react";
import OrderCard from "@/app/_components/cards/OrderCard";
import OrderFilters from "../_components/filter/OrderFilters";
import Button from "../_components/button/Button";
import { orders } from "@/userDetails";
import { useNavigate } from "../hooks/useNavigate";
import Pagination from "../_components/pagination";

const PAGE_SIZE = 4;

export default function OrderHistoryPage() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const { goTo } = useNavigate();

  const filteredOrders = useMemo(() => {
    let result = [...orders];
    if (statusFilter !== "All") {
      result = result.filter((order) => order.status === statusFilter);
    }
    result.sort((a, b) =>
      sortOrder === "desc"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );
    return result;
  }, [statusFilter, sortOrder]);

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredOrders.slice(start, start + PAGE_SIZE);
  }, [filteredOrders, currentPage]);

  const totalPages = Math.ceil(filteredOrders.length / PAGE_SIZE);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-auto mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Button onClick={() => goTo("/")} btnVariant="back" className="gap-2"
            text={
              <span className="text-2xl md:text-3xl font-bold text-gray-800">
                Order History
              </span>

            } />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          <OrderFilters
            statusFilter={statusFilter}
            setStatusFilter={(val) => {
              setStatusFilter(val);
              setCurrentPage(1);
            }}
            sortOrder={sortOrder}
            setSortOrder={(val) => {
              setSortOrder(val);
              setCurrentPage(1);
            }}
          />

          {/* Orders List */}
          <section className="md:col-span-3 ">
            <div className="flex flex-col gap-8">
              {paginatedOrders.length > 0 ? (
                paginatedOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))
              ) : (
                <p className="text-gray-600 text-center mt-12">
                  No orders found.
                </p>
              )}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              className="mt-8"
            />
          </section>
        </div>
      </div>
    </main>
  );
}
