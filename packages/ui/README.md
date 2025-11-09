# @shadcn-angular/ui

UI component library for shadcn-angular.

## Overview

This package contains the source code for all shadcn-angular components. Components are designed to be copied into your project using the `shadcn-ng` CLI tool rather than installed as a dependency.

## Components

- **Button** - Customizable button with variants
- **Input** - Form input component
- **Dialog** - Modal dialog component
- **Card** - Card layout component
- **Badge** - Small label component

## Usage

Don't install this package directly. Instead, use the CLI:

```bash
npx shadcn-ng add button
```

This copies the component source code into your project where you can customize it.

## Development

### Install Dependencies

```bash
npm install
```

### Build

```bash
npm run build
```

### Run Storybook

```bash
npm run storybook
```

### Run Tests

```bash
npm test
```

## Structure

```
src/
├── button/
│   ├── button.component.ts
│   ├── button.component.spec.ts
│   ├── button.component.stories.ts
│   └── README.md
├── input/
├── dialog/
├── card/
├── badge/
├── utils/
│   ├── cn.ts
│   └── cva.ts
└── index.ts
```

## Documentation

Each component has its own README with:
- Usage examples
- API reference
- Accessibility notes

See individual component directories for details.

## License

MIT
