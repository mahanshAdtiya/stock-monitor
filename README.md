# Stock Monitoring Platform

## Overview
This project is a stock monitoring platform that allows users to create and manage watchlists and display the latest stock prices. It is built using React, TypeScript, Material UI for the frontend, and Django for the backend. The platform integrates with Alpha Vantage to fetch stock data.

## Features
- **User Authentication**
- **Personalized Watchlists**
- **Real-time Stock Price Updates**
- **Concurrent User Handling**

## Technologies Used
- **Frontend:** React Vite, TypeScript, Material UI
- **Backend:** Django (Python)
- **Database:** SQLite
- **Stock Data API:** [Alpha Vantage](https://www.alphavantage.co)

## Setup Instructions

### Prerequisites
- **Node.js**
- **Python 3**
- **Virtualenv (Python)**

### Clone the Repository
```bash
git clone https://github.com/yourusername/stock-monitoring-platform.git
cd stock-monitoring-platform
```
### Client Setup 
-#1. Navigate to client directory :
``` bash
cd  stock-monitoring-platform/client
```
-#2. Install dependencies:
``` bash
npm install
```
-#3. Start the project:
``` bash
npm run dev
```

### Server Setup 
-#1. Create a virtual environment:
-- # MacOs/Linux:
``` bash
python3 -m venv myenv
source myenv/bin/activate
```
--# Windows : 
``` bash
python -m venv myenv
.\myenv\Scripts\activate

```