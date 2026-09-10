# ACE JavaCompute Guidelines

## Purpose
This document defines ACE-focused guidance for creating and refining Java artifacts used by JavaCompute nodes.

## When to use
Use this document when generating or reviewing Java artifacts for ACE JavaCompute nodes.

## Naming
- Use clear package names that align with the project structure.
- Use descriptive class names that match the JavaCompute node purpose.
- Keep one primary responsibility per class where possible.

## Implementation
- Generate Java that is compatible with ACE JavaCompute usage.
- Keep implementations simple, focused, and maintainable.
- Avoid introducing unnecessary helper layers or abstractions.
- Prefer straightforward data access and transformation logic.

## Project fit
- Place Java files in the correct ACE Toolkit project structure.
- Keep imports limited to what is required for the requested behavior.
- Follow existing project conventions if the user is modifying an existing codebase.

## Related files
- [`skills/ace-java-compute/SKILL.md`](https://github.com/ot4i/ace-bob/blob/f357f9950d897594e5f9e2bc0e3e9ab6d282294f/skills/ace-java-compute/SKILL.md)
- [`skills/shared/review-checklist.md`](review-checklist.md)
