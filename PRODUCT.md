# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Developers and designers. Both are primary users. They open SPUIG to specify a UI as a component hierarchy and take a structured prompt an AI can turn into an interface.

The exact split of jobs between the two audiences was not specified.

## Product Purpose

SPUIG (Structured Prompts for UI Generation) is a builder that turns a visual component tree into an indented text prompt. It exists so people can specify hierarchy, props, and nested relationships precisely, instead of describing that structure in natural language.

Success means the prompt is accurate enough that an AI coding assistant can build the UI from it.

## Positioning

The mechanism in the product today is a visual Material UI tree with typed property editing, parent-child validation, and an indented prompt as the artifact. The AI writes the code somewhere else.

Whether that stays Material UI only, and whether SPUIG later emits code itself, was left open.

## Operating Context

A single-page web app. The working loop is: pick a component, nest it in the tree, set props and text, then copy or download the prompt and use it with an AI coding assistant. Undo, redo, and clear are part of that loop.

Public site: https://spuig.vercel.app/
Source: https://github.com/alonsarias/structured-prompts-ui

## Capabilities and Constraints

Current product:

- About 100 Material UI component definitions, grouped by category, with search.
- Hierarchical tree editing: add, remove, reorder, expand and collapse. The root node cannot be deleted or moved.
- Property editor with type-specific fields and real-time validation.
- Indented prompt preview, copy, and file download.
- No accounts or saved projects in the app.

Left open: whether Material UI is a durable boundary, whether the product should generate code, and whether pricing, accounts, the MIT license, or the spuig.vercel.app URL are binding.

## Evidence on Hand

- README and in-app copy describe the builder and the prompt format.
- Logo: `public/spuig.svg` (also the favicon).
- Open Graph image referenced at `https://spuig.vercel.app/og-image.jpg` (not in this repo).
- Structured data in `index.html` lists the app as free (price 0). Treat that as current page metadata, not a confirmed pricing commitment.

Do not invent customers, testimonials, benchmarks, or case studies. None are in the repo.

## Product Principles

- Developers and designers are both primary users.
- The artifact is a precise structural prompt, specific enough for an AI to build the UI.
- Do not decide component-library scope, code generation, pricing, accounts, license, or hosting until those are explicitly chosen.
