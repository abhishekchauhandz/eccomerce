"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const ProfilePopup = ({ onClose }) => {
  const popupRef = useRef(null);
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleLogin = () => {
    router.push('/login');
  };

  const handleLogout = () => {
    logout();
    onClose();
    router.push('/');
  };

  return (
    <div
      ref={popupRef}
      className="absolute right-0 mt-2 z-50 w-64 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden"
    >
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-3">
          <Image
            src={user?.image || "/assets/profile-user.png"}
            alt="User"
            className="rounded-full object-cover"
            width={40}
            height={40}
          />
          <div className="truncate">
            <p className="font-medium text-gray-900 truncate">{user?.name || 'User'}</p>
            <p className="text-sm text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
          </div>
        </div>
      </div>

      {/* Menu items */}
      <nav className="py-1 text-sm">
        <Link
          href="/profile"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
          onClick={onClose}
        >
          Your Profile
        </Link>
        <Link
          href="/orders"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
          onClick={onClose}
        >
          Your Orders
        </Link>
        <Link
          href="/wishlist"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
          onClick={onClose}
        >
          Wishlist
        </Link>
      </nav>

      {/* Footer */}
      {isAuthenticated ? (
        <div className="border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>) : (<div className="border-t border-gray-100">
          <button
            onClick={handleLogin}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            Login
          </button>
        </div>)}
    </div>
  );
};

export default ProfilePopup;