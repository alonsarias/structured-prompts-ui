# Structured Prompts for UI Generation

A tool for generating structured prompts that help AI create UI components with precise hierarchy and configuration.

🚀 **[Live Demo](https://spuig.vercel.app/)**



## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [How It Works](#how-it-works)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Development](#development)

## Overview

This tool is a builder that creates structured text prompts for AI models to generate UI components. Instead of describing UI components in natural language, it lets you visually build component hierarchies and automatically generates precise prompts that AI can understand and convert into code.

### The Problem

When asking AI to create UI components, developers often struggle with:

- Describing complex component hierarchies in text
- Specifying exact prop configurations
- Maintaining consistency across similar components
- Communicating nested relationships clearly

### The Solution

This tool provides:

- 🎯 **Component Selection** - Browse and select from 100+ Material-UI components
- 🌳 **Hierarchical Tree Builder** - Visual interface for building component trees
- ⚙️ **Property Editor** - Form-based editing for component props and content
- 📋 **Structured Prompt Generation** - Automatic conversion to AI-readable prompts
- ✅ **Real-time Validation** - Instant feedback on component configurations

## Features

### 🎨 Component Library

- **Comprehensive Coverage**: 100+ Material-UI components across 8 categories
- **Smart Search**: Find components by name, description, or category
- **Category Filtering**: Browse by Inputs, Layout, Navigation, Data Display, etc.
- **Component Details**: See descriptions, props, and compatibility information

### 🛠️ Builder

- **Intuitive Interface**: Simple and intuitive component tree building
- **Real-time Preview**: See your component structure as you build
- **Hierarchy Management**: Add, remove, and reorganize components
- **Parent-Child Validation**: Automatic validation of component relationships

### ⚡ Property Management

- **Type-Safe Editing**: Form inputs tailored to each prop type
- **Required Field Validation**: Visual indicators for required properties
- **Enum Value Selection**: Dropdown menus for predefined values
- **Text Content Support**: Direct text editing for components that accept content

### 🚀 Prompt Generation

- **Structured Output**: Clean, indented syntax showing component hierarchy
- **Prop Serialization**: Automatic conversion of props to prompt format
- **Copy & Export**: One-click copying and file download
- **AI-Optimized Format**: Designed for maximum AI comprehension

## How It Works

1. **Select Components**: Choose from the Material-UI component library
2. **Build Hierarchy**: Create parent-child relationships visually
3. **Configure Properties**: Set props, text content, and styling options
4. **Generate Prompt**: Get a structured text representation of your UI
5. **Use with AI**: Copy the prompt and use it with any AI coding assistant

### Example Output

```jsx
Convert the following structure into a component:

Container maxWidth="md"
  AppBar position="static"
    Toolbar
      Typography variant="h6" "My App"
      Button variant="contained" color="primary" "Login"
  Box sx={{padding: 2}}
    Card
      CardContent
        Typography variant="h5" "Welcome"
        Typography variant="body1" "This is a sample layout"
        Button variant="outlined" "Learn More"
```

## Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. **Clone the repository**

```bash
git clone https://github.com/alonsarias/structured-prompts-ui.git
cd structured-prompts-ui
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

4. **Open in browser**

```
http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

## Usage

### Basic Workflow

1. **Start Building**

   - Click the "+" icon on the Root in the Component Tree
   - Choose a component from the Selector to add it to your Tree

2. **Create Hierarchy**

   - Select a parent component in the Tree
   - Click the "+" icon on any component to add a child
   - Choose the child component from the Selector

3. **Configure Properties**

   - Click the edit icon (pencil) on any component in the Tree
   - Use the Property Editor to set properties
   - See validation errors and warnings in real-time with visual indicators

4. **Organize Components**

   - Use the up/down arrow buttons to reorder components within their parent
   - Expand/collapse component branches using the arrow icons
   - Delete unwanted components using the delete icon

5. **Generate Prompt**
   - View the live prompt preview in the Preview panel
   - Copy to clipboard or download as a file using the header buttons
   - Use with your favorite AI coding assistant

### Advanced Features

- **Undo/Redo**: Full history support with keyboard shortcuts
- **Validation**: Real-time error checking for component compatibility
- **Export Options**: Copy to clipboard or download as text file
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
src/
├── components/           # React components
│   ├── ComponentSelector.tsx    # Component library browser
│   ├── ComponentTree.tsx       # Hierarchical tree view
│   ├── PropertyEditor.tsx      # Property configuration forms
│   └── SpuigPreview.tsx        # Prompt preview and export
├── data/                # Component definitions
│   ├── muiComponents.ts        # Component registry
│   └── components/             # JSON component definitions
├── hooks/               # Custom React hooks
│   └── useSpuigBuilder.ts     # Main application state
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
│   └── spuigUtils.ts          # Component manipulation utilities
└── theme/               # Material-UI theme configuration
```

## Development

### Key Technologies

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Material-UI v7** - Component library
- **Vite** - Build tool and dev server

### Development Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Architecture Overview

- **State Management**: Custom hook (`useSpuigBuilder`) with immutable updates
- **Component System**: JSON-driven component definitions for easy extensibility
- **Validation System**: Real-time validation with detailed error messages
- **Export System**: Structured text generation optimized for AI consumption
