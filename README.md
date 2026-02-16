# Digital Resume

A React + TypeScript + Vite digital resume with:
- Resume sections (`About`, `Experience`, `Skills`, `Education`, `Languages`)
- A chat assistant with a frontend-only provider architecture

Live app: [digital-resume-eight-alpha.vercel.app](https://digital-resume-eight-alpha.vercel.app)

## Interview Q&A

### What is your typical workflow from an idea, AI prototype, to production feature?

My workflow is discover, prototype, then productionize.

1. Discover: I clarify the user problem, success metrics, constraints, and failure modes.
2. Prototype fast: I build a thin vertical slice with a good UX loop first, often using mocked or deterministic AI responses.
3. Productionize incrementally: I swap mocks for real integrations behind clean interfaces, then add error handling, analytics, tests, security, performance checks, and rollout safeguards.

I keep architecture modular so the UI does not need to change when data providers evolve (for example, switching from mock to HTTP).

### What's your go-to stack and any tools/tech you're interested in?

My go-to stack is React + TypeScript on the frontend, with a strong focus on component architecture, state management, and UX quality. I usually work with Vite, TanStack Query, and modular CSS (or a design-system approach) depending on project needs.

For tooling, I rely on ESLint, TypeScript strictness, and lightweight testing to keep velocity high without losing quality. I also value CI/CD and developer experience tooling that makes delivery predictable.

Tech I am currently most interested in includes AI-assisted product features with clear UX guardrails, frontend observability and performance tooling, modern React patterns for scalable UI architecture, and accessibility/design-system consistency at scale.

### What does "good" human-AI interaction look like to you?

Good human-AI interaction is clear, trustworthy, and user-controlled.

1. Clarity: the AI should communicate what it can do, what it cannot do, and why it returned a certain result.
2. Reliability: responses should be grounded in available context, with graceful handling of uncertainty instead of confident guesses.
3. Control: users should be able to refine prompts, retry, and correct the assistant quickly without friction.
4. Feedback loop: the interface should support fast iteration, including loading states, error states, and clear next actions.

In short, good human-AI UX augments user judgment rather than replacing it.
