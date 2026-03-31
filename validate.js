#!/usr/bin/env node
/**
 * Token reference validator.
 * Checks that every alias chain is intact:
 *   semantic → primitives
 *   component → semantic
 *
 * Run: node validate.js
 */

const fs = require("fs");
const path = require("path");

const p = JSON.parse(fs.readFileSync(path.join(__dirname, "tokens/primitives.json"), "utf-8"));
const s = JSON.parse(fs.readFileSync(path.join(__dirname, "tokens/semantic.json"), "utf-8"));
const c = JSON.parse(fs.readFileSync(path.join(__dirname, "tokens/component.json"), "utf-8"));

const pKeys = new Set(Object.keys(p));
const sKeys = new Set(Object.keys(s));
const errors = [];

// Check semantic → primitives
for (const [k, def] of Object.entries(s)) {
  const refs = [];
  if (def.light) refs.push({ mode: "light", val: def.light.value });
  if (def.dark) refs.push({ mode: "dark", val: def.dark.value });
  if (def.value && typeof def.value === "string" && def.value.startsWith("{")) {
    refs.push({ mode: "value", val: def.value });
  }
  if (def.value && typeof def.value === "object") {
    for (const [prop, val] of Object.entries(def.value)) {
      if (typeof val === "string" && val.startsWith("{")) {
        refs.push({ mode: prop, val });
      }
    }
  }
  for (const { mode, val } of refs) {
    const m = val.match(/^\{primitives\.(.+)\}$/);
    if (m) {
      const key = m[1].replace(/\./g, "/");
      if (!pKeys.has(key)) {
        errors.push(`SEMANTIC  ${k} [${mode}] → primitives.${m[1]} NOT FOUND (key: ${key})`);
      }
    }
  }
}

// Check component → semantic
for (const [k, def] of Object.entries(c)) {
  if (typeof def.value === "string" && def.value.startsWith("{semantic.")) {
    const m = def.value.match(/^\{semantic\.(.+)\}$/);
    if (m) {
      const key = m[1].replace(/\./g, "/");
      if (!sKeys.has(key)) {
        errors.push(`COMPONENT ${k} → semantic.${m[1]} NOT FOUND (key: ${key})`);
      }
    }
  }
}

// Check for component tokens referencing primitives directly (skip-layer violation)
for (const [k, def] of Object.entries(c)) {
  if (typeof def.value === "string" && def.value.startsWith("{primitives.")) {
    errors.push(`COMPONENT ${k} → references primitives directly (must go through semantic)`);
  }
}

// Report
console.log(`Tokens: ${pKeys.size} primitives, ${sKeys.size} semantic, ${Object.keys(c).length} component`);
console.log(`References checked: ${Object.keys(s).length + Object.keys(c).length}`);
console.log("");

if (errors.length === 0) {
  console.log("✓ ALL REFERENCES VALID — no broken chains, no skipped layers.");
} else {
  console.log(`✗ ${errors.length} ERROR(S) FOUND:\n`);
  errors.forEach((e) => console.log("  " + e));
  process.exit(1);
}
