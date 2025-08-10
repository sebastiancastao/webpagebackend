# Request

```sh
### findAll
GET http://localhost:3000/api/projects/user/findAll
?dateFrom=2025-05-18
&dateTo=2025-08-20
&sortDate=DESC
&search=
&limit=10
&page=1
```

# Response

```js
async findAll() {
  const results = await this.repo.find();
  return {
    page: 1,
    totalPages: 1,
    totalItems: 1,
    hasMore: false,
    results,
  };
}


return {
  page,
  totalPages: Math.ceil(filteredResults.length / limit),
  totalItems: filteredResults.length,
  hasMore: false,
  results: paginatedResults,
};
```
