export const faqItems = [
    {
        id: 'faq1',
        question: "How does the system measure electricity usage per room?",
        answer: "Our IoT device connects to each room's circuit, tracking consumption via precision sensors (voltage/current) and transmitting data to your dashboard every 30 seconds.",
        isOpen: true
    },
    {
        id: 'faq2',
        question: "Can tenants access their usage data?",
        answer: "This provides 24/7 access to: Real-time power consumption graphs, Daily/weekly/monthly usage breakdowns, Comparative analytics showing their usage patterns, Projected billing estimates, and Customizable alerts when approaching consumption thresholds.",
        isOpen: true
    },
    {
        id: 'faq3',
        question: "What if a device fails? will it affect the system?",
        answer: "Our warranty coverage includes: Complete hardware replacement within 48 hours of failure detection (including free shipping and reinstallation). Advanced failure prediction - the system alerts our team about potential issues before they occur.",
        isOpen: false
    },
    {
        id: 'faq4',
        question: "Does it work with solar/generators?",
        answer: "The system fully supports alternative power sources: For solar systems, we measure both grid import and solar generation separately. Generator usage is tracked with fuel cost calculations. Our advanced analytics can: Compare solar self-consumption vs grid dependency, Calculate ROI on renewable energy investments.",
        isOpen: false
    }
];