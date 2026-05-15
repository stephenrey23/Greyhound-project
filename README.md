Greyhound Booking Automation Project
Project Overview
This project is an End-to-End (E2E) automation framework designed to validate the booking flow on the Greyhound official website. It focuses on stability, network efficiency, and professional testing patterns using Cypress.

Key Technical Features
1. Network Interception and API Mocking
The framework utilizes cy.intercept to manage asynchronous behavior and external dependencies:

City Search: Monitors GET requests to the FlixBus autocomplete API to ensure the application only interacts with the UI once the backend data is ready.

Payment Mocking: To allow full flow execution without a real credit card, the project intercepts the POST request to the payment gateway, returning a simulated 200 OK success response.

2. Robust Selector Strategy
Following industry best practices, the framework prioritizes selection through dedicated testing attributes:

data-e2e: Used for critical actions like the search button.

data-testid: Used for passenger information and trip selection.

This approach ensures the tests remain resilient to changes in CSS classes or dynamic IDs.

3. Custom Commands
Repetitive or complex logic has been abstracted into custom Cypress commands located in support/commands.js:

handlePrivacyBanner: Manages the initial cookie/consent overlay.

clickWithoutNewTab: Manipulates the DOM to prevent links from opening in secondary browser tabs, ensuring Cypress maintains control of the session.

4. Data-Driven Testing
Test parameters such as origin, destination, and travel dates are decoupled from the code and stored in JSON fixtures (fixtures/tripData.json), making the suite easily configurable.

Project Structure
cypress/e2e/: Contains the main test files.

cypress/fixtures/: Stores static data for testing.

cypress/support/: Includes custom commands and global configurations.

Prerequisites
Node.js (Latest stable version)

Cypress

Installation and Execution
Clone the repository or download the source code.

Install dependencies:
npm install

Open the Cypress Test Runner:
npx cypress open

Run the spec: greyhound.cy.js
