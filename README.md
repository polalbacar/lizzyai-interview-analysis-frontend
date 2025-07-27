# 🎤 LizzyAI Frontend

**React + TypeScript Frontend for AI-Powered Interview Analysis**

This is the frontend application for LizzyAI, providing a modern and intuitive interface for uploading interview recordings and viewing AI-powered analysis results.

## ✨ Features

- **📁 File Upload Interface**: Modern drag-and-drop interface for audio files
- **🎵 Audio Format Support**: MP3, WAV, M4A, MP4, WebM support
- **📊 Results Visualization**: Interactive charts and detailed analysis reports
- **🔍 Fraud Detection Display**: Clear visualization of fraud indicators and scores
- **📱 Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **🎨 Modern UI**: Clean design using shadcn/ui components

## 🏗️ Tech Stack

- **⚛️ React 18** - Modern React with hooks
- **📘 TypeScript** - Type-safe development
- **⚡ Vite** - Fast build tool and dev server
- **🎨 Tailwind CSS** - Utility-first CSS framework
- **🧩 shadcn/ui** - High-quality component library
- **🎯 React Router** - Client-side routing
- **🔄 React Query** - Server state management
- **🎭 Lucide Icons** - Beautiful icon library

## 🚀 Development

### Prerequisites
- Node.js 18+ with npm

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Development URLs
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:8000 (when running full stack)

## 📁 Project Structure

```
src/
├── components/
│   └── ui/          # shadcn/ui components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── pages/           # Page components
│   ├── Index.tsx    # Landing page
│   ├── Upload.tsx   # File upload interface
│   ├── Results.tsx  # Analysis results display
│   └── NotFound.tsx # 404 page
├── data/            # Mock data and types
└── main.tsx         # Application entry point
```

## 🎨 UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) for consistent, accessible components:
- Form elements (Button, Input, Select, etc.)
- Layout components (Card, Dialog, Sheet, etc.)
- Data display (Table, Charts, Badges, etc.)
- Navigation (Sidebar, Breadcrumb, etc.)

## 🔗 Integration

The frontend communicates with the FastAPI backend through:
- REST API endpoints for file upload and processing
- Real-time status updates during analysis
- Structured JSON responses for results display

## 📋 Pages Overview

- **Upload Page**: File selection, upload progress, processing status
- **Results Page**: Comprehensive analysis display with fraud detection scores
- **Index Page**: Application overview and navigation

## 🎯 Key Features

### File Upload
- Drag-and-drop interface
- Progress tracking
- File validation
- Multiple format support

### Results Display
- Interactive fraud detection scores
- Question-answer segmentation
- Detailed analysis insights
- Export capabilities

### Responsive Design
- Mobile-optimized layouts
- Touch-friendly interactions
- Accessible navigation
- Dark/light theme support

## 🛠️ Build Process

```bash
# Development build with hot reload
npm run build:dev

# Production build
npm run build

# Analyze bundle size
npm run build && npx vite-bundle-analyzer
```

---

This frontend provides an intuitive interface for LizzyAI's powerful interview analysis capabilities, making AI-powered recruitment accessible and user-friendly.
