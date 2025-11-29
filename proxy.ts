export { default as proxy } from "next-auth/middleware"

// https://next-auth.js.org/tutorials/securing-pages-and-api-routes
// Matches pages that require auth
export const config = {
  matcher: [
    "/protected(.*)",
  ]
}
