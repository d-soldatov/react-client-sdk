import React from 'react';
import { ProviderConfig } from './types';
/**
 * This is an async function which initializes LaunchDarkly's JS SDK (`launchdarkly-js-client-sdk`)
 * and awaits it so all flags and the ldClient are ready before the consumer app is rendered.
 *
 * The difference between `withLDProvider` and `asyncWithLDProvider` is that `withLDProvider` initializes
 * `launchdarkly-js-client-sdk` at componentDidMount. This means your flags and the ldClient are only available after
 * your app has mounted. This can result in a flicker due to flag changes at startup time.
 *
 * `asyncWithLDProvider` initializes `launchdarkly-js-client-sdk` at the entry point of your app prior to render.
 * This means that your flags and the ldClient are ready at the beginning of your app. This ensures your app does not
 * flicker due to flag changes at startup time.
 *
 * `asyncWithLDProvider` accepts a config object which is used to initialize `launchdarkly-js-client-sdk`.
 * It returns a provider which is a React FunctionComponent which:
 * - saves all flags and the ldClient instance in the context API
 * - subscribes to flag changes and propagate them through the context API
 *
 * @param config - The configuration used to initialize LaunchDarkly's JS SDK
 */
export default function asyncWithLDProvider(config: ProviderConfig): Promise<React.FunctionComponent<{}>>;