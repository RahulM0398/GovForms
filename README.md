# VForms - Document Intelligence Dashboard

<div align="center">

![VForms Logo](https://img.shields.io/badge/VForms-Document%20Intelligence-6366f1?style=for-the-badge&logo=files&logoColor=white)

**Streamline Federal A-E Qualification Forms with AI-Powered Document Intelligence**

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)

</div>

---

## 📋 Overview

**VForms** is a modern web application designed to simplify the process of completing federal Architect-Engineer (A-E) qualification forms. It provides an intuitive interface for managing, filling, and exporting government forms required for A-E contract submissions.

Whether you're a small architecture firm or a large engineering company, VForms helps you:
- 📄 **Organize** your qualification documents in one place
- ✨ **Auto-fill** forms using intelligent document extraction
- 📊 **Track progress** on form completion
- 📥 **Export** fillable PDFs for submission

---

## ✨ Features

### 🗂️ Multi-Form Support
VForms supports all major federal A-E qualification forms:

| Form | Description | Use Case |
|------|-------------|----------|
| **SF330** | Architect-Engineer Qualifications | Primary qualification statement for A-E services |
| **SF254** | A-E Services Questionnaire | General firm qualifications and experience |
| **SF255** | Project-Specific Questionnaire | Qualifications for specific project solicitations |
| **SF252** | Architect-Engineer Contract | Contract award and modification documentation |

### 📁 Project Management
- Create and manage multiple projects
- Organize uploaded documents by project
- Track form completion progress per project
- Quick access to recent projects from dashboard

### 📤 Document Ingestion
- **Drag & Drop** file upload interface
- Supports PDF, DOC, DOCX, TXT, XLS, XLSX formats
- Maximum file size: 10MB per file
- Automatic document parsing and data extraction
- File validation and security checks

### 🤖 Auto-Fill Intelligence
- Extracts relevant data from uploaded documents
- Automatically populates form fields
- Reduces manual data entry
- Supports data extraction from resumes, project sheets, and company documents

### 📊 Progress Tracking
- Visual progress bars for each form
- Percentage completion indicators
- Missing required fields warnings
- Field-by-field validation status

### 📥 PDF Export
- Export completed forms as **fillable PDFs**
- Edit exported PDFs manually if needed
- Professional formatting matching official form layouts
- One-click download functionality

### 👥 Team Management
- Manage firm employees and roles
- Track personnel by discipline
- Assign team members to projects
- Maintain employee qualifications database

### 🏢 Firm Profiles
- Store multiple firm profiles
- Manage parent company relationships
- Track business certifications
- Small business status documentation

### ⚙️ Settings & Preferences
- User profile management
- Organization settings
- Security preferences
- Billing information

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or yarn/pnpm)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RahulM0398/GovForms.git
   cd GovForms
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
```

The production build will be generated in the `dist/` folder.

---

## 📖 Usage Guide

### Creating a New Project

1. Click **"New Project"** in the sidebar or dashboard
2. Enter a project name
3. Start uploading documents or filling forms

### Uploading Documents

1. Navigate to the **Forms** section
2. Select the form you want to fill (SF330, SF254, SF255, or SF252)
3. Drag and drop files into the **Document Ingestion** panel
4. Or click **"browse"** to select files manually
5. Uploaded documents will appear in the assets list

### Filling Forms

1. Select a form from the sidebar
2. Fill in the required fields (marked with *)
3. Use collapsible sections to navigate large forms
4. Progress bar shows completion percentage
5. Missing fields are highlighted in the warning panel

### Exporting Forms

1. Complete filling out the desired form
2. Click the **"Export PDF"** button in the form header
3. The fillable PDF will download automatically
4. Open in any PDF reader to make additional edits

### Managing Team Members

1. Go to **Team** from the sidebar
2. Add new employees with their details
3. Assign disciplines and roles
4. Employee data can be used across forms

---

## 🏗️ Project Structure

```
VForms1/
├── src/
│   ├── components/
│   │   ├── forms/           # Form components (SF330, SF254, SF255, SF252)
│   │   ├── ingestion/       # Document upload components
│   │   ├── layout/          # Layout components (Sidebar, TopNav)
│   │   ├── project/         # Project management components
│   │   ├── ui/              # Reusable UI components (shadcn/ui)
│   │   └── views/           # Page view components
│   ├── context/
│   │   ├── DashboardContext.tsx    # Global state management
│   │   └── NavigationContext.tsx   # Navigation state
│   ├── hooks/
│   │   └── useAutoFill.ts   # Auto-fill logic hook
│   ├── types/
│   │   └── index.ts         # TypeScript type definitions
│   ├── utils/
│   │   ├── formProgress.ts  # Form progress calculation
│   │   ├── pdfExport.ts     # PDF generation utilities
│   │   └── security.ts      # Input validation & sanitization
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── public/                   # Static assets
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🛠️ Technology Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 18 with TypeScript |
| **Build Tool** | Vite 7 |
| **Styling** | Tailwind CSS 4 |
| **UI Components** | shadcn/ui + Radix UI |
| **Icons** | Lucide React |
| **PDF Generation** | pdf-lib |
| **State Management** | React Context + useReducer |
| **Persistence** | localStorage |
| **Validation** | Zod |

---

## 📝 Supported Form Fields

### SF330 - Architect-Engineer Qualifications
- **Part I**: Contract-specific qualifications
  - Contract information
  - Firm contact details
  - Key personnel
  - Example projects
  - Organizational chart
  
- **Part II**: General qualifications
  - Firm information
  - Ownership details
  - Personnel summary
  - Employees by discipline

### SF254 - A-E Services Questionnaire
- Firm information
- Contact details
- Parent company information
- Personnel summary
- Service capabilities
- Geographic experience
- Revenue information

### SF255 - Project-Specific Questionnaire
- Project information
- Submitting firm details
- Joint venture partners
- Outside consultants
- Project team personnel
- Relevant experience
- Authorization

### SF252 - Architect-Engineer Contract
- Contract identification
- Contractor information
- Contract details
- Period of performance
- Services description
- Signatures

---

## 🔒 Security Features

- **Input Sanitization**: All user inputs are sanitized to prevent XSS attacks
- **File Validation**: Uploaded files are validated for type and size
- **Data Validation**: Form fields are validated against expected formats
- **Local Storage**: Data is stored locally in the browser for privacy

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Lucide](https://lucide.dev/) for the icon library
- [pdf-lib](https://pdf-lib.js.org/) for PDF generation
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

---

## 📞 Support

If you have any questions or need help:

- 📧 Open an [issue](https://github.com/RahulM0398/GovForms/issues)
- 💬 Start a [discussion](https://github.com/RahulM0398/GovForms/discussions)

---

<div align="center">

**Made with ❤️ for the A-E community**

</div>
