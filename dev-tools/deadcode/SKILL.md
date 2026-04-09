---
name: deadcode
description: "find and remove dead code. scans for unused files, exports, dependencies, and types using knip. lists every finding with reasoning before deleting anything. Triggers: deadcode, dead code, unused code, clean up code, remove unused, prune dependencies."
---

# deadcode

scan the project for unused code, list every finding with reasoning, then clean up after approval.

## steps

1. **run knip** to detect dead code:
   ```bash
   npx knip
   ```

2. **present findings as a table** with columns:
   - item (file, export, dependency, or type)
   - location (file path and line number)
   - reason it's flagged (nothing imports it, no file references it, etc.)

3. **verify each finding** before recommending deletion:
   - grep the codebase for references (imports, dynamic requires, string references)
   - check if it's used in scripts, configs, or tests that knip might miss
   - check if it's a public API entry point that external consumers use
   - flag anything uncertain as "needs review" instead of "safe to delete"

4. **wait for approval** before making any changes. never auto-delete.

5. **after approval**, make changes and run the build to confirm nothing broke.

## what it catches

- **unused files**: components, utils, pages that nothing imports
- **unused exports**: exported functions, types, constants that nothing outside the file uses
- **unused dependencies**: packages in package.json that no file imports
- **unused devDependencies**: dev packages that no config or script references
- **unlisted dependencies**: packages used in code but missing from package.json
- **unused types**: exported TypeScript types with no external consumers

## rules

- never delete without showing findings and getting approval first
- always verify with grep before calling something unused. knip can miss dynamic imports, barrel files, and config references
- always run the build after cleanup to catch breakage
- if a dependency is only used in a script (not src/), check scripts before flagging
- commit cleanup separately from feature work
