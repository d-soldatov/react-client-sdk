import * as React from 'react';
import React__default, { createContext, useState, useEffect, useContext } from 'react';
import { initialize } from 'launchdarkly-js-client-sdk';
import camelCase from 'lodash.camelcase';
import hoistNonReactStatics from 'hoist-non-react-statics';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

/**
 * Contains default values for the `reactOptions` object.
 */
var defaultReactOptions = { useCamelCaseFlagKeys: true };

/**
 * @ignore
 */
var context = createContext({ flags: {}, ldClient: undefined });
var 
/**
 * @ignore
 */
Provider = context.Provider, 
/**
 * @ignore
 */
Consumer = context.Consumer;

/**
 * Transforms a set of flags so that their keys are camelCased. This function ignores
 * flag keys which start with `$`.
 *
 * @param rawFlags A mapping of flag keys and their values
 * @return A transformed `LDFlagSet` with camelCased flag keys
 */
var camelCaseKeys = function (rawFlags) {
    var flags = {};
    for (var rawFlag in rawFlags) {
        // Exclude system keys
        if (rawFlag.indexOf('$') !== 0) {
            flags[camelCase(rawFlag)] = rawFlags[rawFlag]; // tslint:disable-line:no-unsafe-any
        }
    }
    return flags;
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
var getFlattenedFlagsFromChangeset = function (changes, targetFlags, reactOptions) {
    var flattened = {};
    for (var key in changes) {
        if (!targetFlags || targetFlags[key] !== undefined) {
            // tslint:disable-next-line:no-unsafe-any
            var flagKey = reactOptions.useCamelCaseFlagKeys ? camelCase(key) : key;
            flattened[flagKey] = changes[key].current;
        }
    }
    return flattened;
};
/**
 * Retrieves flag values.
 *
 * @param ldClient LaunchDarkly client
 * @param reactOptions Initialization options for the LaunchDarkly React SDK
 * @param targetFlags If specified, `launchdarkly-react-client-sdk` will only request and listen to these flags.
 *
 * @returns an `LDFlagSet` with the current flag values from LaunchDarkly filtered by `targetFlags`.
 */
var fetchFlags = function (ldClient, reactOptions, targetFlags) {
    if (reactOptions === void 0) { reactOptions = defaultReactOptions; }
    var rawFlags = {};
    if (targetFlags) {
        for (var flag in targetFlags) {
            rawFlags[flag] = ldClient.variation(flag, targetFlags[flag]);
        }
    }
    else {
        rawFlags = ldClient.allFlags();
    }
    return reactOptions.useCamelCaseFlagKeys ? camelCaseKeys(rawFlags) : rawFlags;
};
/**
 * @deprecated The `camelCaseKeys.camelCaseKeys` property will be removed in a future version,
 * please update your code to use the `camelCaseKeys` function directly.
 */
// tslint:disable-next-line deprecation
camelCaseKeys.camelCaseKeys = camelCaseKeys;

var version = "2.23.2";

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
var initLDClient = function (clientSideID, user, reactOptions, options, targetFlags) {
    if (user === void 0) { user = { anonymous: true }; }
    if (reactOptions === void 0) { reactOptions = defaultReactOptions; }
    return __awaiter(void 0, void 0, void 0, function () {
        var allOptions, ldClient;
        return __generator(this, function (_a) {
            allOptions = __assign({ wrapperName: 'react-client-sdk', wrapperVersion: version }, options);
            ldClient = initialize(clientSideID, user, allOptions);
            return [2 /*return*/, new Promise(function (resolve) {
                    ldClient.on('ready', function () {
                        var flags = fetchFlags(ldClient, reactOptions, targetFlags);
                        resolve({ flags: flags, ldClient: ldClient });
                    });
                })];
        });
    });
};

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
var LDProvider = /** @class */ (function (_super) {
    __extends(LDProvider, _super);
    function LDProvider(props) {
        var _this = _super.call(this, props) || this;
        _this.getReactOptions = function () { return (__assign(__assign({}, defaultReactOptions), _this.props.reactOptions)); };
        _this.subscribeToChanges = function (ldClient) {
            var targetFlags = _this.props.flags;
            ldClient.on('change', function (changes) {
                var flattened = getFlattenedFlagsFromChangeset(changes, targetFlags, _this.getReactOptions());
                if (Object.keys(flattened).length > 0) {
                    _this.setState(function (_a) {
                        var flags = _a.flags;
                        return ({ flags: __assign(__assign({}, flags), flattened) });
                    });
                }
            });
        };
        _this.initLDClient = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, clientSideID, flags, options, user, reactOptions, _b, fetchedFlags, ldClient;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, clientSideID = _a.clientSideID, flags = _a.flags, options = _a.options, user = _a.user;
                        reactOptions = this.getReactOptions();
                        return [4 /*yield*/, initLDClient(clientSideID, user, reactOptions, options, flags)];
                    case 1:
                        _b = _c.sent(), fetchedFlags = _b.flags, ldClient = _b.ldClient;
                        this.setState({ flags: fetchedFlags, ldClient: ldClient });
                        this.subscribeToChanges(ldClient);
                        return [2 /*return*/];
                }
            });
        }); };
        var options = props.options;
        _this.state = {
            flags: {},
            ldClient: undefined,
        };
        if (options) {
            var bootstrap = options.bootstrap;
            if (bootstrap && bootstrap !== 'localStorage') {
                var useCamelCaseFlagKeys = _this.getReactOptions().useCamelCaseFlagKeys;
                var flags = useCamelCaseFlagKeys ? camelCaseKeys(bootstrap) : bootstrap;
                _this.state = {
                    flags: flags,
                    ldClient: undefined,
                };
            }
        }
        return _this;
    }
    LDProvider.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, user, deferInitialization;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, user = _a.user, deferInitialization = _a.deferInitialization;
                        if (deferInitialization && !user) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.initLDClient()];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LDProvider.prototype.componentDidUpdate = function (prevProps) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, user, deferInitialization, userJustLoaded;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, user = _a.user, deferInitialization = _a.deferInitialization;
                        userJustLoaded = !prevProps.user && user;
                        if (!(deferInitialization && userJustLoaded)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initLDClient()];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    LDProvider.prototype.render = function () {
        return React.createElement(Provider, { value: this.state }, this.props.children);
    };
    return LDProvider;
}(React.Component));

/**
 * `withLDProvider` is a function which accepts a config object which is used to
 * initialize `launchdarkly-js-client-sdk`.
 *
 * This HOC handles passing configuration to the `LDProvider`, which does the following:
 * - It initializes the ldClient instance by calling `launchdarkly-js-client-sdk` initialize on `componentDidMount`
 * - It saves all flags and the ldClient instance in the context API
 * - It subscribes to flag changes and propagate them through the context API
 *
 * The difference between `withLDProvider` and `asyncWithLDProvider` is that `withLDProvider` initializes
 * `launchdarkly-js-client-sdk` at `componentDidMount`. This means your flags and the ldClient are only available after
 * your app has mounted. This can result in a flicker due to flag changes at startup time.
 *
 * `asyncWithLDProvider` initializes `launchdarkly-js-client-sdk` at the entry point of your app prior to render.
 * This means that your flags and the ldClient are ready at the beginning of your app. This ensures your app does not
 * flicker due to flag changes at startup time.
 *
 * @param config - The configuration used to initialize LaunchDarkly's JS SDK
 * @return A function which accepts your root React component and returns a HOC
 */
function withLDProvider(config) {
    return function withLDProviderHoc(WrappedComponent) {
        var userReactOptions = config.reactOptions;
        var reactOptions = __assign(__assign({}, defaultReactOptions), userReactOptions);
        var providerProps = __assign(__assign({}, config), { reactOptions: reactOptions });
        var HoistedComponent = /** @class */ (function (_super) {
            __extends(HoistedComponent, _super);
            function HoistedComponent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            HoistedComponent.prototype.render = function () {
                return (React.createElement(LDProvider, __assign({}, providerProps),
                    React.createElement(WrappedComponent, __assign({}, this.props))));
            };
            return HoistedComponent;
        }(React.Component));
        hoistNonReactStatics(HoistedComponent, WrappedComponent);
        return HoistedComponent;
    };
}

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
function asyncWithLDProvider(config) {
    return __awaiter(this, void 0, void 0, function () {
        var clientSideID, user, targetFlags, options, userReactOptions, reactOptions, ldClient, LDProvider;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    clientSideID = config.clientSideID, user = config.user, targetFlags = config.flags, options = config.options, userReactOptions = config.reactOptions;
                    reactOptions = __assign(__assign({}, defaultReactOptions), userReactOptions);
                    return [4 /*yield*/, initLDClient(clientSideID, user, reactOptions, options, targetFlags)];
                case 1:
                    ldClient = (_a.sent()).ldClient;
                    LDProvider = function (_a) {
                        var children = _a.children;
                        var _b = useState({
                            flags: fetchFlags(ldClient, reactOptions, targetFlags),
                            ldClient: ldClient,
                        }), ldData = _b[0], setLDData = _b[1];
                        useEffect(function () {
                            if (options) {
                                var bootstrap = options.bootstrap;
                                if (bootstrap && bootstrap !== 'localStorage') {
                                    var bootstrappedFlags_1 = reactOptions.useCamelCaseFlagKeys ? camelCaseKeys(bootstrap) : bootstrap;
                                    setLDData(function (prev) { return (__assign(__assign({}, prev), { flags: bootstrappedFlags_1 })); });
                                }
                            }
                            ldClient.on('change', function (changes) {
                                var flattened = getFlattenedFlagsFromChangeset(changes, targetFlags, reactOptions);
                                if (Object.keys(flattened).length > 0) {
                                    setLDData(function (prev) { return (__assign(__assign({}, prev), { flags: __assign(__assign({}, prev.flags), flattened) })); });
                                }
                            });
                        }, []);
                        return React__default.createElement(Provider, { value: ldData }, children);
                    };
                    return [2 /*return*/, LDProvider];
            }
        });
    });
}

/**
 * withLDConsumer is a function which accepts an optional options object and returns a function
 * which accepts your React component. This function returns a HOC with flags
 * and the ldClient instance injected via props.
 *
 * @param options - If you need only the `ldClient` instance and not flags, then set `{ clientOnly: true }`
 * to only pass the ldClient prop to your component. Defaults to `{ clientOnly: false }`.
 * @return A HOC with flags and the `ldClient` instance injected via props
 */
function withLDConsumer(options) {
    if (options === void 0) { options = { clientOnly: false }; }
    return function withLDConsumerHoc(WrappedComponent) {
        return function (props) { return (React.createElement(Consumer, null, function (_a) {
            var flags = _a.flags, ldClient = _a.ldClient;
            if (options.clientOnly) {
                return React.createElement(WrappedComponent, __assign({ ldClient: ldClient }, props));
            }
            return React.createElement(WrappedComponent, __assign({ flags: flags, ldClient: ldClient }, props));
        })); };
    };
}

/**
 * `useFlags` is a custom hook which returns all feature flags. It uses the `useContext` primitive
 * to access the LaunchDarkly context set up by `withLDProvider`. As such you will still need to
 * use the `withLDProvider` HOC at the root of your app to initialize the React SDK and populate the
 * context with `ldClient` and your flags.
 *
 * @return All the feature flags configured in your LaunchDarkly project
 */
var useFlags = function () {
    var flags = useContext(context).flags;
    return flags;
};

// tslint:disable:max-line-length
/**
 * `useLDClient` is a custom hook which returns the underlying [LaunchDarkly JavaScript SDK client object](https://launchdarkly.github.io/js-client-sdk/interfaces/_launchdarkly_js_client_sdk_.ldclient.html).
 * Like the `useFlags` custom hook, `useLDClient` also uses the `useContext` primitive to access the LaunchDarkly
 * context set up by `withLDProvider`. You will still need to use the `withLDProvider` HOC
 * to initialise the react sdk to use this custom hook.
 *
 * @return The `launchdarkly-js-client-sdk` `LDClient` object
 */
// tslint:enable:max-line-length
var useLDClient = function () {
    var ldClient = useContext(context).ldClient;
    return ldClient;
};

export { LDProvider, asyncWithLDProvider, camelCaseKeys, useFlags, useLDClient, withLDConsumer, withLDProvider };
//# sourceMappingURL=index.esm.js.map
