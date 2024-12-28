'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Plus, Trash2 } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const availableProducts = [
  { id: 1, name: "AMD Ryzen 9 5950X", price: 699.99 },
  { id: 2, name: "NVIDIA GeForce RTX 3080", price: 699.99 },
  { id: 3, name: "Samsung 970 EVO Plus 1TB", price: 149.99 },
  { id: 4, name: "Intel Core i9-11900K", price: 539.99 },
  { id: 5, name: "AMD Radeon RX 6800 XT", price: 649.99 },
  { id: 6, name: "Crucial P5 1TB NVMe SSD", price: 119.99 },
  { id: 7, name: "G.Skill Trident Z Neo 32GB", price: 189.99 },
  { id: 8, name: "ASUS ROG Strix X570-E Gaming", price: 299.99 },
]

const initialUsers = [
  { id: 1, name: "John Doe", nip: "1234567890", address: "123 Main St", postalCode: "12-345", city: "New York" },
  { id: 2, name: "Jane Smith", nip: "0987654321", address: "456 Elm St", postalCode: "54-321", city: "Los Angeles" },
]

type Product = {
  id: number
  name: string
  price: number
  quantity: number
}

type User = {
  id: number
  name: string
  nip: string
  address: string
  postalCode: string
  city: string
}

export function CreateOrder() {
  const [products, setProducts] = useState<Product[]>([])
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [newUser, setNewUser] = useState<Omit<User, 'id'>>({ name: '', nip: '', address: '', postalCode: '', city: '' })
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [filterTerm, setFilterTerm] = useState('')
  const [newProductQuantity, setNewProductQuantity] = useState(1)

  const totalValue = products.reduce((sum, product) => sum + product.quantity * product.price, 0)

  const filteredProducts = availableProducts.filter(product =>
    product.name.toLowerCase().includes(filterTerm.toLowerCase())
  )

  const handleAddProduct = (product: typeof availableProducts[0]) => {
    const existingProduct = products.find(p => p.id === product.id)
    if (existingProduct) {
      setProducts(products.map(p =>
        p.id === product.id ? { ...p, quantity: p.quantity + newProductQuantity } : p
      ))
    } else {
      setProducts([...products, { ...product, quantity: newProductQuantity }])
    }
    setIsAddingProduct(false)
    setFilterTerm('')
    setNewProductQuantity(1)
  }

  const handleRemoveProduct = (productId: number) => {
    setProducts(products.filter(product => product.id !== productId))
  }

  const handleCreateUser = () => {
    const newUserId = Math.max(...users.map(u => u.id), 0) + 1
    const createdUser = { id: newUserId, ...newUser }
    setUsers([...users, createdUser])
    setSelectedUser(createdUser)
    setNewUser({ name: '', nip: '', address: '', postalCode: '', city: '' })
  }

  return (
      <>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Order</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="user-select">Select Existing Customer</Label>
                  <Select onValueChange={(value) => setSelectedUser(users.find(u => u.id === parseInt(value)) || null)}>
                    <SelectTrigger id="user-select">
                      <SelectValue placeholder="Select a customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id.toString()}>{user.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Or Create New Customer</h3>
                  <div className="space-y-2">
                    <div>
                      <Label htmlFor="new-user-name">Name</Label>
                      <Input
                        id="new-user-name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-user-nip">NIP</Label>
                      <Input
                        id="new-user-nip"
                        value={newUser.nip}
                        onChange={(e) => setNewUser({ ...newUser, nip: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-user-address">Address</Label>
                      <Input
                        id="new-user-address"
                        value={newUser.address}
                        onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-user-postal-code">Postal Code</Label>
                      <Input
                        id="new-user-postal-code"
                        value={newUser.postalCode}
                        onChange={(e) => setNewUser({ ...newUser, postalCode: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-user-city">City</Label>
                      <Input
                        id="new-user-city"
                        value={newUser.city}
                        onChange={(e) => setNewUser({ ...newUser, city: e.target.value })}
                      />
                    </div>
                  </div>
                  <Button onClick={handleCreateUser} className="mt-4 bg-violet-600 text-white hover:bg-violet-700">Create Customer</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedUser && (
                <div className="mb-4">
                  <h3 className="font-semibold">Selected Customer:</h3>
                  <p>{selectedUser.name}</p>
                  <p>{selectedUser.address}</p>
                  <p>{selectedUser.postalCode} {selectedUser.city}</p>
                  <p>NIP: {selectedUser.nip}</p>
                </div>
              )}
              <div className="text-xl font-bold mb-4">Total Order Value: ${totalValue.toFixed(2)}</div>
              <div className="flex justify-center">
                <Button onClick={() => setIsAddingProduct(true)} className="bg-violet-600 text-white hover:bg-violet-700">
                  <Plus className="mr-2 h-4 w-4" /> Add Product
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <div>
                <Label htmlFor="filter">Filter Products</Label>
                <Input
                  id="filter"
                  value={filterTerm}
                  onChange={(e) => setFilterTerm(e.target.value)}
                  placeholder="Type to filter products"
                />
              </div>
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={newProductQuantity}
                  onChange={(e) => setNewProductQuantity(parseInt(e.target.value))}
                />
              </div>
              <div className="max-h-60 overflow-auto">
                {filteredProducts.map(product => (
                  <div key={product.id} className="flex justify-between items-center py-2">
                    <span>{product.name} - ${product.price.toFixed(2)}</span>
                    <Button onClick={() => handleAddProduct(product)}>Add</Button>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Card>
          <CardHeader>
            <CardTitle>Order Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>${(product.quantity * product.price).toFixed(2)}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleRemoveProduct(product.id)} size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-end">
          <Button size="lg" disabled={!selectedUser || products.length === 0} className="bg-violet-600 text-white hover:bg-violet-700">
            Create Order
          </Button>
        </div>
      </>
  )
}