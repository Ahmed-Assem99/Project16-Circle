## Circle

Circle is a social posting app built with React and TypeScript. Users can compose a post with text, attach an image, preview or remove the image, and submit the post to the feed.

## Features

- Create posts with a caption, an image, or both.
- Preview and remove an image before posting.
- Show a loading state while a post is being submitted.
- Refresh the posts after a successful submission.
- Delete posts created by the user.

## Tech stack

- React
- TypeScript
- Vite
- HeroUI
- React Icons

## Getting started

### Requirements

- Node.js
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Vite will print the local URL in the terminal.

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Project structure

```text
src/
├── components/   # Reusable UI components, including the post composer
└── services/     # API service modules
```

## Notes

Post creation is handled by the posts service. Check the service configuration and any project-specific environment variables before running the app against an API.
