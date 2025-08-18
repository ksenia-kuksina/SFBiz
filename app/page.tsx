import HomePage from "@/components/HomePage";
import { Business } from "@/types/business";

async function getBusinesses(): Promise<Business[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
    const res = await fetch(`${apiUrl}/businesses`, {
      cache: "no-store",
    });
    
    if (!res.ok) {
      console.error(`Failed to fetch businesses: ${res.status} ${res.statusText}`);
      return [];
    }
    
    return res.json();
  } catch (error) {
    console.error("Error fetching businesses:", error);
    return [];
  }
}

export default async function Page() {
  const businesses = await getBusinesses();
  return <HomePage businesses={businesses} />;
}