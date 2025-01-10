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
import {createClient} from "@/utils/supabase/client";

type Product = {
  product_id: number,
  name: string,
  price: number,
  stock: number,
  reserved: number,
  quantity: number,
}

type User = {
  client_id: number,
  name: string,
  nip: string,
}

type Address = {
  address_id: number,
  apartment_number: string | null,
  home_number: string,
  place: string,
  street: string | null,
  zip: string,
}

interface CreateOrderProps {
  clients: [User],
  productsList: [Product]
}

export function CreateOrder({clients, productsList}: CreateOrderProps) {
  productsList.map(product => product.quantity = 0)

  const supabase = createClient();
  const [products, setProducts] = useState<Product[]>([])
  const [users, setUsers] = useState(clients)
  const [addresses, setAddresses] = useState<Address[] | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
  const [newUser, setNewUser] = useState<Omit<User, 'client_id'>>({name: '', nip: ''})
  const [newAddress, setNewAddress] = useState<Omit<Address, 'address_id'>>({ apartment_number: null, home_number: '', place: '', street: null, zip: '' })
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [filterTerm, setFilterTerm] = useState('')
  const [newProductQuantity, setNewProductQuantity] = useState(1)
  const [email, setEmail] = useState("")

  const totalValue = products.reduce((sum, product) => sum + product.quantity * product.price, 0)

  const filteredProducts = productsList.filter(product =>
    product.name.toLowerCase().includes(filterTerm.toLowerCase())
  )

  const handleAddProduct = (product: typeof productsList[0]) => {
    const existingProduct = products.find(p => p.product_id === product.product_id)
    if (existingProduct) {
      setProducts(products.map(p =>
        p.product_id === product.product_id ? {...p,
          quantity: p.quantity+newProductQuantity>p.stock-p.reserved?p.stock-p.reserved:p.quantity + newProductQuantity}
          : p
      ))
    } else {
      setProducts([...products, {...product, quantity: newProductQuantity>product.stock-product.reserved?product.stock-product.reserved:newProductQuantity}])
    }
    setIsAddingProduct(false)
    setFilterTerm('')
    setNewProductQuantity(1)
  }

  const handleRemoveProduct = (productId: number) => {
    setProducts(products.filter(product => product.product_id !== productId))
  }

  const handleCreateUser = async () => {
    const result = await fetch('/auth/create', {
      method: 'POST',
      body: JSON.stringify({email: email, password: newUser.nip})
    })

    if (!result.ok) {
      console.error('Failed to create user')
      return
    }

    result.json().then(async data => {
      console.log(data)
      const {data: user, error} = await supabase.from('clients').insert([{name: newUser.name, nip: newUser.nip, auth_id: data.id}]).select('client_id').single()

      if (error) {
        console.error(error)
        return
      }

      const createdUser = {client_id: user.client_id, ...newUser}
      setUsers([...users, createdUser])
      setSelectedUser(createdUser)
      setNewUser({name: '', nip: ''})
      setEmail('')
    })
  }

  const handleSelectUser = (value:string) => {
    setSelectedUser(value ? users.find(u => u.client_id === parseInt(value)) || null : null)
    supabase.from('klient_all_addresses_view').select().eq('client_id', parseInt(value)).then(({data}) => setAddresses(data))
    setSelectedAddress(addresses?.find(u => u.address_id === parseInt(value)) || null)
  }

  const handleCreateAddress = async () => {
    if (!selectedUser) {
      console.error('AGRRR! NO USER SELECTED');
      return
    }

    const {data, error} = await supabase.rpc('create_address', {
      ...newAddress,
      client_id: selectedUser.client_id,
    })

    if (error) {
      console.error(error);
      return
    }

    const createdAddress = {...newAddress, address_id: data}
    setAddresses([...addresses, createdAddress])
    setSelectedAddress(createdAddress)
    setNewAddress({ apartment_number: '', home_number: '', place: '', street: '', zip: '' })
    setNewAddress({ apartment_number: null, home_number: '', place: '', street: null, zip: '' })
  }

  const handleCreateOrder = async () => {
    if (!selectedUser || !selectedAddress) {
      console.error('AGRRR! NO USER OR ADDRESS SELECTED');
      return
    }

    const {error} = await supabase.rpc('create_order', {
      o_client_id: selectedUser.client_id,
      o_address_id: selectedAddress.address_id,
      products: [
        ...products.map(product => ({
          product_id: product.product_id,
          count: product.quantity,
          price: product.price,
        })),
      ],
    });
    if (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Order</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="user-select">Select Existing Customer</Label>
                <Select
                  value={selectedUser?.client_id.toString()}
                  onValueChange={handleSelectUser}>
                  <SelectTrigger id="user-select">
                    <SelectValue placeholder="Select a customer"/>
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.client_id} value={user.client_id.toString()}>{user.name}</SelectItem>
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
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-user-nip">NIP</Label>
                    <Input
                      id="new-user-nip"
                      value={newUser.nip}
                      onChange={(e) => setNewUser({...newUser, nip: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-email">email</Label>
                    <Input
                      id="new-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <Button onClick={handleCreateUser} className="mt-4 bg-violet-600 text-white hover:bg-violet-700">Create
                  Customer</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Address Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="address-select">Select Existing Address</Label>
                <Select
                  value={selectedAddress?.address_id.toString()}
                  onValueChange={(value) => setSelectedAddress(addresses?.find(u => u.address_id === parseInt(value)) || null)}>
                  <SelectTrigger id="address-select">
                    {
                      addresses?(
                        <SelectValue placeholder="Select an address"/>
                      ):<SelectValue placeholder="No addresses found"/>
                    }
                  </SelectTrigger>
                  {
                    addresses?(
                      <SelectContent>
                        {addresses?.map((address) => (
                          <SelectItem key={address.address_id} value={address.address_id.toString()}>{address.zip} {address.place} {address.street ? address.street + " " : ""}{address.home_number}{address.apartment_number ? "/" + address.apartment_number : ""}</SelectItem>
                        ))}
                      </SelectContent>
                    ):<></>
                  }
                </Select>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Or Create New Address</h3>
                <div className="space-y-2">
                  <div>
                    <Label htmlFor="new-zip">ZIP</Label>
                    <Input
                      id="new-zip"
                      value={newAddress.zip}
                      onChange={(e) => setNewAddress({...newAddress, zip: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-place">City</Label>
                    <Input
                      id="new-place"
                      value={newAddress.place}
                      onChange={(e) => setNewAddress({...newAddress, place: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-street">Street</Label>
                    <Input
                      id="new-street"
                      value={newAddress.street}
                      onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-home_number">Home Number</Label>
                    <Input
                      id="new-home_number"
                      value={newAddress.home_number}
                      onChange={(e) => setNewAddress({...newAddress, home_number: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-apartment_number">Apartment Number</Label>
                    <Input
                      id="new-apartment_number"
                      value={newAddress.apartment_number}
                      onChange={(e) => setNewAddress({...newAddress, apartment_number: e.target.value})}
                    />
                  </div>
                </div>
                <Button onClick={handleCreateAddress} className="mt-4 bg-violet-600 text-white hover:bg-violet-700">Create
                  Address</Button>
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
                <p>NIP: {selectedUser.nip}</p>
              </div>
            )}
            {selectedAddress && (
              <div className="mb-4">
                <h3 className="font-semibold">Selected Address:</h3>
                <p>{selectedAddress.street ? selectedAddress.street + " " : ""}{selectedAddress.home_number}{selectedAddress.apartment_number ? "/" + selectedAddress.apartment_number : ""}</p>
                <p>{selectedAddress.zip} {selectedAddress.place}</p>
              </div>
            )}
            <div className="text-xl font-bold mb-4">Total Order Value: {totalValue.toFixed(2)}zł</div>
            <div className="flex justify-center">
              <Button onClick={() => setIsAddingProduct(true)} className="bg-violet-600 text-white hover:bg-violet-700">
                <Plus className="mr-2 h-4 w-4"/> Add Product
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
                <div key={product.product_id} className="flex justify-between items-center py-2">
                  <span>{product.name} - {product.stock-product.reserved} - {product.price.toFixed(2)}zł</span>
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
                <TableRow key={product.product_id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.price.toFixed(2)}zł</TableCell>
                  <TableCell>{(product.quantity * product.price).toFixed(2)}zł</TableCell>
                  <TableCell>
                    <Button onClick={() => handleRemoveProduct(product.product_id)} size="sm" variant="outline">
                      <Trash2 className="h-4 w-4"/>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-end">
        <Button size="lg" disabled={!selectedUser || products.length === 0}
                className="bg-violet-600 text-white hover:bg-violet-700"
                onClick={handleCreateOrder}>
          Create Order
        </Button>
      </div>
    </>
  )
}