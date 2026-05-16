# Greyhound.com - Advanced Automation & Network Interception Case Study

## 📌 Project Overview
This repository features an advanced automated End-to-End (E2E) workflow targeting a highly secure, live enterprise production environment (Greyhound.com). The suite uses Cypress and JavaScript to successfully navigate aggressive anti-bot firewalls, asynchronous UI rendering, and dynamic transactional layers.

## 🛠️ Technical Challenges & Engineering Insights
Automating against a live public platform requires techniques far beyond standard sandbox testing. This case study highlights three engineering solutions implemented to achieve a stable execution pipeline:

### 1. Anti-Bot & Firewall Evasion (WAF Bypass)
Enterprise platforms block automated drivers out-of-the-box. To bypass these security layers without official API tokens or testing environments, the framework implements custom browser configurations:
- **User-Agent Spoofing:** Mimics real user interaction payloads.
- **Webdriver Obfuscation:** Programmatically overwrites `navigator.webdriver` to `false` in the browser context prior to page load, effectively hiding the Cypress automation footprint from Cloudflare/Akamai detection.

### 2. Strategic Network Interception & Payment Mocking
Instead of relying strictly on full E2E production database writes, the suite leverages `cy.intercept()` for two distinct architectural needs:
- **Asynchronous Syncing:** Monitors internal API gateways (`**/search/autocomplete/cities*`) to explicitly synchronize UI typing actions with server-side autocomplete results.
- **Service Virtualization (Mocking):** Intercepts outbound checkout payment endpoints (`POST **/checkout/payment*`) to return a synthetic `200 OK` success payload, preventing unwanted financial transactions while verifying client-side form completion.

### 3. Resilient Dynamic UI Strategies
- **Dynamic Date Matrix:** Features automated date calculations relative to the current timestamp ($T + X$ days) to interact with calendar elements dynamically, removing hardcoded state expirations.
- **Conditional Asynchronous Hooks:** Utilizes custom conditional commands (`cy.handlePrivacyBanner()`) to automatically evaluate and dismiss cookie compliance layouts only if they interrupt the execution thread.

## 🧠 Key Takeaways
This project represents a highly effective deep-dive into production-level automation constraints. It demonstrates mastery over:
- Advanced asynchronous behaviors and explicit synchronization.
- Network payload manipulation and mocking techniques.
- Bypassing production infrastructure blocks securely and ethically.

*Note: This repository is preserved exclusively as a technical case study demonstrating advanced troubleshooting, adaptation, and network-level testing logic.*
