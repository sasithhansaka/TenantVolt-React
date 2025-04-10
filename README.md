# IoT-Based Real-Time Electricity Monitoring System for Boarding Houses

This project aims to develop an IoT-based system that enables boarding house owners to monitor real-time electricity consumption for each room, facilitating transparent billing and efficient energy management.

## Project Overview

Boarding house owners often face challenges in monitoring individual tenants' electricity usage, leading to potential financial losses and disputes. This project addresses these issues by implementing an IoT-based electricity monitoring system that provides real-time consumption data for each room through a web interface.

Designed with usability and scalability in mind, this frontend connects seamlessly to the backend and IoT devices, ensuring efficient electricity management.

---

## Features

- **Real-Time Monitoring**: Track electricity consumption for each room in real-time.
- **Tenant Billing**: Generate and send automated monthly bills to tenants via email.
- **Device Management**: Purchase and track IoT devices through the platform.
- **Secure Data Transmission**: Ensure secure communication between IoT devices and the web interface.
- **User Authentication**: Secure login for owners and tenants.

---

## Tech Stack
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![ESP32](https://img.shields.io/badge/ESP32-000000?style=for-the-badge&logo=espressif&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

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

