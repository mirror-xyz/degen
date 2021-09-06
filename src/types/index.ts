// Basic empty type instead of using `{}`
// https://github.com/typescript-eslint/typescript-eslint/issues/2063#issuecomment-675156492
export type EmptyObject = { [k: string]: unknown }
