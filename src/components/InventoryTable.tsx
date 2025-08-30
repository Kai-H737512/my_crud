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

const plants = [
  {
    id: "PLT001",
    name: "绿萝",
    category: "观叶植物",
    price: 25.00,
    stock: 45,
    status: "在售"
  },
  {
    id: "PLT002", 
    name: "多肉植物",
    category: "多肉植物",
    price: 15.00,
    stock: 120,
    status: "在售"
  },
  {
    id: "PLT003",
    name: "君子兰",
    category: "观花植物", 
    price: 85.00,
    stock: 12,
    status: "在售"
  },
  {
    id: "PLT004",
    name: "发财树",
    category: "观叶植物",
    price: 65.00,
    stock: 28,
    status: "在售"
  },
  {
    id: "PLT005",
    name: "仙人掌",
    category: "多肉植物",
    price: 12.00,
    stock: 200,
    status: "在售"
  },
  {
    id: "PLT006",
    name: "蝴蝶兰",
    category: "观花植物",
    price: 150.00,
    stock: 8,
    status: "在售"
  },
  {
    id: "PLT007",
    name: "芦荟",
    category: "多肉植物",
    price: 18.00,
    stock: 85,
    status: "在售"
  },
  {
    id: "PLT008",
    name: "文竹",
    category: "观叶植物",
    price: 35.00,
    stock: 32,
    status: "在售"
  },
  {
    id: "PLT009",
    name: "月季花",
    category: "观花植物",
    price: 45.00,
    stock: 25,
    status: "在售"
  },
  {
    id: "PLT010",
    name: "虎尾兰",
    category: "观叶植物",
    price: 22.00,
    stock: 60,
    status: "在售"
  }
]

export default function InventoryTable() {
  const [selectedCategory, setSelectedCategory] = useState("")

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4">
        <div className="relative max-w-sm w-full">
        <Input
            placeholder="Filter plants..."
            className="pl-10"
          />
          <Search className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        <Combobox value={selectedCategory} onChange={setSelectedCategory} />

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
          {plants.map((plants) => (
            <TableRow key={plants.id}>
              <TableCell className="font-medium">{plants.name}</TableCell>
              <TableCell>{plants.category}</TableCell>
              <TableCell>{plants.price}$</TableCell>
              <TableCell>{plants.stock}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <h1>edit button</h1>
                  <h1>delete button</h1>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
    
  )
}
