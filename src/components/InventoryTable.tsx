"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "./ui/input"
import { Edit, Search, Trash   } from "lucide-react"
import { useState } from "react"
import { Combobox } from "./ui/combo-box"
import { getPlants } from "@/actions/plants.action"
import { useRouter } from "next/navigation"
import { Skeleton } from "./ui/skeleton"
import { Button } from "./ui/button"
import { AlertDialogDemo } from "./CreateDialog"
import EditDialog from "./EditDialog"
import { DEFAULT_CIPHERS } from "tls"
import { DeleteDialog } from "./DeleteDialog"


type Plant = Awaited<ReturnType<typeof getPlants>>['data'][0];

interface InventoryTableProps {
  plants: Awaited<ReturnType<typeof getPlants>>
}

export default function InventoryTable({plants}: InventoryTableProps) {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter();

  const filterPlants = plants?.data?.filter((plant: Plant) => 
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (selectedCategory === "" || plant.category === selectedCategory)
  );

  if (!plants) {
    return (
      <div className="w-full space-y-4">
        <div className="flex items-center gap-2 py-4">
          <Skeleton className="h-10 w-full max-w-sm" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead className="text-right">
                <Skeleton className="w-full h-4" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="w-full h-4" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4">
        <div className="relative max-w-sm w-full">
        <Input
            placeholder="Filter plants..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        <Combobox value={selectedCategory} onChange={(val) => setSelectedCategory(val)} />
        <AlertDialogDemo /> 
        
      </div>
        <Table>
        <TableHeader>
          <TableRow>
            
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterPlants?.map((plant) => { 
            const slugifiedName = plant.name.toLowerCase().replace(/ /g, "-");
            const slug = `/plants/${plant.id}--${slugifiedName}`;
            const plantUrl = `${slug}`;
            
            return(

            <TableRow key={plant.id} onClick={() => router.push(plantUrl)}>
              <TableCell className="font-medium">{plant.name}</TableCell>
              <TableCell>{plant.category}</TableCell>
              <TableCell>{plant.price}$</TableCell>
              <TableCell>{plant.stock}</TableCell>
              <TableCell className="text-right">
                <div 
                  className="flex justify-end space-x-2"
                  onClick={(e) => e.stopPropagation()}
                >
                    <EditDialog plant={plant}>
                      
                    </EditDialog>
                    <DeleteDialog plant={plant}>
                      
                    </DeleteDialog>
                  
                </div>
              </TableCell>
            </TableRow>
          )})}
        </TableBody>

      </Table>
    </div>
    
  )
}
