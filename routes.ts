/**
 * this routes are publically accessible
 * @type {string[]}
 */

export const publicRoutes: string[] = ["/", "/auth/new-verification"];

/**
 * this routes are for authentication purpose
 * @type {string[]}
 */

export const authRoutes: string[] = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset-password",
  "/auth/forgot-password",
];

/**
 * The prefix for authentication routes that is used for API authentication purpose
 * @type {string}
 */

export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT: string = "/settings";
