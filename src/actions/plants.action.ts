"use server"

import { getUserId } from "./user.action"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { Prisma } from "@prisma/client"

export async function getPlants(searchTerm: String) {
  try {
    const currentUserId = await getUserId()

    const whereClause: any = {
      userId: currentUserId,
    };

    if (searchTerm) {
      whereClause.name = {
        contains: searchTerm,
        mode: "insensitive",
      };
    } 

    const userPlants = await prisma.plants.findMany({
      where: whereClause,
    });
    
    revalidatePath("/");
    
    return {success: true, data: userPlants};

  } catch (error) {
    console.error("Error fetching plants:", error);
    throw new Error("Failed to fetch plants");
  }
} 

export async function deletePlant(plantId: string) {
  try {

    const plant = await prisma.plants.findUnique({
      where: {id: plantId},
    });

    if (!plant) {
      return {success: false, message: "Plant not found"};
    }

    await prisma.plants.delete({
      where: {id: plantId},
    });

    revalidatePath("/");
    return {success: true, message: "Plant deleted successfully"};
  } catch (error) {
    console.error("Error deleting plant:", error);
    throw new Error("Failed to delete plant");
  }
}

export async function getPlantById(plantId: string) {
  const plant = await prisma.plants.findUnique({
    where: {id: plantId},
  });
  return plant;
}

export async function createPlant(data: {
  name: string;
  description?: string | null;
  category: string;
  stock: number;
  price: number;
  imageUrl?: string | null;
}) {

  try {
    const currentUserId = await getUserId();
    if (!currentUserId) {
      return {success: false, message: "User not found"};
    }
    
    const newPlant = await prisma.plants.create({
      data: {
        ...data,
        userId: currentUserId,
      }
    });

    return {success: true, data: newPlant};
  } catch (error) {
      console.error("Error creating plant:", error);
      throw new Error("Failed to create plant");
    }
}

export async function editPlant(
  id: string,
  data: {
    name?: string;
    description?: string | null;
    category?: string;
    stock?: number;
    price?: number;
    imageUrl?: string | null;
  }
) {
    try {
      const currentUserId = await getUserId();
      const plant = await prisma.plants.update({
        where: { id },
        data: {
          ...data,
          userId: currentUserId,
        },
      });
      revalidatePath("/plants");
      
      return { success: true, data: plant };
    } catch (error) {
        console.error("Error editing plant:", error);
        throw new Error("Failed to edit plant");
      }
}