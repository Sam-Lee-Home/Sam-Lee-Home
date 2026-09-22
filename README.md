# Sam Lee Home - Software Consultancy Website

Welcome to the web site of our software consultancy. This project showcases a modern approach to software engineering, cloud architecture, and the integration of AI into the development lifecycle.

## 🌐 Live Site
View the website here: [https://sam-lee-home.github.io/Sam-Lee-Home/](https://sam-lee-home.github.io/Sam-Lee-Home/)

## 🎯 Purpose
This consultancy delivers precision-engineered software through **Agentic AI**, bridging the gap between human strategic thinking and autonomous, intent-driven execution. It applies the economic principle of **Comparative Advantage** to the software lifecycle: recognizing that while AI can synthesize code, human judgment remains the scarcest and highest-leverage resource. We optimize for this by ensuring humans direct the intent while AI handles the mechanical labor of execution.

## 🧠 Our Philosophy: "Human Thinks, AI Codes"

We believe that the most effective software is produced when humans and AI operate at their respective comparative advantages:

- **Humans (Thinking):** Focus on intent, judgment, context, nuance, and discernment. Humans decide *what* problem matters and *verify* if the solution is correct and ethical.
- **AI (Coding):** Focus on synthesis, drafting, formatting, and typing. AI removes the bottleneck of manual execution, translating high-level intent into production-ready software artifacts.

### Design Principles for AI Systems
We move away from just chasing "bigger models" and instead build systems around three core pillars:
1. **Small Models:** Utilizing fast, cost-effective open-weight models (e.g., Gemma 4 31B) for reasoning and local deployment to ensure data sovereignty and reduce costs.
2. **Right Tools:** Surrounding models with a robust harness—including RAG agents, web search, and automated quality gates—so intelligence resides in the *system*, not just the weights.
3. **Tight Feedback Loops:** Implementing independent, closed-loop optimization (inspired by AutoResearch) where AI iterates through test suites and self-corrects until it surpasses the baseline.

### Design Principles for Cloud Systems
Specializing in **AWS** with a **Cloud-Native** mindset:
- **Elasticity:** Scaling performance with demand via autoscaling.
- **Operational Excellence:** Using managed services to eliminate infrastructure toil.
- **Resilience:** Designing multi-cloud ready architectures to avoid vendor lock-in.

## 🛠 Technical Stack

### Frontend & Content
- **Framework:** [Astro](https://astro.build/) (Version 7.x)
- **UI Library:** [React](https://react.dev/) (Version 19.x)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Version 4.x)
- **Content Management:** Astro Content Collections (using `.yaml` and `.md` files for structured content).
- **Icons:** Lucide React

### Infrastructure & Deployment
- **Hosting:** GitHub Pages
- **Cloud Services:** 
    - AWS Amplify (Integration for authentication/services)
    - AWS Bedrock (Agentic AI and LLM integration)
- **CI/CD:** GitHub Actions

## 📁 Project Structure

- `/web`: The primary source code for the website.
  - `/src/assets`: Static assets and media processed by the build pipeline.
  - `/src/components`: Reusable UI components (Astro & React).
  - `/src/content`: Structured content collections (philosophy, work, news, etc.) serving as the site's data layer.
  - `/src/layouts`: Page templates and structural wrappers.
  - `/src/pages`: Route definitions mapping to the site's URL structure.
  - `/src/services`: Business logic and third-party integrations (e.g., AWS Amplify).
  - `/src/styles`: Global styles and Tailwind CSS configurations.


## 🚀 Getting Started

This project is an Astro website located in the `/web` directory. All commands must be executed within the `web` folder.

### Prerequisites
- **Node.js**: $\ge$ 22.12.0
- **Package Manager**: npm

### Installation
```bash
cd web
npm install
```

### Development Workflow
We use the `npx astro` CLI for direct interaction with the framework. This provides access to a wider range of utility commands beyond standard npm scripts.

| Goal | Command | Description |
| :--- | :--- | :--- |
| **Start Dev Server** | `npx astro dev` | Starts the development server at `http://localhost:4321` |
| **Check Status** | `npx astro dev status` | Verifies if the dev server is currently running |
| **View Logs** | `npx astro dev logs` | Streams the development server logs |
| **Stop Server** | `npx astro dev stop` | Gracefully shuts down the dev server |
| **Build Project** | `npx astro build` | Compiles the site for production deployment |
| **Preview Build** | `npx astro preview` | Locally previews the production build output |

For most development tasks, start with:
```bash
npx astro dev
```