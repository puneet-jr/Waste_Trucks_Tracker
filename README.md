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

1. Add a Truck Entry:

http://localhost:5000/api/entry

--basic details in the body:
{
  "truck_number": "",
  "total_weight": ,
  "in_out": "in", // or "out"
  "waste_distribution": [
    { "type": "Plastic", "weight": 400 },
    { "type": "Organic", "weight": 600 }
  ]
}


2. Get Daily Waste Summary:

http://localhost:5000/api/summary/daily?date=YYYY-MM-DD

3. Get Truck Entry History:

http://localhost:5000/api/truck/MH12AB1234/history

4. List All Trucks:

http://localhost:5000/api/trucks

5. List All Waste Types:

http://localhost:5000/api/waste-types


6. Delete a Truck Entry:
http://localhost:5000/api/entry/1


7. Update a Truck Entry:
http://localhost:5000/api/entry/1

-- make changes in the data based on its id
{
  "total_weight": 1200,
  "in_out": "out", // or "in"
  "waste_distribution": [
    { "type": "Plastic", "weight": 500 },
    { "type": "Organic", "weight": 700 }
  ]
}


8. Get Last Out Entries for All Trucks:
http://localhost:5000/api/trucks/last-out

-- Returns the last "out" entry for each truck.

9. Mark the truck as out.

it is a put request.

http://localhost:5000/api/entry/123

10.  Check the Status of a Truck Entry


it is a get request.

http://localhost:5000/api/entry/123

11. List All "Out" Truck Entries
get request.

http://localhost:5000/api/entry?in_out=out

12. Get Total Gross and Waste Weights (all or by date):

GET request.

http://localhost:5000/api/weights/total
or
http://localhost:5000/api/weights/total?date=YYYY-MM-DD

Returns:
{
  "date": "YYYY-MM-DD" or "all",
  "total_gross_weight": 12345,
  "total_waste_weight": 9876
}

## 🛡️ Best Practices

- All write operations use transactions for data integrity.x
- Consistent error handling with meaningful HTTP status codes.
- Modular controller structure for maintainability.
- Designed for easy extension and integration.

---


