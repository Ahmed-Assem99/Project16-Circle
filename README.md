<div align="center">

# ◯ Circle

**A social media web app where people sign up, share posts with photos, and talk in the comments.**

Built with React 19, TypeScript and Tailwind CSS v4, and connected to a live REST API.

[Live Demo](#) · [Source Code](https://github.com/Ahmed-Assem99/Project16-Circle)

<!-- TODO: replace the "#" above with your Vercel URL -->

</div>

---

<!-- TODO: add screenshots. Save them in a /screenshots folder and uncomment:
<p align="center">
  <img src="screenshots/feed.png" width="48%" alt="Feed" />
  <img src="screenshots/signin.png" width="48%" alt="Sign in" />
</p>
-->

## Overview

Circle is a single-page social app. Users create an account, sign in, and land on a feed of posts from the community. They can publish their own posts (text, a photo, or both), open any post to read the full discussion, and add, edit or delete their own comments.

I built it to practice the parts of front-end work that show up in real products: authentication, protected routes, form validation, talking to an API, and a consistent, responsive UI.

## Features

**Authentication**
- Sign-up and sign-in forms with field-level validation (Zod + React Hook Form)
- Strict rules: password strength, matching password confirmation, valid email, and an 18+ age check on date of birth
- Server error messages shown inline, with loading states on submit
- Session kept in a token; on reload the app checks the token against the API and signs the user out if it has expired

**Routing and access control**
- `ProtectedRoute` sends signed-out users to the sign-in page
- `ProtectedAuthRoute` keeps signed-in users away from the sign-in and sign-up pages
- Two layouts: a full-screen auth layout and a main app layout with a navbar
- Dynamic post page (`/posts/:postId`) and a custom 404 page

**Posts**
- Create a post with a caption, an image, or both
- Image preview before posting, with a button to remove it
- Delete your own posts (the delete button only appears for the author)
- Like and comment counts on every post

**Comments**
- Add comments from the feed or the post details page
- Edit and delete your own comments in place
- The feed shows each post's top comment; the details page shows the full thread

**UI and design**
- Responsive, mobile-first layout that works from phones to wide screens
- Light and dark mode support through HeroUI's semantic color tokens
- A small design system: one shared `card` utility, a fixed spacing and corner-radius scale, and the Inter font

## Tech Stack

| Area | Tools |
| --- | --- |
| Framework | React 19, TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS v4, HeroUI component library |
| Routing | React Router v7 |
| Forms and validation | React Hook Form, Zod |
| HTTP | Axios |
| State | React Context API |
| Icons | React Icons |
| Deployment | Vercel |

## Technical Highlights

- **Service layer.** All API calls live in three classes: `authService`, `postsService` and `commentsService`. Components never call Axios directly, so endpoints and headers are defined in one place.
- **Typed data.** API responses, posts, comments, users and pagination each have TypeScript interfaces, and callback props such as `createComment` and `editComment` have their own function types.
- **Validation as schemas.** Form rules are Zod schemas kept separate from the UI, including a cross-field check for password confirmation and a custom age check.
- **Auth state in Context.** A single `AuthContext` holds the logged-in state, the current user and a loading flag. The layouts show a spinner until the session check finishes, so protected pages never flash for signed-out users.
- **Ownership checks.** Edit and delete controls appear only when the signed-in user's ID matches the author of the post or comment.
- **SPA deployment.** `vercel.json` rewrites every route to `index.html`, so deep links like `/posts/123` work on refresh.

## Project Structure

```text
src/
├── components/       # Navbar, Post, CreatePost, Comment, CreateComment
├── pages/            # Feed, PostDetails, Profile, SignIn, SignUp, NotFound
├── layouts/          # AuthLayout and MainLayout
├── protectedRoutes/  # Route guards for signed-in and signed-out users
├── contexts/         # AuthContext (session and current user)
├── services/         # API classes for auth, posts and comments
├── schemas/          # Zod validation schemas
├── interfaces/       # TypeScript models (Post, Comment, User, ...)
├── types/            # Form and API response types
└── utils/            # Regex patterns and helper functions
```

## Getting Started

**Requirements:** Node.js 18 or newer and npm.

```bash
# 1. Clone the repository
git clone https://github.com/Ahmed-Assem99/Project16-Circle.git
cd Project16-Circle

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Vite prints the local URL (usually `http://localhost:5173`). The app uses a hosted API, so no backend setup or environment variables are needed.

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Roadmap

- Profile page with the user's own posts and a photo upload
- Working like and share buttons
- Server-state caching with TanStack Query
- Pagination or infinite scroll on the feed
- A shared Axios instance with an interceptor for the auth token
- Unit tests for the schemas and components

## Acknowledgements

The backend API is provided by [Route Academy](https://route-posts.routemisr.com) as part of its front-end development program. All front-end code, structure and styling are my own.

## Contact

Built by [@Ahmed-Assem99](https://github.com/Ahmed-Assem99) · [LinkedIn](#)

<!-- TODO: replace the "#" above with your LinkedIn URL -->
