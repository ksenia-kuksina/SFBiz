import HomePage from "@/components/HomePage";
import { Business } from "@/types/business";

async function getBusinesses(): Promise<Business[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const res = await fetch(`${apiUrl}/businesses`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function Page() {
  const businesses = await getBusinesses();
  return <HomePage businesses={businesses} />;
}