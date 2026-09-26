# Darwix AI - Real-Time Copilot Prototype

This project is a high-fidelity, interactive front-end prototype demonstrating a real-time AI Copilot designed for loan agents. Built with **Next.js**, **React**, **Tailwind CSS**, and **shadcn/ui**.

## What We Built

We designed and developed a fully functional UI flow that simulates an AI assistant listening to a live loan application call. The AI automatically captures profile data, flags compliance violations, and suggests actionable next steps in real-time.

### Key Achievements & Requirements Met

1. **Premium UI/UX Design**: 
   - Overhauled the entire application to use modern, premium design patterns (glassmorphism, subtle shadows, vibrant semantic colors, rounded components).
   - Designed 4 main views: The Agent Dashboard, the Manager Dashboard, the Live Meeting interface, and the Post-Meeting Summary.
2. **Interactive Simulated Engine**: 
   - Built a robust mock data engine that simulates a live transcription arriving message-by-message.
   - Added a **"Play Simulation"** feature that automatically pulls conversation events every 2.5 seconds to mimic a live call organically.
3. **Dynamic Customer Personas**:
   - The application dynamically serves different meeting scripts depending on the customer selected.
   - Example: Selecting *John & Sarah* triggers a first-time homebuyer script. Selecting *Mike Johnson* triggers a script tailored to a self-employed individual looking to refinance, complete with distinct AI interventions.
4. **Smart Scrolling & Layout Management**:
   - Fixed complex layout overflow issues to ensure the application perfectly fits the viewport (`h-screen`).
   - Implemented an auto-scrolling `ScrollArea` that follows the latest transcript message while fully supporting manual scrolling overrides.
5. **SEO & Performance Optimization**:
   - Implemented dynamic Next.js Metadata API integration for automatic, SEO-friendly page titles and descriptions.

---

## How the Interactive Demo Works

### 1. Agent Dashboard (`/dashboard`)
When you launch the app, you arrive at the Agent Dashboard. This screen provides an overview of the agent's day.
- **Action**: Click the **"Start Meeting"** button on any of the scheduled meeting cards (e.g., John & Sarah Smith or Mike Johnson) to enter the Live Meeting Interface.

### 2. Live Meeting Interface (`/meetings/[id]/live`)
This is the core of the Darwix AI experience. It consists of three main panels: the Live Transcription (left), the Copilot Alerts (middle), and the Profile Capture (right).
- **Play Simulation**: Click this button in the top right to start the auto-play simulation. The transcript will automatically advance, and the AI will evaluate the conversation in real-time.
- **Next Event**: Alternatively, use this button to advance the transcript one message at a time manually.
- **Interact with the AI**: As the transcript advances, the Darwix Copilot will trigger alerts (e.g., *Missing Down Payment Source*, *Unverified Income*). Click the action buttons (like **"Accept"** or **"Ask for Doc"**) to see the Customer Profile card automatically update on the right side.
- **Action**: When the conversation concludes, click **"End Meeting"**.

### 3. Post-Meeting Summary (`/meetings/[id]/summary`)
This page represents the wrap-up state after a call. Darwix AI compiles everything it captured into an Executive Summary and generates a checklist of next actions.
- **Action**: Click **"Update CRM & Proceed"** to complete the workflow and return to the dashboard.

### 4. Manager Dashboard (`/manager`)
Accessible via the toggle on the Agent Dashboard, this view demonstrates the supervisory perspective.
- Managers can see overarching KPIs (Meetings Completed, Missing Info Rates) and review live escalations triggered by agents during calls.

---

## Running the Project Locally

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You will automatically be redirected to the Agent Dashboard.
