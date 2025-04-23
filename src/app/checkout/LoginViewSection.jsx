import { SectionHeading } from "./SectionHeading";
import { useAuth } from "../context/AuthContext";
import Link from 'next/link';

export const LoginViewSection = () => {
  const { isAuthenticated, user } = useAuth();

  return isAuthenticated ? (
    <div className="bg-white rounded-2xl p-4 shadow mb-4">
      <SectionHeading title="Login" number={"1"} />

      <span className="text-gray-600 mt-2 pl-6 font-bold block">
        Name: <span className="font-normal">{user?.name}</span>
      </span>
      <span className="text-gray-600 font-bold pl-6 block">
        Email: <span className="font-normal">{user?.email}</span>
      </span>
    </div>
  ) : (
    <div className="bg-white rounded-2xl p-4 shadow mb-4">
      <SectionHeading title="Login" number={"1"} />
      <span className="text-gray-600 font-bold pl-6 block">
        Please Login First
      </span>
      <div className=" text-sm text-gray-600 pl-6 block">
        For New Registration?{' '}
        <Link
          href="/register"
          className="text-primary font-medium hover:underline hover:text-primary-dark transition-colors"
        >
          Sign up
        </Link>
      </div>
      <div className=" text-sm text-gray-600 pl-6 block">
        For Existing Account{' '}
        <Link
          href="/login"
          className="text-primary font-medium hover:underline hover:text-primary-dark transition-colors"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};
