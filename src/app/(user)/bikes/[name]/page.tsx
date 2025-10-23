import { Metadata } from "next";
import BikeDetailsClient from "./BikeDetailsClient";

interface BikePageProps {
  params: Promise<{ name: string }>; // ✅ params is a Promise in Next.js 15+
}

export async function generateMetadata({ params }: BikePageProps): Promise<Metadata> {
  const { name } = await params; // ✅ await required here
  return {
    title: `${decodeURIComponent(name)} | TR Bike Rentals`,
    description: `View details, specs, and rent the ${decodeURIComponent(name)} from TR Bike Rentals.`,
  };
}

export default async function BikePage({ params }: BikePageProps) {
  const { name } = await params; // ✅ must await
  return <BikeDetailsClient name={decodeURIComponent(name)} />;
}
