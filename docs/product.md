# Camping Inventory Product Vision

## Vision

Build a camping inventory app that helps campers track what they own, where items are stored, organize gear into containers, plan trips from reusable inventory, and eventually understand how gear should fit into and be loaded into a vehicle.

The product should stay simple, practical, and durable:

- treat the GitHub repo as the permanent source of truth
- capture decisions in repo docs and backlog items
- support reusable inventory with trip-aware quantities

## Product Principles

- Useful immediately: users should be able to get value from the app without completing extensive setup first.
- Optional setup: onboarding, account creation, and other setup flows should be skippable whenever they are not required for the user's current task.
- Progressive enrichment: let users start with simple inventory items and add details, photos, quantities, notes, and other metadata later if they want to.
- Contextual upsells: account creation or paid features should be introduced when they provide a relevant benefit, not pushed immediately on launch.
- Never interrupt the user's task to sell or promote the app. Do not block camping workflows with signup or upgrade prompts.
- User data should be portable. Inventory should support CSV import and export.

## Target User

Primary user:

- a camper who plans recurring trips and wants to reuse packing lists across trips of different sizes and lengths

Secondary users:

- people sharing the same trip plan with different packing preferences
- anyone who wants to maintain a reusable gear or supply checklist

## First-Version Product Model

The first version is for individual camping organization. Social and collaborative features are intentionally out of scope.

### Core Entities

- `User`: the authenticated account.
- `Inventory item`: an individual physical item owned by the user.
- `Container`: a bag, bin, vehicle compartment, or other personal storage location.
- `Trip`: a camping outing with dates, destination, group size, and activity details.
- `Packing list`: the gear and supplies needed for a trip.
- `Packing-list entry`: a packing-list requirement with required and packed quantities.
- `Location`: where an inventory item or container is currently stored.

### Ownership and Collaboration

- A user owns their inventory items, containers, trips, and packing lists.
- Inventory is personal in the first version.
- Trips may include people who do not have accounts and do not receive access to the trip.
- Shared inventories, household accounts, invitations, permissions, and collaborative editing are later product expansions.

### Quantities and States

The app distinguishes required, owned, and packed quantities. A shortfall is the required quantity minus the packed or available quantity.

Required quantities may use trip duration, number of people, activity type, number of meals, or number of nights. The app compares requirements with the user's inventory; it does not assign items to individual people.

Inventory states are `Owned`, `Available`, `Packed`, `Missing`, and `Unavailable`. `Packed` is always specific to a trip. An item may appear on multiple packing lists; overlapping-trip conflicts should warn the user without silently blocking the action.

### Authentication and Offline Use

Users must authenticate before creating meaningful saved data. Before authentication, the app may show a demo or starter packing list and preserve temporary interface state, but it should not create a persistent anonymous workspace.

Auth0 is the intended authentication provider, using the Auth0 Next.js integration for the web application. The web application and Capacitor wrapper obtain an Auth0 access token minted for the Payload API, pass it to Payload as a bearer token, and use the resulting authenticated Payload user context for authorization. The client must not send an Auth0 identity token or the Next.js session cookie as the Payload API credential. Payload authentication remains for access to the Payload admin application. Product records must be authorized against the authenticated user's ownership.

The responsive Next.js application is the single product interface for browser and mobile use. Capacitor packages its static output for iOS and Android using application identifier `com.elilemons.campinginventory`; Payload is not bundled into the native application.

On first authenticated product use, the system should create a matching Payload user automatically. If a matching Payload user is unexpectedly missing later, the system should create it rather than leaving the authenticated user without an owner record.

Users should be able to delete their account and associated personal data. This is a product requirement; the exact legal retention and deletion obligations require separate compliance review.

After authentication, the core packing workflow must work offline in the Capacitor application, including viewing and editing inventory, containers, trips, packing lists, quantities, statuses, searches, filters, and locations. Offline changes are stored locally and queued for synchronization.

### First Useful Journey

1. Create a first trip.
2. Enter dates, destination, number of people, and activity type.
3. Choose a starter packing list or begin with a blank list.
4. Add inventory items.
5. Mark items as packed.
6. See what is missing or insufficient.

Authentication is requested when the user chooses an action that creates or saves meaningful data, such as `Create trip`, `Add inventory`, or `Save`. Returning users should see the most relevant active trip and its packing progress.

## MVP Boundaries

In scope for the first version:

- reusable inventory and packing lists
- trip-aware quantity calculation
- manual override of suggested quantities
- clear product documentation and backlog tracking

Out of scope for now:

- advanced automation beyond the agreed quantity modes
- product areas not yet captured in the backlog

## Agreed Features

- reusable packing lists
- inventory tracking with storage locations
- gear organization into containers
- trip planning from reusable inventory
- future vehicle packing guidance as a product direction
- trip-based quantity recalculation
- support for different quantity modes per item
- inventory onboarding/bootstrap based on the types of camping the user does
- onboarding should suggest common gear that users can quickly check off as already owned
- inventory created during onboarding should be normal inventory that can be enriched later with details and photos
- onboarding can be skipped
- CSV inventory import and export
- recorded product decisions in repo docs rather than chat memory

## Quantity Modes

- `Fixed`
- `Per person`
- `Per night`
- `Per person per night`
- `Manual`

## Backlog Labels

Use these labels to organize repo backlog items:

- `pain`
- `delight`
- `idea`
- `mvp`
- `later`

## Recorded Product Decisions

- GitHub is the canonical source of truth for product decisions.
- `docs/product.md` records the product vision, scope, and key decisions.
- GitHub Issues are the preferred place for individual backlog items and acceptance criteria.
- GitHub Projects should be used as the prioritization board with stages like Backlog, Ready, In Progress, Review, and Done.
- `AGENTS.md` should instruct Codex to read the product docs before changing product code.
- The app should not assume everyone drinks or needs beer-related defaults.
- Dynamic trip-based quantity recalculation is a core product idea and should be tracked prominently.
- Inventory onboarding should reduce the cold-start burden: ask what kinds of camping the user does, suggest relevant basic gear, and let the user check off what they own.
- Users do not need to fully catalog their gear during onboarding. Additional details and photos can be added later.
- Users must be able to skip inventory onboarding.
- Users must authenticate before inventory data is saved to Payload. Before authentication, the app may keep temporary work in local storage and should clearly explain that this data is device-local, is not backed up or synced, and may be lost if local app data is cleared or the app is uninstalled.
- Inventory portability matters; support CSV import and export.
- Do not require account creation simply to browse a demo or starter experience, but require authentication before meaningful user data is created or saved.
- Auth0 is the intended product-user authentication provider; Payload authentication remains for the Payload admin application.
- Auth0 access tokens must be validated before Payload uses the authenticated user context to authorize access to that user's records.
- The Auth0-to-Payload integration should provision a Payload user on first authenticated product use and use ownership access rules for inventory records.
- Account deletion is a first-version product requirement; retention exceptions and compliance obligations remain to be verified.
- Do not aggressively prompt users to upgrade or subscribe. Paid/account features should be discoverable and offered contextually without interrupting active tasks.
- The first version is a personal camping inventory and trip-packing planner that calculates what one user needs, owns, has packed, and still needs to acquire or prepare.
- Social features are a separate future product expansion.
