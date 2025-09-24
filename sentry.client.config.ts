// // import * as Sentry from "@sentry/nextjs";

// // Sentry.init({
// //   dsn: "https://88849b585e9093cf7255a60caa8ae666@o4510073516916736.ingest.us.sentry.io/4510073521045504",

// //   integrations: [
// //     Sentry.replayIntegration({
// //       maskAllText: false,
// //       blockAllMedia: false,
// //     }),
// //   ],
// //   // Session Replay
// //   replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
// //   replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
// // });
// import * as Sentry from "@sentry/nextjs";

// Sentry.init({
//   dsn: "https://88849b585e9093cf7255a60caa8ae666@o4510073516916736.ingest.us.sentry.io/4510073521045504",
//   tracesSampleRate: 1.0,
//   tracePropagationTargets: ["https://myproject.org", /^\/api\//],

//   // Replays setup
//   replaysSessionSampleRate: 0.1,  // capture 10% of all sessions
//   replaysOnErrorSampleRate: 1.0,  // always capture a replay when an error happens
//   integrations: [
//     Sentry.replayIntegration({
//       maskAllText: false,
//       blockAllMedia: false,
//     }),
//     Sentry.feedbackIntegration({
//       // Additional SDK configuration goes in here, for example:
//       colorScheme: "system",
//     })
//   ],
// });

