# Waste Management Backend API

A robust Node.js backend API for managing truck entries, waste distributions, and generating daily operational summaries for waste management facilities. Built with Express and MySQL, this API is designed for scalability, reliability, and ease of integration.

---

## 🚀 Features

- **Truck Entry Management:** Add, update, and delete truck entries with detailed waste distribution.
- **Daily Summaries:** Generate daily waste collection summaries, including breakdowns by waste type.
- **Truck History:** Retrieve historical entry data for individual trucks.
- **Master Data Endpoints:** List all registered trucks and waste types.
- **Transactional Integrity:** All critical operations are wrapped in database transactions for data consistency.

---

## 📦 API Endpoints

| Method | Endpoint                               | Description                        |
|--------|----------------------------------------|------------------------------------|
| POST   | `/truck-entry`                         | Add a new truck entry              |
| PUT    | `/truck-entry/:id`                     | Update an existing truck entry     |
| DELETE | `/truck-entry/:id`                     | Delete a truck entry               |
| GET    | `/daily-summary?date=YYYY-MM-DD`       | Get daily waste summary            |
| GET    | `/truck-history/:number`               | Get entry history for a truck      |
| GET    | `/trucks`                              | List all trucks                    |
| GET    | `/waste-types`                         | List all waste types               |

---

## 🗄️ Database Structure

- **trucks**: Truck registration details.
- **truck_entries**: Each truck's entry and total weight.
- **waste_types**: Types of waste handled.
- **waste_distributions**: Waste breakdown per truck entry.

---

## ⚡ Quick Start

1. **Clone the repository**
   ```sh
   git clone <your-repo-url>
   cd <project-folder>
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure the database**
   - Edit `models/db.js` with your MySQL credentials.

4. **Run the server**
   ```sh
   npm start
   ```

---

## 📋 Example: Add Truck Entry

```json
POST /truck-entry
{
  "truck_number": "MH12AB1234",
  "total_weight": 1500,
  "waste_distribution": [
    { "type": "Plastic", "weight": 500 },
    { "type": "Organic", "weight": 1000 }
  ]
}
```

---

## 🛡️ Best Practices

- All write operations use transactions for data integrity.x
- Consistent error handling with meaningful HTTP status codes.
- Modular controller structure for maintainability.
- Designed for easy extension and integration.

---


