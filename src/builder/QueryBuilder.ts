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
        const queryObj = { ...this.query };
        const excludeFields = ['searchTerm', 'sort'];
        excludeFields.forEach(el => delete queryObj[el]);
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


}

export default QueryBuilder;