# Contributing to Rasengan UI

Thank you for your interest in contributing to Rasengan UI! This guide will help you get started with contributing to our UI component library.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Adding Components](#adding-components)
- [Testing](#testing)
- [Documentation](#documentation)
- [Submitting Changes](#submitting-changes)
- [Pull Request Process](#pull-request-process)
- [Code Style](#code-style)

## Prerequisites

Before you begin, make sure you have:

- **Node.js** (v20.18 or higher)
- **pnpm** (recommended package manager)
- **Git** installed and configured
- A **GitHub** account

## Getting Started

### 1. Fork the Repository

1. Go to the [Rasengan UI repository](https://github.com/rasengan-dev/rasengan-ui)
2. Click the "Fork" button in the top-right corner
3. Clone your fork locally:

```bash
git clone https://github.com/YOUR_USERNAME/rasengan-ui.git
cd rasengan-ui
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Start Development

```bash
pnpm dev
```

This will start the development server with hot reloading of two projects.
- Port 5320: The UI kit - place where all components are built
- Port 3000: The documentation website

## Development Workflow

### Step 1: Create a Feature Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix-name
```

### Step 2: Make Your Changes

- Follow the [Project Structure](#project-structure) guidelines
- Implement your changes following our [Code Style](#code-style)
- Test your changes thoroughly

### Step 3: Run Tests

```bash
pnpm test
```

### Step 4: Check Code Quality

```bash
pnpm lint
pnpm type-check
```

### Step 5: Commit Your Changes

Use conventional commits:

```bash
git add .
git commit -m "feat: add new button component"
# or
git commit -m "fix: resolve button hover state issue"
```

### Step 6: Keep Your Branch Updated

```bash
git fetch upstream
git rebase upstream/main
```

### Step 7: Push to Your Fork

```bash
git push origin feature/your-feature-name
```

## Project Structure

```
rasengan-ui/
├── apps/
│   ├── ui/                 # Main UI library
│   │   ├── src/
│   │   │   ├── components/ # Reusable UI components
│   │   │   ├── registry/   # Component registry
│   │   │   │   ├── application-ui/  # Application UI components
│   │   │   │   └── marketing/        # Marketing components
│   │   │   └── lib/        # Utilities and helpers
│   │   └── package.json
│   └── docs/               # Documentation site
├── packages/               # Shared packages
└── tools/                  # Build and development tools
```

## Adding Components

### 1. Component Location

- **Application UI**: `apps/ui/src/registry/application-ui/`
- **Marketing**: `apps/ui/src/registry/marketing/`

### 2. Component Structure

Each component should follow this structure:

```
component-group-name/
├── component-name[number].tsx      # Main component file
└── index.ts               # Export file
```

### 3. Preview Component

In order to preview components, you need to create a page for each component into the `apps/ui/src/app/_routes` folder. You can just follow the existing pattern.

## Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Writing Tests

Components should include tests for:

- Basic rendering
- Props handling
- User interactions
- Accessibility

```tsx
import { render, screen } from "@testing-library/react";
import { ComponentName } from "./component-name";

describe("ComponentName", () => {
  it("renders correctly", () => {
    render(<ComponentName>Test</ComponentName>);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<ComponentName className="custom-class">Test</ComponentName>);
    const element = screen.getByText("Test");
    expect(element).toHaveClass("custom-class");
  });
});
```

## Documentation

### Component Documentation

Each component should have a README.md with:

- Description
- Props documentation
- Usage examples
- Accessibility notes


### Registry Updates

When adding new components, update the registry:

1. Add component to appropriate index file:
   - `apps/ui/src/data/components/application-ui/index.ts`
   - `apps/ui/src/data/components/marketing/index.ts`

You need to update the documentation of the component inside the `packages/data` package. Based on the type of the component you are adding (`marketing/application ui`) you need to specify it into the package data.

After, you have to run the `pnpm packages:build` command to make all the changes available globally.

2. Update registry.json if needed

You need to update the `registry.json` file located into `apps/ui` project accordingly to the existing content.

After updating it, run the `pnpm registry/build` command to build the registry.

## Submitting Changes

### Commit Message Format

Use conventional commits:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat(button): add variant support
fix(card): resolve overflow issue on mobile
docs(readme): update installation instructions
```

### Before Submitting

1. **Code passes all tests**: `pnpm test`
2. **Code passes linting**: `pnpm lint`
3. **TypeScript passes**: `pnpm type-check`
4. **Components are documented**: README files updated
5. **Registry is updated**: New components added to index files

## Pull Request Process

### 1. Create Pull Request

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Select your feature branch
4. Fill out the PR template

### 2. PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] All tests pass
- [ ] Added tests for new functionality
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Component registry updated (if applicable)
```

### 3. PR Review Process

1. **Automated Checks**: CI/CD pipeline runs tests and linting
2. **Code Review**: Maintainers review your changes
3. **Feedback**: Address any review comments
4. **Approval**: Once approved, your PR will be merged

### 4. After Merge

1. **Delete Branch**: Clean up your feature branch
2. **Update Local**: Sync with upstream repository
3. **Celebrate**: 🎉 Your contribution is now part of Rasengan UI!

## Code Style

### TypeScript/React Guidelines

- Use **TypeScript** for all new code
- Use **cn()** utility for conditional classes
- Follow **React Hooks** rules
- Use **semantic HTML** elements

### CSS/Styling Guidelines

- Use **Tailwind CSS** classes
- Follow **design system** tokens
- Ensure **responsive design**
- Consider **accessibility** (ARIA labels, keyboard navigation)

### File Naming

- Use **kebab-case** for file names: `component-name.tsx`
- Use **PascalCase** for component names: `ComponentName`
- Use **camelCase** for prop names: `customClassName`

## Getting Help

- **GitHub Issues**: Report bugs or request features
- **Discussions**: Ask questions or share ideas

## License

By contributing to Rasengan UI, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to Rasengan UI! Your contributions help make this project better for everyone. 🚀