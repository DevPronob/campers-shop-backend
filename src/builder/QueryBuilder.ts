import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    search(searchableFields: string[]) {
        const searchTerm = this?.query?.searchTerm;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map(
                    (field) =>
                        ({
                            [field]: { $regex: searchTerm, $options: 'i' },
                        }) as FilterQuery<T>,
                ),
            });
        }

        return this;
    }

    filter() {
        const queryObj = { ...this.query }; // Copy query object

        // Filtering out unwanted fields
        const excludeFields = ['searchTerm', 'sort'];
        excludeFields.forEach(el => delete queryObj[el]);

        // Handle price range filtering if defined
        const priceFilter:any = {};
        if (queryObj.minPrice !== undefined) {
            priceFilter.$gte = queryObj.minPrice;
            delete queryObj.minPrice;
        }
        if (queryObj.maxPrice !== undefined) {
            priceFilter.$lte = queryObj.maxPrice;
            delete queryObj.maxPrice;
        }

        if (Object.keys(priceFilter).length > 0) {
            queryObj.price = priceFilter;
        }

        this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
        return this;
    }
    sort() {
        const sort =
            (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort as string);

        return this;
    }

    // paginate() {
    //     const page = Number(this?.query?.page) || 1;
    //     const limit = Number(this?.query?.limit) || 10;
    //     const skip = (page - 1) * limit;

    //     this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    //     return this;
    // }


}

export default QueryBuilder;