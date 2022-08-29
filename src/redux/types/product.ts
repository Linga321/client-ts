import { Category } from "./category"
export interface Product{
    _id: string,
    title: string
    description: string
    discount: number
    price: number
    quantity: number
    categoryId: string[]
    imagesId: string[]
}
export interface Review{
    _id: string,
    userId: string
    productId: string
    rate: 1 | 2 | 3 | 4 | 5
    comment: string
    reviewState?: 'approved' | 'suspend'
    createdAt?: Date
    updatedAt?: Date
}

