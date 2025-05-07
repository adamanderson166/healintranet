# HEAL Intranet

A modern, professional intranet platform for HEAL company, designed to manage company data and showcase products. This platform serves as a central hub for communication, resource sharing, and collaboration across the organization.

## Features

- **Company Resources**: Access all company documents, PDFs, and technical documentation
- **Mike's Videos**: Training materials and informational videos
- **To-Do List**: Manage tasks and company objectives
- **Product Roadmap**: Track product development plans
- **Smart Chatbot**: AI-powered assistant for instant answers
- **Organization Chart**: Visualize company structure
- **Employee Benefits**: Access benefits and support resources
- **WISE Program**: Wellness, Innovation, Skills, and Education initiatives
- **Mental Health Resources**: Support for employee well-being
- **Onboarding Tools**: Resources for new employees

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Heroicons
- **State Management**: React Hooks

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/healintranet.git
   cd healintranet
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── (routes)/          # Route groups
│   │   ├── dashboard/     # Dashboard page
│   │   ├── resources/     # Company resources
│   │   ├── wise/          # WISE program
│   │   ├── benefits/      # Employee benefits
│   │   ├── chatbot/       # Smart chatbot
│   │   ├── org-chart/     # Organization chart
│   │   ├── roadmap/       # Product roadmap
│   │   ├── videos/        # Mike's videos
│   │   └── todos/         # To-do list
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── sections/         # Page sections
│   └── ui/              # UI components
└── styles/              # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
