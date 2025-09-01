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
import { Search } from "lucide-react"
import { useState } from "react"
import { Combobox } from "./ui/combo-box"
import { getPlants } from "@/actions/plants.action"

type Plant = Awaited<ReturnType<typeof getPlants>>;

interface InventoryTableProps {
  plants: Plant
  userPlants: Plant
}

export default function InventoryTable({plants}: InventoryTableProps) {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const filterPlants = plants?.data?.filter((plant: Plant) => 
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (selectedCategory === "" || plant.category === selectedCategory)
  );

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
          {filterPlants?.map((plant) => (
            <TableRow key={plant.id}>
              <TableCell className="font-medium">{plant.name}</TableCell>
              <TableCell>{plant.category}</TableCell>
              <TableCell>{plant.price}$</TableCell>
              <TableCell>{plant.stock}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <h1>edit button</h1>
                  <h1>delete button</h1>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </div>
    
  )
}
