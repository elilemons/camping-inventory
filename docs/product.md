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
- Inventory portability matters; support CSV import and export.
- Do not require account creation simply to begin using the app when the requested feature can work locally.
- Do not aggressively prompt users to upgrade or subscribe. Paid/account features should be discoverable and offered contextually without interrupting active tasks.
