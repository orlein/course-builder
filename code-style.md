# General 
* Never create useless comments.
* Try to keep the code clean and readable.
* Always use 'if-return' pattern for conditional statements.
* Follow `.prettierrc` for code formatting.
* Use Korean for information texts.

# React
## Version
* Always use the version 19.

## Component
* Always use React function components with `function` keyword.
* Prioritize the use of React Server Components over React Client Components.
* When the props are not used, empty the paramter.

## Hooks
* Avoid using `useEffect`.

## Server Action
* Always use server actions for server side actions.

# TypeScript
* This project uses TypeScript.
* Always use `PropsWithChildren` type for props.
* Try to use `export default` for components.
* Never use `any` type.
* Never use empty type like `{}`

# Next.js
## Version
* Always use the version 15.

## Routing
* Use next.js app router.
* Use page.tsx for pages.

## Components
* Use next.js image component.
* Use next.js link component.

## API
* Use next.js api routes for server side actions.

# Supabase
* This project uses Supabase.
* For the Supabase server side auth, use '@/utils/supabase/server'.
* For the Supabase client side auth, use '@/utils/supabase/client'.

# Database
* This project uses PostgreSQL.
* This project uses drizzle orm.

# Styling
* This project uses Tailwind CSS.
* This project uses shadcn.
