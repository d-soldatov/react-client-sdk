/// <reference types="launchdarkly-js-client-sdk" />
/**
 * `useLDClient` is a custom hook which returns the underlying [LaunchDarkly JavaScript SDK client object](https://launchdarkly.github.io/js-client-sdk/interfaces/_launchdarkly_js_client_sdk_.ldclient.html).
 * Like the `useFlags` custom hook, `useLDClient` also uses the `useContext` primitive to access the LaunchDarkly
 * context set up by `withLDProvider`. You will still need to use the `withLDProvider` HOC
 * to initialise the react sdk to use this custom hook.
 *
 * @return The `launchdarkly-js-client-sdk` `LDClient` object
 */
declare const useLDClient: () => import("launchdarkly-js-client-sdk").LDClient | undefined;
export default useLDClient;