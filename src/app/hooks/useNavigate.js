"use client"

import { useRouter } from "next/navigation";

export const useNavigate = () => {
    const router = useRouter();
  
    const goBack = () => router.back();
    const goTo = (path) => router.push(path);
  
    return { goBack, goTo };
  };