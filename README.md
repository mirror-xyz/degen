## Setup

Install:

```bash
yarn add degen
```

Wrap root of app in `<ThemeProvider />` and import stylesheet:

```tsx
import { ThemeProvider } from 'degen'
import 'degen/dist/style.css'

const App = () => {
  return <ThemeProvider>{children}</ThemeProvider>
}
```

Add [Inter var](https://rsms.me/inter/#variable) font family:

```
// Add to head or add files to project directly
<link rel="stylesheet" href="https://rsms.me/inter/inter.css">
```

## Local Development

```
yarn
yarn dev
```
