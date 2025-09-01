import { getUserId } from "./user.action"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

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
    console.log('getting userplants', userPlants);
    return {success: true, data: userPlants};

  } catch (error) {
    console.error("Error fetching plants:", error);
    throw new Error("Failed to fetch plants");
  }
} 

export async function deletePlant(plantId: string) {
  try {
    const currentUserId = await getUserId();

    const plant = await prisma.plants.findUnique({
      where: {id: plantId, userId: currentUserId},
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