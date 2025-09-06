import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
   <Hero 
     heading="Welcome to Plant Inventory"
     description="Manage your plant collection with ease"
     image={{
       src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500",
       alt: "Beautiful plants"
     }}
   />
  );
}
