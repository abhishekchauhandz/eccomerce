"use client";
import React from "react";
import PropTypes from "prop-types";

const STATUS_OPTIONS = [
  { label: "All", value: "All" },
  { label: "Delivered", value: "Delivered" },
  { label: "Shipped", value: "Shipped" },
  { label: "Pending", value: "Pending" },
  { label: "Canceled", value: "Canceled" },
  { label: "Return", value: "Return" },
  { label: "Refund", value: "Refund" },
];

export default function OrderFilters({
  statusFilter,
  setStatusFilter,
  sortOrder,
  setSortOrder,
}) {
  return (
    <aside
      className="bg-white rounded-xl shadow p-4 w-full"
      aria-label="Order Filters"
    >
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Filters</h2>

      {/* Status Filter */}
      <div className="mb-4">
        <label
          htmlFor="statusFilter"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Status
        </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Sort by Date */}
      <div>
        <label
          htmlFor="dateSort"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Sort by Date
        </label>
        <select
          id="dateSort"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>
    </aside>
  );
}

OrderFilters.propTypes = {
  statusFilter: PropTypes.string.isRequired,
  setStatusFilter: PropTypes.func.isRequired,
  sortOrder: PropTypes.string.isRequired,
  setSortOrder: PropTypes.func.isRequired,
};
