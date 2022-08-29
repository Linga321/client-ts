export interface Category {
    _id: string,
    name: string,
    image: string
}

export interface CategoryList {
    categoryList: Category[]
    categoryFilterList: string[]
}