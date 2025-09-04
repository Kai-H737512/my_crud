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
import { Edit } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Combobox } from "@/components/ui/combo-box"
import { Textarea } from "@/components/ui/textarea"
import ImageUpload from "@/components/ImageUpload"
import { useState } from "react"
import { editPlant, getPlantById } from "@/actions/plants.action"
import { toast } from "react-hot-toast"

type Plant = NonNullable<Awaited<ReturnType<typeof getPlantById>>>;

interface EditDialogProps {
  plant: Plant;
}

export default function EditDialog({plant}: EditDialogProps) {

  const [formData, setFormData] = useState({
    name: plant?.name.trim(),
    category: plant?.category.trim(),
    description: (plant?.description || "").trim(),
    stock: plant?.stock,
    price: plant?.price,
    imageUrl: plant?.imageUrl || "",
  });

  const handleChange = (field: string, value: string | number) => {
    console.log("handleChange called with field:", field, "and value:", value);
    setFormData({...formData, [field]: value});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    try { 
      const newPlant = await editPlant(plant.id, formData);
      console.log("newPlant", newPlant);
      toast.success("Plant edited successfully");
    } catch (error) {
      console.error("Error editing plant:", error);
      toast.error("Failed to edit plant");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="default"
          className="ml-auto flex items-center gap-2"
          asChild
          >
            <span>
              <Edit className="w-4 h-4" />
              Edit</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit</AlertDialogTitle>
          <AlertDialogDescription className="text-[15px ]">
            Fill out the form to edit the plant.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Combobox
                value={formData.category}
                onChange={(val) => handleChange("category", val)}
              />
            </div>
          </div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Type your message here."
            rows={5}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                placeholder="Enter stock quantity"
                value={formData.stock}
                onChange={(e) => handleChange("stock", Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) => handleChange("price", Number(e.target.value))}
              />
            </div>
          </div>

          {/*Image Upload*/}
          <div className="py-5">
          <ImageUpload
            endpoint="postImage"
            value={formData.imageUrl}
            onChange={(url) => {
              handleChange("imageUrl", url);
            }}
          />
          </div>
          

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Submit</AlertDialogAction>
          </AlertDialogFooter>
        </form>
        
      </AlertDialogContent>
    </AlertDialog>
  )
}
