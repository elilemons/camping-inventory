# Repo Backlog

This document holds product work that is not yet represented as GitHub Issues.

## 1. Dynamic trip-based quantities

Allow packing list item quantities to recalculate from trip details so the same reusable list can adapt to different trip sizes.

### Acceptance Criteria

- A list item can store a quantity mode.
- Supported quantity modes are `Fixed`, `Per person`, `Per night`, `Per person per night`, and `Manual`.
- When trip details change, items using dynamic modes recalculate from the updated trip inputs.
- `Manual` mode leaves the quantity unchanged by trip calculations.
- The UI or data model clearly distinguishes fixed quantities from calculated quantities.
- The feature works without requiring the user to rewrite reusable lists for each trip.

