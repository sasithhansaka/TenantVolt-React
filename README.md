# IoT-Based Real-Time Electricity Monitoring System for Boarding Houses

This project aims to develop an IoT-based system that enables boarding house owners to monitor real-time electricity consumption for each room, facilitating transparent billing and efficient energy management.

## Project Overview

Boarding house owners often face challenges in monitoring individual tenants' electricity usage, leading to potential financial losses and disputes. This project addresses these issues by implementing an IoT-based electricity monitoring system that provides real-time consumption data for each room through a web interface.

---

## Features

- **Real-Time Monitoring**: Track electricity consumption for each room in real-time.
- **Tenant Billing**: Generate and send automated monthly bills to tenants via email.
- **Device Management**: Purchase and track IoT devices through the platform.
- **Secure Data Transmission**: Ensure secure communication between IoT devices and the web interface.
- **User Authentication**: Secure login for owners and tenants.

---

## Tech Stack

### IoT Device
- **ESP32**: Microcontroller with Wi-Fi capabilities.
- **Sensors**: Current and voltage sensors for measuring electricity consumption.

### Backend
- **Django**: Python-based web framework for building robust APIs and handling user authentication.
- **FastAPI**: Modern, fast web framework for building APIs with Python.

### Frontend
- **React.js with Vite**: JavaScript library for building user interfaces, bundled with Vite for enhanced performance.

### Database
- **Firebase**: Cloud-based platform for real-time data storage and synchronization.

---

## Installation

Follow the steps below to set up and run the project locally:

### Prerequisites
- **Node.js**: For frontend development.
- **Python 3.7+**: For backend development.
- **ESP32 Development Environment**: For IoT device programming.

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/RealChAuLa/TenantVoltAPI.git
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   git clone https://github.com/sasithhansaka/TenantVolt-React-Django.git
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

---

## License

This project is licensed under the MIT License.

