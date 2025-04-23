"use client";
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import Button from '@/app/_components/button/Button';
import Image from 'next/image';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [otp, setOtp] = useState('');
    const [showOtpForm, setShowOtpForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { register, verifyOtp } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect') || '/';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const result = await register(formData.email, formData.name, formData.phone);
            if (result) {
                toast.success('OTP sent successfully!');
                setShowOtpForm(true);
            }
        } catch (error) {
            toast.error(error.message || 'Registration failed');
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
                toast.success('Registration successful!');
                router.push(`/login?redirect=${encodeURIComponent(redirect)}`);
            }
        } catch (error) {
            toast.error('Verification failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[1700px] mx-auto  bg-background overflow-hidden flex items-center justify-center">
            {/* Main Content */}
            <ToastContainer position="top-right" autoClose={3000} />
            <div className='w-full flex flex-col lg:flex-row  justify-evenly'>
                {/* Left Side - Form */}
                <div className="w-full md:max-w-xl lg:w-1/2 bg-white flex items-center justify-center p-4 sm:p-6 lg:p-12">
                    <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-lg">
                        {/* Header */}
                        <div className="mb-8 text-left">
                            <h1 className="text-4xl font-bold text-blood mb-2">Naatu Sandhai</h1>
                            <p className="text-gray-600 mb-3">
                                {showOtpForm ? 'Enter the OTP sent to your email' : 'Join our community today'}
                            </p>
                            <h2 className="text-3xl font-bold text-primary">
                                {showOtpForm ? 'Verify Your Account' : 'Create Account'}
                            </h2>
                        </div>

                        {showOtpForm ? (
                            <form onSubmit={handleVerifyOtp} className="space-y-6">
                                <div>
                                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                                        Verification Code
                                    </label>
                                    <input
                                        id="otp"
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-transparent"
                                        placeholder="Enter 4-digit OTP (1234)"
                                        required
                                    />
                                    <p className="text-sm text-gray-500 mt-2">
                                        OTP sent to <span className="font-medium">{formData.email}</span>
                                    </p>
                                </div>

                                <Button
                                    type="submit"
                                    text={isLoading ? 'Verifying...' : 'Verify OTP'}
                                    loading={isLoading}
                                    className="w-full py-3 bg-blood"
                                />

                                <div className="text-center">
                                    <button
                                        type="button"
                                        onClick={() => setShowOtpForm(false)}
                                        className="text-sm font-medium hover:underline hover:text-primary-dark transition-colors"
                                    >
                                        Use different email
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleSendOtp} className="space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-transparent"
                                            placeholder="Your Name"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-transparent"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-transparent"
                                            placeholder="+91 12345 67890"
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    text={isLoading ? 'Sending OTP...' : 'Send OTP'}
                                    loading={isLoading}
                                    className="w-full py-3 bg-blood"
                                />

                                <div className="text-center text-sm text-gray-600">
                                    Already have an account?{' '}
                                    <Link
                                        href={`/login?redirect=${encodeURIComponent(redirect)}`}
                                        className="text-blood font-medium hover:underline"
                                    >
                                        Sign in
                                    </Link>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* Right Side - Image */}
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