"use client";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@/app/_components/button/Button";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, verifyOtp } = useAuth();
  const router = useRouter();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await login(email);
      if (result) {
        toast.success("OTP sent successfully!");
        setShowOtpForm(true);
      }
    } catch (error) {
      toast.error("Error sending OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await verifyOtp(otp);
      if (result) {
        router.push("/checkout");
      }
    } catch (error) {
      toast.error("Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[1700px] mx-auto  bg-background overflow-hidden flex items-center justify-center">
      {/* Main Content */}
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Left Side - Form */}
      <div className="w-full flex flex-col lg:flex-row justify-evenly">
        <div className="w-full md:max-w-xl lg:w-1/2 bg-white flex items-center justify-center p-4 sm:p-6 lg:p-12">
          <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-lg max-h-[65vh]">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-blood mb-2">
                Naatu Sandhai
              </h1>
              <p className="mt-2 text-600 mb-3">
                {showOtpForm
                  ? "Enter the OTP sent to your email"
                  : "Welcome Back!!!"}
              </p>
              <h1 className="text-3xl font-bold text-primary mb-8">
                {showOtpForm ? "Verify Your Account" : "Sign-in"}
              </h1>
            </div>

            {showOtpForm ? (
              <form
                onSubmit={handleVerifyOtp}
                className="space-y-4 sm:space-y-6"
              >
                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Verification Code
                  </label>
                  <input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300  focus:border-transparent transition-all"
                    placeholder="Enter 4-digit OTP (1234)"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    OTP sent to <span className="font-medium">{email}</span>
                  </p>
                </div>

                <Button
                  type="submit"
                  text={isLoading ? "Verifying..." : "Verify OTP"}
                  btnVariant="standard"
                  loading={isLoading}
                  className="w-full bg-blood py-3 text-base sm:text-lg font-medium"
                />

                <div className="text-center ">
                  <button
                    type="button"
                    onClick={() => setShowOtpForm(false)}
                    className="text-sm font-medium hover:underline hover:text-primary-dark  transition-colors mb-4"
                  >
                    Use different email
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSendOtp} className="space-y-4 sm:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300  focus:border-transparent transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  text={isLoading ? "Sending..." : "Send OTP"}
                  btnVariant="sign-in"
                  loading={isLoading}
                  className="w-full bg-blood text-white py-3 text-base sm:text-lg font-medium"
                />

                <div className="text-center text-sm text-gray-600">
                  Don’t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-blood font-medium hover:underline hover:text-blood-dark transition-colors"
                  >
                    Sign up
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Right Side - Image (Desktop only) */}
        <div className="hidden lg:flex w-full md:max-w-xl lg:w-1/3  bg-orange-light items-center justify-center p-12">
          <Image
            src="/assets/login-img.svg"
            alt="Login illustration"
            width={500}
            height={500}
            className="object-contain w-full h-auto ml-[-20rem]"
          />
        </div>
      </div>
    </div>
  );
}
