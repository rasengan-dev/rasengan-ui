# Rasengan UI

> A modern, comprehensive UI component library built on top of Shadcn UI with React, TypeScript, and Tailwind CSS.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## ✨ Features

- 🎨 **Beautiful Components**: Pre-built, customizable UI components
- 📱 **Responsive Design**: Mobile-first approach with responsive utilities
- 🎯 **TypeScript Support**: Full type safety and IntelliSense
- 🎭 **Dark Mode**: Built-in dark mode support
- ♿ **Accessible**: WCAG compliant components
- 🎪 **Marketing & Application UI**: Comprehensive component sets for both marketing pages and applications
- 🔧 **Customizable**: Easy theming and customization
- 📚 **Documentation**: Comprehensive documentation with live examples
- 🔄 **Shadcn UI Compatible**: Built on top of Shadcn UI with the same installation and usage patterns

## 🚀 Quick Start

### Prerequisites

Before using Rasengan UI, you must have:

- A **React application**
- **Tailwind CSS** configured
- **Shadcn UI** installed and working

Supported setups include:
- [Rasengan.js](https://rasengan.dev)
- [Next.js](https://nextjs.org)
- [React Router](https://reactrouter.com)
- [Vite](https://vite.dev)
- [TanStack](https://tanstack.com/start/latest/docs/framework/react/quick-start)

If you can run `shadcn add`, you're good to go.

### Setting up Shadcn UI

If shadcn/ui is not yet installed, follow the official setup guide first:

👉 [https://ui.shadcn.com/docs/installation](https://ui.shadcn.com/docs/installation)

This will configure:
- Tailwind CSS
- CSS variables
- the `cn` utility
- component aliases
- the shadcn CLI

### Configure the Registry

For the best experience, add the Rasengan UI registry to your `components.json` file:

```json title="components.json"
{
  "registries": {
    "@rasengan-ui": "https://registry.rasengan.dev/r/{name}.json"
  }
}
```

### Installation

Rasengan UI components are distributed through a **shadcn-compatible registry**. You install them the same way you install shadcn components.

#### Using the CLI

```bash
npx shadcn@latest add <component-id>
```

Example:

```bash
npx shadcn@latest add https://registry.rasengan.dev/r/hero-10.json
```

Or with the registry shortcut:

```bash
npx shadcn@latest add @rasengan-ui/hero-10
```

This will:
- Copy the component source code into your project
- Place it alongside your existing shadcn components
- Preserve full ownership of the code

#### Manual Installation

If you prefer full control, you can also:
1. Copy the component code from the documentation
2. Paste it into your project
3. Adjust paths, styles, or behavior as needed

### Usage

Once installed, use components just like regular shadcn components:

```tsx
import { Hero10 } from "@/components/hero-10";

export default function App() {
  return (
    <div>
      <Hero10 />
    </div>
  );
}
```

## 📦 Components

### Application UI

- **Cards**: Booking cards, pricing cards, profile cards
- **Forms**: Login forms, contact forms, search forms
- **Lists**: Animated lists, task lists, user lists
- **Navigation**: Headers, footers, sidebars
- **Feedback**: Alerts, modals, tooltips
- **Data Display**: Tables, badges, avatars

### Marketing

- **Heroes**: Landing page hero sections
- **Features**: Feature showcases and comparisons
- **Testimonials**: Customer testimonials and reviews
- **Pricing**: Pricing tables and plans
- **Teams**: Team member showcases
- **CTA**: Call-to-action sections
- **FAQ**: Frequently asked questions

## 🎨 Theming

Rasengan UI uses CSS custom properties for theming. You can easily customize the theme by modifying the CSS variables:

```css
:root {
  --primary: 220 90% 56%; /* Custom primary color */
  --secondary: 210 40% 96%; /* Custom secondary color */
  /* ... other theme variables */
}
```

## 🔧 Development

### Prerequisites

- Node.js 20.18 or higher
- pnpm (recommended)

### Getting Started

1. **Clone the repository**:

```bash
git clone https://github.com/rasengan-dev/rasengan-ui.git
cd rasengan-ui
```

2. **Install dependencies**:

```bash
pnpm install
```

3. **Start development**:

```bash
pnpm dev
```

This will start:
- **Port 5320**: The UI kit - where all components are built
- **Port 3000**: The documentation website

### Project Structure

```
rasengan-ui/
├── apps/
│   ├── ui/                 # Main UI library
│   │   ├── src/
│   │   │   ├── registry/   # Component registry
│   │   │   │   ├── application-ui/  # Application UI components
│   │   │   │   └── marketing/        # Marketing components
│   │   │   └── lib/        # Utilities and helpers
│   │   └── package.json
│   └── docs/               # Documentation site
├── packages/               # Shared packages
└── tools/                  # Build and development tools
```

### Building

```bash
# Build all packages
pnpm build

# Build UI library only
pnpm build:ui

# Build documentation
pnpm build:docs
```

### Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](./CONTRIBUTING.md) for details on:

- How to set up the development environment
- Our code style and conventions
- How to submit pull requests
- Component development guidelines

## 📚 Documentation

Visit our [documentation website](https://ui.rasengan.dev/docs) for:

- Complete component API reference
- Live examples and playground
- Design system guidelines
- Best practices and patterns

## 🐛 Bug Reports & Feature Requests

- **Bug Reports**: [Open an issue](https://github.com/rasengan-dev/rasengan-ui/issues/new?template=bug_report.md)
- **Feature Requests**: [Open an issue](https://github.com/rasengan-dev/rasengan-ui/issues/new?template=feature_request.md)
- **Questions**: [Start a discussion](https://github.com/rasengan-dev/rasengan-ui/discussions)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide React](https://lucide.dev/) - Beautiful icons
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives

## 🌟 Show Your Support

If you find Rasengan UI helpful, please consider:

- ⭐ Starring this repository
- 🐦 Following us on Twitter
- 📢 Sharing with your network
- 💝 [Sponsoring the project](https://github.com/sponsors/rasengan-dev)

---

Built with ❤️ by the [Rasengan Team](https://rasengan.dev)
