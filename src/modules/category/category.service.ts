import { TCategory } from "./category.interface"
import { Category } from "./category.model"


const createCategoryIntoDb = (payload: TCategory) => {
    const result = Category.create(payload)
    return result
}


const getCategoryFromDb = () => {
    const result = Category.find({})
    return result
}

const getSingleCategoryFromDb = (id: String) => {
    const result = Category.find({ _id: id })
    return result
}





export const categoryService = {
    createCategoryIntoDb,
    getCategoryFromDb,
    getSingleCategoryFromDb
}