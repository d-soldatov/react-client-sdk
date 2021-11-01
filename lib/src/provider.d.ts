import * as React from 'react';
import { LDClient } from 'launchdarkly-js-client-sdk';
import { EnhancedComponent, ProviderConfig } from './types';
import { LDContext as HocState } from './context';
/**
 * The `LDProvider` is a component which accepts a config object which is used to
 * initialize `launchdarkly-js-client-sdk`.
 *
 * This Provider does three things:
 * - It initializes the ldClient instance by calling `launchdarkly-js-client-sdk` initialize on `componentDidMount`
 * - It saves all flags and the ldClient instance in the context API
 * - It subscribes to flag changes and propagate them through the context API
 *
 * Because the `launchdarkly-js-client-sdk` in only initialized on `componentDidMount`, your flags and the
 * ldClient are only available after your app has mounted. This can result in a flicker due to flag changes at
 * startup time.
 *
 * This component can be used as a standalone provider. However, be mindful to only include the component once
 * within your application. This provider is used inside the `withLDProviderHOC` and can be used instead to initialize
 * the `launchdarkly-js-client-sdk`. For async initialization, check out the `asyncWithLDProvider` function
 */
declare class LDProvider extends React.Component<ProviderConfig, HocState> implements EnhancedComponent {
    readonly state: Readonly<HocState>;
    constructor(props: ProviderConfig);
    getReactOptions: () => {
        useCamelCaseFlagKeys: boolean;
    } | {
        useCamelCaseFlagKeys: boolean;
    };
    subscribeToChanges: (ldClient: LDClient) => void;
    initLDClient: () => Promise<void>;
    componentDidMount(): Promise<void>;
    componentDidUpdate(prevProps: ProviderConfig): Promise<void>;
    render(): JSX.Element;
}
export default LDProvider;
