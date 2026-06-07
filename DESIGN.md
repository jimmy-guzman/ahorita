# Design System & UI Patterns

Reference for UI decisions, component conventions, and interaction patterns in this codebase. Every rule here reflects a deliberate choice made during implementation — follow them when adding new UI.

---

## Overview

- **Design system:** DaisyUI v5 on top of Tailwind CSS
- **Component library:** Radix UI via the unified `radix-ui` package (dialogs **and** menus), Lucide (icons)
- **Forms:** react-hook-form + valibot resolvers
- **Data fetching:** TanStack Query with Eden Treaty
- **Routing:** TanStack Router (file-based)
- **Theme:** two named themes, `"light"` and `"dark"`, built on OKLCH — violet primary, tight border radius

---

## CSS Class Conventions

DaisyUI component classes use the `dsy-` prefix. Tailwind utility classes have no prefix. Never mix them up — if a class does not start with `dsy-`, it is a Tailwind utility.

When composing DaisyUI classes on a single element, always follow this order: **component → variant → shape → size**. For example, a small ghost square button is `dsy-btn dsy-btn-ghost dsy-btn-square dsy-btn-sm`.

---

## Theme

Two named themes are defined: `"light"` and `"dark"`. Color tokens are exposed as CSS variables following the `var(--color-*)` convention, which means components naturally adapt to the active theme without conditional classes. Use these variables in chart and custom components instead of hard-coded hex values.

---

## Layout

The authenticated shell is a full-viewport-height flex row: a fixed-width icon rail on the left and a scrollable main area on the right. The main area uses `p-6` padding. Route content is wrapped in a `Suspense` boundary so that each route can independently suspend.

The unauthenticated layout (login, signup) is centered on the page without the sidebar.

---

## Navigation

The sidebar is an icon-only rail — it shows no labels by default. Every interactive item in the rail must be wrapped in `dsy-tooltip dsy-tooltip-right` with a `data-tip` attribute that provides the label. This means the sidebar never grows wider regardless of label length.

Active route links receive `bg-base-300` via TanStack Router's `activeProps`. Icon-only links always include an `sr-only` span with the label text for screen readers.

The bottom of the rail holds secondary controls (theme toggle, logout) at reduced opacity, increasing on hover to signal their lower prominence.

---

## Buttons

**Class order:** `dsy-btn` → variant → shape → size. Always use `dsy-btn-sm` as the default size throughout the application.

**Variant by intent:**

| Intent | Class |
|---|---|
| Create / primary CTA | `dsy-btn-primary` |
| Edit / save / rename | `dsy-btn-neutral` |
| Delete trigger | `dsy-btn-error` |
| Cancel / dismiss | `dsy-btn-ghost` |
| Destructive confirmation submit | `dsy-btn-error` |

Delete triggers always use `dsy-btn-error` — destructive intent is communicated at the trigger level, not only at the confirmation step. Cancel buttons are always `dsy-btn-ghost` and never carry a color.

---

## Dialogs

All dialogs use Radix UI primitives — `@radix-ui/react-dialog` for non-destructive operations and `@radix-ui/react-alert-dialog` for irreversible destructive actions. Base UI is not used for dialogs.

**Markup structure:** `Dialog.Content` uses `asChild` and renders into a `div.dsy-modal.dsy-modal-open` wrapper containing a `div.dsy-modal-box`. This lets DaisyUI handle the modal backdrop and animation while Radix manages focus trapping and accessibility.

**Close button:** positioned `absolute top-2 right-2` with classes `dsy-btn dsy-btn-ghost dsy-btn-circle dsy-btn-sm`. This exact order must be preserved.

**Dialog.Description** must always be present. When the dialog body already provides sufficient visual context (e.g. an empty-state alert), render the description with `sr-only` to satisfy Radix's accessibility requirement without duplicating visible text.

**Action row:** always `flex justify-end gap-2`. Never use `dsy-modal-action` — it is not part of the pattern.

**Non-destructive dialogs** (create, edit, rename) have both a close × button and a Cancel button in the action row.

**Destructive confirm dialogs** (delete) use `AlertDialog` and have a Cancel button but no close × button.

### Open/close state

Every dialog that performs a mutation manages a `handleOpenChange` wrapper function. The wrapper calls `setOpen` and, when closing, clears `mutationError`. Both the `Dialog.Root onOpenChange` prop and the Cancel button's `onClick` must call this wrapper — never call `setOpen` directly from those sites.

### Empty state inside a dialog

When a prerequisite for the dialog's action is missing (for example, no projects exist when trying to create a task), the dialog opens normally but replaces the form with an informational empty-state alert and a single Close button. The actionable link inside the alert uses `dsy-link dsy-link-primary` and closes the dialog on click.

---

## Mutation Error State

Mutation errors surface in one of two tiers:

1. **Inline, inside form dialogs** (create/add forms) — the default for anything with a visible form. See the `mutationError` pattern below. These mutations do **not** opt in to the global handler.
2. **Global handler** — for mutations with no inline UI (menu quick-actions, edit/rename/delete). A mutation opts in with `meta: { globalError: true, errorMessage }`; the central `MutationCache.onError` in `src/query-client.ts` presents it (currently `toast.error`). The flag is intent-based and mechanism-agnostic — call sites never reference the toast directly.

The inline pattern:

- A `useState<string | null>` field called `mutationError` holds the current error message or `null`.
- `setMutationError(null)` is called before each `mutate()` invocation to clear any prior error.
- The `onError` callback sets the message: prefer `err.message` when the error has a `message` property, with a fallback human-readable string.
- When `mutationError` is non-null, a `dsy-alert dsy-alert-error dsy-alert-soft` with `role="alert"` is rendered inside the form, above the action row.
- `handleOpenChange` clears the error when the dialog closes.

---

## Forms

`TextInput` and `Select` are the only form primitives. Both use `dsy-floating-label` so the label animates above the input when focused or filled. Both are driven by react-hook-form's `useController` and accept a `control` prop.

When a field has a validation error, the input receives `dsy-input-error` or `dsy-select-error` and a `<span>` with `text-error text-sm` appears below it. This error display is handled internally by the components — callers do not need to render it manually.

All form schemas are written with valibot and connected via `@hookform/resolvers/valibot`.

---

## Lists

Project and task lists share a structural pattern: a `ul` container with `divide-y divide-base-300 overflow-hidden rounded-box border border-base-300`, and `li` rows with `group flex items-center gap-3 px-4 py-[2|3] transition-colors hover:bg-base-200`.

**Hover-reveal actions:** row actions are always hidden by default and revealed on hover. The `li` element carries the `group` class. The action container carries `opacity-0 transition-opacity group-hover:opacity-100`. Actions are never always-visible in list rows.

**Filter input:** lists with many items include a plain `dsy-input dsy-input-sm` filter input above the list. This is client-side only.

---

## Tables

The shared `<Table>` component in `src/components/shared/table.tsx` wraps TanStack Table. It supports column sorting; it does not filter — filtering chrome was removed in favor of a denser, Linear-like presentation. Headers use `text-base-content/50 text-xs uppercase tracking-wider`. Rows use `transition-colors hover:bg-base-200`.

Both index tables (tasks and projects) share the same column shape: a leading `Name` link, dedicated indicator cells in the middle, and a trailing actions menu. Project indicator columns (Status, Progress, Favorite, Updated) live in `src/components/projects-table/` and mirror the task cells.

The empty state is rendered as a `dsy-alert dsy-alert-soft` with `role="alert"` inside a `<td>` spanning all columns. This keeps the table structure valid while using the standard empty-state appearance.

---

## Status & Priority Indicators

Status and priority values are displayed as a colored icon paired with a responsive label — the label is hidden on small screens (`hidden sm:inline`).

The `ICON_CLASS` constant in `src/utils/cell-classes.ts` provides the shared sizing and alignment for all indicator icons: `inline-block h-4 w-4 shrink-0 align-text-bottom`. Always import this constant instead of repeating the classes.

The wrapper is `inline-flex items-center gap-1.5`.

**Status colors:**

| Status | Color |
|---|---|
| In Progress | `text-warning` |
| Done | `text-success` |
| Todo | `text-base-content/50` |
| Backlog | `text-base-content/30` |
| Canceled | `text-base-content/25` |

**Priority colors:**

| Priority | Color |
|---|---|
| High | `text-error` |
| Medium | `text-warning` |
| Low | `text-base-content/40` |

**Projects reuse this same indicator pattern.** Project Status is an enum that shares the task vocabulary — `In Progress` (`TimerIcon text-warning`) vs `Done` (`CheckCircle2Icon text-success`); Favorite is a filled `StarIcon text-warning` vs muted `text-base-content/30`. Progress is the one exception to the icon+label rule: a muted `completed/total` count beside a thin track-and-fill bar (`bg-success` only at 100%), never a badge.

---

## Row Actions

**Task rows and project rows** share the same pattern: a Radix `DropdownMenu` triggered by an ellipsis icon button (`dsy-btn dsy-btn-ghost dsy-btn-square dsy-btn-sm`) via `DropdownMenu.Trigger asChild`. The popup (`DropdownMenu.Content`, rendered in a `DropdownMenu.Portal`) uses DaisyUI's `dsy-menu` class with `rounded-box bg-base-100 shadow-sm`. Items activate via `onSelect`; navigation items use `DropdownMenu.Item asChild` wrapping a router `Link`. Quick-edit submenus (task Status/Priority/Label) use `DropdownMenu.Sub`/`SubTrigger`/`SubContent`. Destructive items (Delete) carry `text-error`. Edit/Rename and Delete items open dedicated Radix dialogs by setting local `useState` booleans (the dialogs are rendered with `withTrigger={false}` and driven by the menu).

For project rows, the indicator columns are edited from this same menu — Status via a `DropdownMenu.Sub` submenu (In Progress/Done, mirroring the task Status submenu) and Favorite via a Favorite/Unfavorite item. There are no inline row buttons or toggles.

---

## Boolean Toggles

Favorite is the only boolean project field, rendered as a `dsy-toggle dsy-toggle-sm dsy-toggle-warning` checkbox rather than a button or icon. The toggle is paired with a descriptive icon visible alongside it, and the semantic label is provided via `sr-only` text for screen readers.

Project Status is an enum (not a boolean), so it is never a toggle: it is edited via the floating-label shared `Select` in the edit dialog, the row-action Status submenu, and a compact inline `dsy-select dsy-select-sm` in the project-detail header.

---

## Empty States

Every empty state in the application uses `dsy-alert dsy-alert-soft` with `role="alert"`. The `-info` modifier is never used. Inside tables the alert lives in a full-colspan `<td>`. Inside list containers it replaces the `ul`. Inside dialogs it replaces the form when a prerequisite is missing.

When the empty state is actionable, the call-to-action link uses `dsy-link dsy-link-primary`.

---

## Route Errors

Every route definition includes `errorComponent: RouteErrorComponent`. The shared component lives at `src/components/shared/route-error.tsx` and renders a `dsy-alert dsy-alert-error dsy-alert-soft` with `role="alert"` containing the error message. It handles both `Error` instances and unknown thrown values gracefully.

---

## Toast Policy

Toasts are reserved for **error feedback on mutations that opt in** — never for success, and never called ad-hoc from components.

**Success feedback** is self-evident from the data update — the created item appears, the deleted item disappears, the dialog closes. No confirmation toast is needed.

**Mutation errors** surface either inline (form dialogs) or via the global handler (opt-in `meta: { globalError: true, errorMessage }`). See Mutation Error State above. The only `toast.*` call site is the central `MutationCache.onError` in `src/query-client.ts`; do not add `toast.*` calls elsewhere — opt a mutation in via `meta.globalError` instead.

The single `<Toaster>` mount lives in `src/routes/__root.tsx`, styled to DaisyUI alerts (`toast: "dsy-alert"`, `error: "dsy-alert-error"`, etc.).

---

## Accessibility

- Every icon-only interactive element must have either an `aria-label` prop or an `<span className="sr-only">` sibling providing its accessible name.
- Every alert — whether an error, an empty state, or an inline warning — must carry `role="alert"`.
- `Dialog.Description` must be present on every dialog. Use `className="sr-only"` when the visible dialog content already describes the context adequately.
- Tooltips on sidebar nav items double as the accessible name discovery path for sighted keyboard users.

---

## Page Structure

- Page containers are `<div>`, never `<section>`.
- No `w-full` on page-level elements — width is controlled by the layout shell.
- Spacing between page sections is set on the parent via `gap-*`, never via `mb-*` on individual heading elements.
- Page headers follow the pattern: `flex items-center justify-between` with an `h1` on the left and the primary CTA button on the right.

---

## Shared Utilities

| Export | Path | Purpose |
|---|---|---|
| `cn` | `src/utils/cn.ts` | Merges Tailwind class strings, resolving conflicts |
| `ICON_CLASS` | `src/utils/cell-classes.ts` | Shared sizing/alignment for status and priority icons |
| `RouteErrorComponent` | `src/components/shared/route-error.tsx` | Shared error boundary component for all routes |
| `TextInput` | `src/components/shared/text-input.tsx` | Floating-label text input with inline validation |
| `Select` | `src/components/shared/select.tsx` | Floating-label select with inline validation |
| `Table` | `src/components/shared/table.tsx` | Sortable, filterable, responsive data table |
