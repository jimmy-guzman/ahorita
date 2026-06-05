# Design System & UI Patterns

Reference for UI decisions, component conventions, and interaction patterns in this codebase. Every rule here reflects a deliberate choice made during implementation — follow them when adding new UI.

---

## Overview

- **Design system:** DaisyUI v5 on top of Tailwind CSS
- **Component library:** Radix UI (dialogs), Base UI (menus), Lucide (icons)
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

Errors from mutations are surfaced inline inside the dialog, never via a toast. The pattern is:

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

The shared `<Table>` component in `src/components/shared/table.tsx` wraps TanStack Table. It supports optional global fuzzy filtering and column sorting. Headers use `text-base-content/50 text-xs uppercase tracking-wider`. Rows use `transition-colors hover:bg-base-200`.

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

---

## Row Actions

**Task rows** use a Base UI `Menu` triggered by an ellipsis icon button (`dsy-btn dsy-btn-ghost dsy-btn-square dsy-btn-sm`). The menu popup uses DaisyUI's `dsy-menu` class with `rounded-box bg-base-100 shadow-sm`. Destructive items (Delete) carry `text-error`. Rename and Delete items open dedicated Radix dialogs by setting local `useState` booleans.

**Project rows** use inline icon buttons revealed on hover — no dropdown menu. The buttons are standard `dsy-btn` elements sized with `dsy-btn-xs`. The delete button uses `dsy-btn-error` directly on the trigger (see Buttons above).

---

## Boolean Toggles

Boolean project fields (Favorite, Done) use `dsy-toggle dsy-toggle-sm` checkboxes rather than buttons or icons. The Favorite toggle uses `dsy-toggle-warning`; the Done toggle uses `dsy-toggle-success`. Each toggle is paired with a descriptive icon visible alongside it, and the semantic label is provided via `sr-only` text for screen readers.

---

## Empty States

Every empty state in the application uses `dsy-alert dsy-alert-soft` with `role="alert"`. The `-info` modifier is never used. Inside tables the alert lives in a full-colspan `<td>`. Inside list containers it replaces the `ul`. Inside dialogs it replaces the form when a prerequisite is missing.

When the empty state is actionable, the call-to-action link uses `dsy-link dsy-link-primary`.

---

## Route Errors

Every route definition includes `errorComponent: RouteErrorComponent`. The shared component lives at `src/components/shared/route-error.tsx` and renders a `dsy-alert dsy-alert-error dsy-alert-soft` with `role="alert"` containing the error message. It handles both `Error` instances and unknown thrown values gracefully.

---

## Toast Policy

There are no `toast.*` calls anywhere in the application.

**Success feedback** is self-evident from the data update — the created item appears, the deleted item disappears, the dialog closes. No confirmation toast is needed.

**Mutation errors** are surfaced inline in the dialog (see Mutation Error State above).

**Background query errors** are caught by the `QueryCache.onError` fallback in `src/query-client.ts` and routed to `console.error`. This is the only site in the codebase where a console method is intentionally used, and it carries a `biome-ignore` suppression comment explaining why.

The `sonner` package and its `<Toaster>` mount are kept installed but produce no output. Do not uninstall them and do not add new `toast.*` call sites.

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
