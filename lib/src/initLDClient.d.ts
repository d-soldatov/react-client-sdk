import { LDFlagSet, LDOptions, LDUser } from 'launchdarkly-js-client-sdk';
import { AllFlagsLDClient, LDReactOptions } from './types';
/**
 * Internal function to initialize the `LDClient`.
 *
 * @param clientSideID Your project and environment specific client side ID
 * @param user A LaunchDarkly user object
 * @param reactOptions Initialization options for the LaunchDarkly React SDK
 * @param options LaunchDarkly initialization options
 * @param targetFlags If specified, `launchdarkly-react-client-sdk` will only request and listen to these flags.
 *
 * @see `ProviderConfig` for more details about the parameters
 * @return An initialized client and flags
 */
declare const initLDClient: (clientSideID: string, user?: LDUser, reactOptions?: LDReactOptions, options?: LDOptions | undefined, targetFlags?: LDFlagSet | undefined) => Promise<AllFlagsLDClient>;
export default initLDClient;