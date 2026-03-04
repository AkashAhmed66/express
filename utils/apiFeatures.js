/*
  This is the pagination guide
  - page = 1 ---- the page number to retrieve (default: 1)
  - sort = field1,-field2 ---- sort by field1 ascending and field2 descending
  - limit = 10 ---- the number of items per page (default: 10)
  - fields = field1,field2 ---- select only specific fields
  - search = keyword ---- search for keyword in specified fields
  - searchFields = field1,field2 ---- specify which fields to search in (default: name,email for users)
*/
class ApiFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields', 'search', 'searchFields'];
        excludedFields.forEach(el => delete queryObj[el]);

        // Advanced filtering (gte, gt, lte, lt)
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        const parsedQuery = JSON.parse(queryStr);
        
        // Merge conditions with existing query using .where()
        if (Object.keys(parsedQuery).length > 0) {
            Object.keys(parsedQuery).forEach(key => {
                this.query = this.query.where(key).equals(parsedQuery[key]);
            });
        }
        
        return this;
    }

    search(defaultFields = []) {
        if (this.queryString.search) {
            const keyword = this.queryString.search;
            
            // Use searchFields from query if provided, otherwise use default fields
            let fields = defaultFields;
            if (this.queryString.searchFields) {
                fields = this.queryString.searchFields.split(',').map(f => f.trim());
            }
            
            // Only search if fields are specified
            if (fields.length > 0) {
                const searchQuery = {
                    $or: fields.map(field => ({
                        [field]: { $regex: keyword, $options: 'i' }
                    }))
                };

                // Merge search conditions with existing query using .where()
                this.query = this.query.where(searchQuery);
            }
        }
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }
        return this;
    }

    paginate() {
        const page = parseInt(this.queryString.page) || 1;
        const limit = parseInt(this.queryString.limit) || 10;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        this.page = page;
        this.limit = limit;

        return this;
    }

    async execute() {
        return await this.query;
    }
}

module.exports = ApiFeatures;
