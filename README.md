# Krishibandu Farm Gear

Build a polished, fully interactive responsive website called "Krishibandu" for a college project demo. Core purpose: help farmers find and rent/borrow agricultural machines and equipment from nearby owners. Keep scope practical and focused ONLY on machinery/equipment rental and borrowing; do NOT add smart agriculture, IoT, AI crop advice, weather, soil analytics, marketplace for produce, or complex enterprise features.

Visual direction: warm, trustworthy rural Indian marketplace, clean modern UI, earthy green + cream + subtle orange accents, attractive typography, rounded cards, clear icons, high-quality machinery photos. Mobile-first and responsive desktop. Target users in Karnataka. Main language English with a working English / ಕನ್ನಡ toggle that translates all key UI labels and navigation (not just the button).

Build a complete frontend demo with clearly labeled "DEMO DATA" / "ಡೆಮೊ ಡೇಟಾ" so nobody mistakes sample listings or bookings for live inventory. No real payment or external backend required. Persist demo interactions in local state or localStorage where sensible.

Pages/sections:
1. Home landing page with top navigation, logo wordmark Krishibandu, hero headline "Rent the right machine. Get the work done.", Kannada equivalent, search field, location selector defaulting to Bengaluru/Karnataka (editable), category shortcuts, and featured equipment.
2. Browse equipment page with search, category filters (Tractors, Tilling, Harvesting, Sprayers, Transport, Other), sort/filter controls, listing cards with photo, machine name, category, owner name, approximate area, hourly/day rental price in ₹, availability status, and "View details". Use realistic SAMPLE listings such as tractor, rotavator, power tiller, harvester, seed drill, sprayer, trailer. Mark every listing as demo.
3. Equipment detail view or modal with larger image, specs, rental rate, owner contact placeholder, availability, short description, and "Request booking".
4. Booking request flow: choose start date, duration, delivery/pickup preference, farmer name, phone number, optional note; validate required fields and show confirmation screen/toast with a generated demo booking ID. State clearly that this is a demo request and does not contact a real owner.
5. My bookings section showing submitted demo booking requests and status (Request sent – demo), with ability to cancel/remove a demo request.
6. How it works section (Search → Compare → Request → Coordinate), benefits, FAQ, and footer with contact placeholder clearly marked demo.
7. Add a simple "List your equipment" form with machine name, category, price/day, location, phone; on submit show demo confirmation and add it to the local listing collection if feasible.

Functional requirements: search filters listings by name/category/location; category chips filter; sort by price; language toggle; navigation between sections/pages; detail and booking modal; form validation; booking state; responsive mobile nav. All actions must actually work in the preview. Use sample data only, no claims of live availability. Add clear demo banner and disclaimer. Keep the interface polished, accessible, with empty states and sensible error states.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://krishibandu-farm-gear.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2bb5f12d-d9dd-4e1c-a0e4-036c200bbd7f).

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
