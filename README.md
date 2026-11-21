# Giga Client

# Build a Premium Client Mobile Application – Giga Group

Act as a Senior UI/UX Designer, Mobile Application Architect and Frontend Developer.

I want you to design and develop a complete, high-fidelity mobile application UI prototype for **Giga Group**, a real estate and investment organization.

This application is exclusively for Giga Group clients, investors and customers. It will allow clients to access their investment information, track payments, monitor approval processes, submit queries and communicate with Giga Group.

**IMPORTANT: Build ONLY the Client Mobile Application.**

Do not build:
- Employee mobile application.
- Head of Department dashboard.
- Central Admin dashboard.
- ERP management system.
- Internal departmental management interfaces.

The objective is to create a modern, premium and professional mobile app that demonstrates how clients will interact with Giga Group.

---

# 1. DESIGN DIRECTION

Create a premium corporate mobile application with a modern fintech and real estate platform aesthetic.

Design characteristics:

- Professional, elegant and minimal UI.
- Premium corporate appearance.
- Clean layouts with excellent spacing.
- Modern typography.
- Rounded cards with subtle shadows.
- Smooth transitions and micro-interactions.
- Clean icons and intuitive navigation.
- Clear visual hierarchy.
- Consistent colors and components throughout the application.

### Brand color palette

Use the following colors:

- Primary Navy: #102A43
- Dark Navy: #0B1F33
- Teal: #16B8A6
- Light Background: #F5F8FA
- White: #FFFFFF
- Primary Text: #263746
- Secondary Text: #788895
- Success: #16A36A
- Warning: #E9A23B
- Error: #DC5555

Use navy as the primary brand color and teal for important actions, active states and highlights.

The design should feel like a premium banking or investment management application.

Avoid excessive gradients, unnecessary animations, oversized text and cluttered dashboards.

### Mobile-first requirements

- Design primarily for iPhone and Android mobile screens.
- Use a consistent mobile viewport around 390 × 844 pixels.
- Support responsive layouts for different mobile screen sizes.
- Use proper safe areas and bottom navigation spacing.
- Make all buttons, cards, menus and navigation elements functional.

---

# 2. APPLICATION STRUCTURE

Build the following screens and modules.

## A. Splash Screen and Welcome Screen

Create a branded splash screen using the Giga Group identity.

Include:
- Giga Group logo placeholder.
- Application name: Giga Group.
- Tagline: Your Investment. Your Information. Complete Transparency.
- Subtle loading animation.

After the splash screen, display a welcome screen with:

- Welcome to Giga Group.
- A short introduction about accessing investment information and managing client requests.
- Sign In button.
- Create Account button.

Include a premium illustration or abstract real estate visual.

## B. Client Registration and Login

Create a complete onboarding experience.

### Registration Screen

Fields:
- Full Name.
- Email Address.
- Password.
- Confirm Password.

Include:
- Terms and Conditions acceptance.
- Create Account button.
- Existing user login link.

### Login Screen

Fields:
- Email Address.
- Password.

Additional elements:
- Remember Me.
- Forgot Password.
- Sign In button.
- Create Account link.
- Password visibility toggle.

Keep the forms clean, modern and easy to use.

## C. CNIC and Facial Verification

After registration, guide the client through identity verification.

Create a multi-step verification experience.

### Step 1: CNIC Information

Fields:
- CNIC Number.
- Upload Front Side of CNIC.
- Upload Back Side of CNIC.

### Step 2: Facial Verification

Create a visual facial verification screen with:

- Camera preview placeholder.
- Face positioning guide.
- Instructions to position the face.
- Start Verification button.
- Verification progress animation.

This is a UI prototype only. Do not implement actual biometric verification or claim to verify a real identity.

### Step 3: Verification Status

Create a verification status screen displaying:

- Verification Pending.
- Verification Submitted.
- Identity Verified.
- Verification Requires Attention.

Use suitable visual indicators for each state.

### Important distinction

Identity verification and account activation are two separate processes.

After identity verification, the client's account must go through a separate Giga Group account review and approval process before full access is activated.

Show these as separate steps in the onboarding journey.

## D. Client Home Dashboard

This is the most important screen.

Create a premium, informative dashboard that provides an overview of the client's investment and account.

### Header

- Giga Group logo.
- Personalized greeting: Good Morning, Ahmed.
- Notification bell.
- Client profile avatar.

### Account Overview Card

Display:

- Total Investment.
- Total Amount Paid.
- Outstanding Balance.
- Next Installment Due.

Use visually appealing financial summary cards.

### Project Information

Display the client's associated project information.

Include:
- Project Name.
- Project location.
- Account or investment reference.
- Total investment amount.

Use a premium property image placeholder.

### Payment Overview

Show:
- Paid Installments.
- Pending Installments.
- Upcoming Installments.
- Overdue Installments.

Use a clean visual progress indicator.

### Recent Activity

Display recent account activities, such as:

- Payment receipt submitted.
- Payment verification completed.
- Query updated.
- Approval status changed.

### Quick Actions

Create visually attractive shortcut cards:

1. My Payments.
2. Account Statement.
3. Track Approvals.
4. Submit a Query.

Make every shortcut clickable.

## E. My Investments / Project Details

Create a dedicated screen showing the client's investment and project information.

Include:

- Project Name.
- Project Image.
- Project Location.
- Investment Reference Number.
- Total Investment Amount.
- Booking or Account Details.
- Associated Payment Plan.

Provide a clean and professional project detail layout.

If multiple project accounts are demonstrated, make it clear that they are illustrative demo records.

## F. Financial Transparency – Payments

This is one of the most important modules.

Create a dedicated financial management section.

### Financial Overview

Display:
- Total Investment Amount.
- Total Payments Received.
- Remaining Balance.
- Next Installment.
- Payment Progress Percentage.

### Installment Schedule

Create a well-designed installment list or table containing:

- Installment Number.
- Due Date.
- Installment Amount.
- Payment Date.
- Payment Status.

Use separate visual status indicators:

- Paid – Green.
- Pending – Orange.
- Upcoming – Blue.
- Overdue – Red.

Allow clients to filter installments by status.

### Payment Details

When a client taps an installment, open a detailed screen showing:

- Installment Reference.
- Amount.
- Due Date.
- Payment Date.
- Verification Status.
- Related Receipt.

### Payment Receipt Screen

Allow clients to:

- View available payment receipts.
- Preview receipt documents.
- View payment verification status.
- Check the date and amount of submitted receipts.

### Account Statement

Create an account statement screen showing the complete payment history.

Include:
- Transaction Date.
- Description.
- Reference Number.
- Debit/Credit information where applicable.
- Amount.
- Running Balance where source data supports it.

Include a Download Statement UI action with a simulated downloadable sample.

IMPORTANT: The initial project scope is financial transparency and displaying existing payment records. Do not add an online payment gateway, payment checkout or actual payment processing.

## G. Approval Tracking

Create a dedicated Approval Tracking module.

The client must be able to understand where their submitted request is currently located in the internal approval process.

Use a modern vertical timeline design.

Display:

- Request Reference Number.
- Request Type.
- Submission Date.
- Current Status.
- Current Responsible Department or Stage.
- Completed Approval Stages.
- Pending Approval Stages.
- Last Updated Date and Time.

Example timeline:

1. Request Submitted – Completed.
2. Initial Review – Completed.
3. Finance Review – Completed.
4. Management Approval – In Progress.
5. Final Approval – Pending.

Make the active stage visually prominent.

Include a status summary card at the top.

Important: These stages are illustrative only. Make the workflow presentation adaptable because actual approval stages and responsible departments will be confirmed by Giga Group.

## H. Client Inbox and Query Management

Build a complete client communication module.

### Inbox Screen

Display a list of client queries.

Each query card should show:

- Query Reference Number.
- Query Subject.
- Related Project.
- Last Message.
- Last Updated Date.
- Query Status.

Use status indicators:

- New.
- In Progress.
- Awaiting Response.
- Resolved.
- Closed.

### Submit New Query

Create a professional query submission form.

Fields:

- Query Subject.
- Query Type.
- Related Project or Account.
- Query Description.
- Upload Attachments.

Allow uploading images and documents in the UI prototype.

Include a Submit Query button.

After submission, generate an illustrative reference number and show a successful submission confirmation.

### Query Conversation Screen

This is an important screen.

Design it like a modern messaging interface.

Include:

- Query reference number.
- Query subject.
- Current status.
- Assigned Giga Group representative.
- Message bubbles.
- Message timestamps.
- Attachment previews.
- Text input field.
- Send button.
- Attachment button.

The client should be able to communicate with the assigned Giga Group employee within the query conversation.

Show only client-visible messages and updates.

Never show internal employee notes, internal departmental remarks or management-only information to the client.

## I. Notifications

Create an in-app notification center.

Notifications should cover:

- New query responses.
- Query status changes.
- Payment verification updates.
- Approval progress updates.
- Upcoming installment reminders.
- Account verification updates.

Each notification should contain:
- Notification title.
- Short description.
- Date and time.
- Read/unread state.

Allow the client to open the relevant module by tapping a notification.

## J. Client Profile and Settings

Create a profile screen displaying:

- Profile Picture.
- Full Name.
- Email Address.
- CNIC Number (masked).
- Account Reference.
- Identity Verification Status.
- Account Activation Status.

Settings:
- Edit Profile.
- Change Password.
- Notification Preferences.
- Privacy Policy.
- Terms and Conditions.
- Contact Support.
- Sign Out.

Do not expose complete sensitive identity information unnecessarily.

---

# 3. BOTTOM NAVIGATION

Use a modern fixed bottom navigation bar with five main sections:

1. Home.
2. My Account.
3. Approvals.
4. Inbox.
5. Profile.

Use clean line icons and clear active/inactive states.

The notifications bell should remain accessible from the main header.

---

# 4. USER EXPERIENCE AND INTERACTIONS

Do not create a static design.

Build a clickable, interactive frontend prototype.

The following interactions must work:

- Navigate between all main sections.
- Open project/account details.
- Open installment details.
- View receipt previews.
- Filter payment records.
- Open approval timelines.
- Open existing queries.
- Submit new queries.
- Send simulated messages.
- Attach sample files in the query form.
- Open notifications.
- Update basic profile fields.
- Navigate through the registration and verification journey.
- Demonstrate the difference between identity verification and account activation.

Use mock data and local frontend state to simulate these actions.

No real backend, ERP integration, authentication provider, facial recognition provider or payment gateway is required at this stage.

All information must be fictional demonstration data, not actual client information.

---

# 5. SAMPLE DATA

Use realistic fictional Giga Group demonstration records.

Example client:

Name: Ahmed Khan  
Email: ahmed@example.com  
Project: Giga Residential Project  
Account Reference: GG-2026-00125  
Total Investment: PKR 5,000,000  
Amount Paid: PKR 2,000,000  
Outstanding Balance: PKR 3,000,000  

Example installment schedule:

- Installment 01 – Paid.
- Installment 02 – Paid.
- Installment 03 – Pending.
- Installment 04 – Upcoming.
- Installment 05 – Overdue.

Example query:

Reference: GG-QRY-2026-0012  
Subject: March Installment Receipt Verification  
Department: Finance  
Status: In Progress.

Example approval:

Reference: GG-APR-2026-0021  
Request: Account Documentation Approval  
Current Stage: Finance Review.

All these values are illustrative sample data and should be easy to replace later.

---

# 6. DESIGN QUALITY EXPECTATIONS

Pay particular attention to these areas:

1. The Home Dashboard must look premium and provide a clear financial overview.
2. The Payments module must look like a professional banking application.
3. The Approval Tracking module must have an easy-to-understand progress timeline.
4. The Inbox must provide a polished messaging experience.
5. The Project Details section must have a premium real estate presentation.
6. The Registration and Identity Verification screens must feel secure and trustworthy.
7. Maintain consistent typography, spacing, colors, card styles and icons throughout the app.

Use high-quality visual assets where appropriate.

Avoid generic template-like screens.

Do not overcrowd the interface with too many cards or unnecessary charts.

Prioritize clarity, ease of use and client transparency.

---

# 7. FINAL DELIVERABLE

Build a complete mobile-first, high-fidelity Giga Group Client Mobile Application prototype.

The output should include all the screens and functional navigation described above.

The application should be visually impressive enough to present to Giga Group management and department heads for feedback before actual development.

Start by establishing the global design system and reusable components, then build all screens and connect their interactions.

**Final priority: A premium, realistic, fully navigable CLIENT MOBILE APP UI prototype—not an admin panel, not an employee application, and not a backend implementation.**

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://giga-client.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8a242a22-9c4c-4f67-badc-113ff9b13c3e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
