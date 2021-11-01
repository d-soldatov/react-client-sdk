import { LDClient, LDFlagChangeset, LDFlagSet } from 'launchdarkly-js-client-sdk';
import { LDReactOptions } from './types';
/**
 * Transforms a set of flags so that their keys are camelCased. This function ignores
 * flag keys which start with `$`.
 *
 * @param rawFlags A mapping of flag keys and their values
 * @return A transformed `LDFlagSet` with camelCased flag keys
 */
export declare const camelCaseKeys: {
    (rawFlags: LDFlagSet): LDFlagSet;
    /**
     * @deprecated The `camelCaseKeys.camelCaseKeys` property will be removed in a future version,
     * please update your code to use the `camelCaseKeys` function directly.
     */
    camelCaseKeys: any;
};
/**
 * Gets the flags to pass to the provider from the changeset.
 *
 * @param changes the `LDFlagChangeset` from the ldClient onchange handler.
 * @param targetFlags if targetFlags are specified, changes to other flags are ignored and not returned in the
 * flattened `LDFlagSet`
 * @param reactOptions reactOptions.useCamelCaseFlagKeys determines whether to change the flag keys to camelCase
 * @return an `LDFlagSet` with the current flag values from the LDFlagChangeset filtered by `targetFlags`. The returned
 * object may be empty `{}` if none of the targetFlags were changed.
 */
export declare const getFlattenedFlagsFromChangeset: (changes: LDFlagChangeset, targetFlags: LDFlagSet | undefined, reactOptions: LDReactOptions) => LDFlagSet;
/**
 * Retrieves flag values.
 *
 * @param ldClient LaunchDarkly client
 * @param reactOptions Initialization options for the LaunchDarkly React SDK
 * @param targetFlags If specified, `launchdarkly-react-client-sdk` will only request and listen to these flags.
 *
 * @returns an `LDFlagSet` with the current flag values from LaunchDarkly filtered by `targetFlags`.
 */
export declare const fetchFlags: (ldClient: LDClient, reactOptions?: LDReactOptions, targetFlags?: LDFlagSet | undefined) => LDFlagSet;
declare const _default: {
    camelCaseKeys: {
        (rawFlags: LDFlagSet): LDFlagSet;
        /**
         * @deprecated The `camelCaseKeys.camelCaseKeys` property will be removed in a future version,
         * please update your code to use the `camelCaseKeys` function directly.
         */
        camelCaseKeys: any;
    };
    getFlattenedFlagsFromChangeset: (changes: LDFlagChangeset, targetFlags: LDFlagSet | undefined, reactOptions: LDReactOptions) => LDFlagSet;
    fetchFlags: (ldClient: LDClient, reactOptions?: LDReactOptions, targetFlags?: LDFlagSet | undefined) => LDFlagSet;
};
export default _default;
