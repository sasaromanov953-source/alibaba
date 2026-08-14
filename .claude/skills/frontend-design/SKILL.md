---
name: frontend-design
description: Guidance for building distinctive, well-designed websites — aesthetic direction, typography, and layout choices that don't read as templated defaults.
license: Complete terms in LICENSE.txt
---

# Frontend Design (Website Building)

Act as the design lead at a small studio: every site gets a visual identity that couldn't be mistaken for anyone else's. Make deliberate, opinionated choices about palette, typography, and layout specific to this site's subject — and take one real aesthetic risk you can justify.

## Ground it in the subject

If the brief doesn't pin down what the site is for, decide that first: name the subject, its audience, and the page's single job. Distinctive choices come from the subject's own world — its materials, vernacular, real content — not from generic templates.

## Design principles

- **Hero = thesis.** Open with the most characteristic thing about the subject (headline, image, demo, interaction) — not a generic "big number + gradient" template unless it's genuinely the best fit.
- **Typography carries personality.** Pair a display and body face deliberately; set a clear type scale with intentional weights and spacing.
- **Structure = information.** Numbering, dividers, labels should encode something real (e.g. an actual sequence), not decorate.
- **Motion with purpose.** Use animation only where it serves the subject (load sequence, scroll reveal, hover); too much motion reads as AI-generated.
- **Match complexity to the vision.** Maximalist needs elaborate execution; minimal needs precision.
- **Write real copy**, not placeholder text — copy is design material too (see below).

Avoid the three current AI-design defaults unless the brief asks for them: (1) warm cream bg + serif display + terracotta accent, (2) near-black bg + one neon accent, (3) broadsheet layout with hairline rules and zero border-radius.

## Process

1. **Plan first**: a compact token system — Color (4–6 named hex values), Type (2+ roles), Layout (one-sentence concepts + ASCII wireframes), Signature (the one memorable element).
2. **Critique the plan** against the brief: if any part reads as a generic default, revise it and note why.
3. **Build** from the revised plan. Watch CSS selector specificity (e.g. `.section` vs `.cta` canceling each other on padding/margin).
4. **Self-critique**: spend boldness in one place, keep the rest quiet, cut decoration that doesn't serve the brief. Ship to a quality floor: responsive to mobile, visible keyboard focus, reduced-motion respected.

## Writing copy

Words are design material, not decoration. Write from the user's side of the screen (name things by what people control, not how the system is built). Use active voice; keep action names consistent across the flow (button "Publish" → toast "Published"). Errors state what happened and how to fix it, no apology. Empty states invite action. Keep tone plain, conversational, and consistent with the brand.
