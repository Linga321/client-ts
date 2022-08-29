import { Product } from "./product"

export interface ProductCart{
    product: Product,
    quantity: number
}

export interface AllProductCart{
    _id?: string 
    userId: string
    products: [
      {
        productId: string
        itemQuantity: number
      }
    ]
    status?: 'Paid' | 'Pending' | 'Suspend'
    createdAt?: Date
    updatedAt?: Date
}
