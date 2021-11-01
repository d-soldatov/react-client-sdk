/// <reference types="react" />
import { LDClient, LDFlagSet } from 'launchdarkly-js-client-sdk';
/**
 * The LaunchDarkly context stored in the Provider state and passed to consumers.
 */
interface LDContext {
    /**
     * Contains all flags from LaunchDarkly. This object will always exist but will be empty {} initially
     * until flags are fetched from the LaunchDarkly servers.
     */
    flags: LDFlagSet;
    /**
     * An instance of `LDClient` from the LaunchDarkly JS SDK (`launchdarkly-js-client-sdk`).
     * This will be be undefined initially until initialization is complete.
     *
     * @see https://docs.launchdarkly.com/sdk/client-side/javascript
     */
    ldClient?: LDClient;
}
/**
 * @ignore
 */
declare const context: import("react").Context<LDContext>;
declare const 
/**
 * @ignore
 */
Provider: import("react").Provider<LDContext>, 
/**
 * @ignore
 */
Consumer: import("react").Consumer<LDContext>;
export { Provider, Consumer, LDContext };
export default context;
