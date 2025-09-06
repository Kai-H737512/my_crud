import { deletePlant, getPlantById } from "@/actions/plants.action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import toast from "react-hot-toast";

type Plant = NonNullable<Awaited<ReturnType<typeof getPlantById>>>;

export function DeleteDialog({plant}: {plant: Plant}) {

  const handleDelete = async () => {
    const result = await deletePlant(plant.id);
    if (result.success) {
      toast.success("Plant deleted successfully");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="outline" className="ml-auto flex items-center gap-2 bg-red-600 hover:bg-red-700"
        >
          <span>
            <Trash className="w-4 h-4" />
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to delete this plant?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the plant.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            className="bg-red-500 hover:bg-red-600"
            onClick={handleDelete}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
