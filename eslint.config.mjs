import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextCoreWebVitals,
  {
    ignores: [".next/**", "node_modules/**", "out/**"],
  },
  {
    // shadcn/ui vendored components and hooks: copied in rather than hand-
    // written, and predate these React-Compiler-era rules. Not worth
    // hand-patching vendored code to satisfy rules newer than the code.
    files: ["components/ui/**", "hooks/use-mobile.ts"],
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
    },
  },
];

export default eslintConfig;
