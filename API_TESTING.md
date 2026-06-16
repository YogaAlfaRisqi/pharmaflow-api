# API Product Catalog Testing Guide

## Base URL
```
http://localhost:3000/api/v1
```

## Endpoints yang Tersedia

### 1. Create Product (POST)
```
POST /api/v1/products

Body (JSON):
{
  "name": "Aspirin 500mg",
  "description": "Pain reliever and fever reducer",
  "sku": "ASP-500-001",
  "price": 5000,
  "quantity": 100,
  "category": "Pain Relief",
  "manufacturer": "PT Pharma Indonesia",
  "expiryDate": "2027-12-31",
  "batchNumber": "BATCH-2025-001"
}
```

### 2. Get All Products (GET)
```
GET /api/v1/products
```

### 3. Get Product by ID (GET)
```
GET /api/v1/products/1
```

### 4. Update Product (PATCH)
```
PATCH /api/v1/products/1

Body (JSON):
{
  "quantity": 50,
  "price": 4500
}
```

### 5. Delete Product (DELETE)
```
DELETE /api/v1/products/1
```

## Test dengan cURL

### Create Product
```bash
curl -X POST http://localhost:3000/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Aspirin 500mg",
    "description": "Pain reliever",
    "sku": "ASP-500-001",
    "price": 5000,
    "quantity": 100,
    "category": "Pain Relief",
    "manufacturer": "PT Pharma",
    "expiryDate": "2027-12-31",
    "batchNumber": "BATCH-2025-001"
  }'
```

### Get All Products
```bash
curl http://localhost:3000/api/v1/products
```

### Get Product by ID
```bash
curl http://localhost:3000/api/v1/products/1
```

### Update Product
```bash
curl -X PATCH http://localhost:3000/api/v1/products/1 \
  -H "Content-Type: application/json" \
  -d '{"quantity": 50}'
```

### Delete Product
```bash
curl -X DELETE http://localhost:3000/api/v1/products/1
```
