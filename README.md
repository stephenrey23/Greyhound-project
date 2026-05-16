# Greyhound.com - Advanced Automation & Network Interception Case Study

## 📌 Project Overview
This project targets a highly dynamic, live enterprise production environment (Greyhound.com). The goal was to build an automated workflow utilizing Cypress and JavaScript to handle asynchronous elements, complex DOM structures, and live network requests.

## 🛠️ Technical Challenges & Engineering Insights
Working on a live production site presents real-world constraints that you don't encounter in sandbox testing environments. 

### 1. Dynamic Element Handling
The platform relies heavily on dynamic element rendering and complex session states. I implemented strategic wait strategies and conditional assertions to bypass traditional automation flakiness.

### 2. Network Interception (`cy.intercept()`)
To handle live search results and flight/bus schedule matrices, the suite leverages advanced network interception to monitor internal API responses, ensuring data consistency before executing UI interactions.

## 🧠 Key Takeaways
While automating live public sites poses strict boundary limitations (such as aggressive firewalls and rate-limiting anti-bot measures), this project served as an invaluable deep-dive into:
- Advanced asynchronous behavior in Cypress.
- Inspecting network payloads and handling API intercepts.
- Debugging complex, nested DOM trees under production constraints.

*Note: This repository is preserved as a technical case study demonstrating advanced troubleshooting, adaptation, and network-level testing logic.*
