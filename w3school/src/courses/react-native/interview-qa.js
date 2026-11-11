// React Native interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is React Native?',
      a: 'A framework that runs React components on mobile and maps them to native Android and iOS views. One JavaScript codebase targets both platforms.',
      level: 'basic',
    },
    {
      q: 'How does React Native differ from a WebView app?',
      a: 'A WebView app renders HTML and CSS in a browser inside the app. React Native uses native views, so scrolling, gestures and accessibility feel native.',
      level: 'basic',
    },
    {
      q: 'Expo versus bare React Native?',
      a: 'Expo is a managed toolchain with fast setup and over-the-air updates. Bare gives full native control and custom modules but requires Android Studio and Xcode setup.',
      level: 'intermediate',
    },
    {
      q: 'What is the role of the bridge or JSI?',
      a: 'JavaScript runs in its own thread and communicates with native code. The old bridge serialises messages asynchronously. JSI allows direct synchronous calls and is the basis of the New Architecture.',
      level: 'advanced',
    },
  ],
  'core-components': [
    {
      q: 'What is the difference between View and Text?',
      a: 'View is a layout container. Text renders text and owns text styling. Every visible string must be inside a Text component.',
      level: 'basic',
    },
    {
      q: 'When use ScrollView versus FlatList?',
      a: 'ScrollView renders all children at once, so it is fine for a short screen. FlatList virtualises and recycles rows, so it is required for long lists.',
      level: 'basic',
    },
    {
      q: 'What is Pressable?',
      a: 'A component that handles taps and exposes a pressed state for styling. It is more flexible than the older Touchable components.',
      level: 'basic',
    },
    {
      q: 'Why use react-native-safe-area-context?',
      a: 'It provides the safe area insets for notches, rounded corners and system bars, and updates when they change. The core SafeAreaView is deprecated.',
      level: 'intermediate',
    },
  ],
  styling: [
    {
      q: 'What is the default flexDirection?',
      a: 'Column. Unlike the web, React Native stacks children vertically by default.',
      level: 'basic',
    },
    {
      q: 'What does flex: 1 mean?',
      a: 'The element grows to fill the available space along the main axis. It is the standard way to make a screen fill the window.',
      level: 'basic',
    },
    {
      q: 'Why use useWindowDimensions instead of Dimensions.get?',
      a: 'useWindowDimensions is reactive and updates on rotation and split-screen. Dimensions.get is a one-time snapshot.',
      level: 'intermediate',
    },
    {
      q: 'How do you support dark mode?',
      a: 'Use useColorScheme or a theme context, define color tokens for both themes, and persist the user choice. Apply tokens consistently instead of hardcoded colors.',
      level: 'intermediate',
    },
  ],
  'props-state': [
    {
      q: 'Props versus state?',
      a: 'Props are read-only data passed from a parent. State is data owned by a component that can change and trigger a re-render.',
      level: 'basic',
    },
    {
      q: 'What does useState return?',
      a: 'The current value and a setter function. Calling the setter schedules a re-render with the new value.',
      level: 'basic',
    },
    {
      q: 'When does useEffect run?',
      a: 'After render. With an empty dependency array it runs once. Without an array it runs after every render. A cleanup function runs before the next effect or on unmount.',
      level: 'intermediate',
    },
    {
      q: 'What is derived state?',
      a: 'A value calculated during render from existing state or props, such as a filtered list or a total. Storing it separately creates synchronization bugs.',
      level: 'advanced',
    },
  ],
  lists: [
    {
      q: 'Why is FlatList faster than ScrollView?',
      a: 'FlatList renders only the visible rows and recycles components as you scroll. ScrollView renders every child immediately.',
      level: 'basic',
    },
    {
      q: 'What does keyExtractor do?',
      a: 'It returns a stable unique key for each item so React can reuse rows correctly when the data changes.',
      level: 'basic',
    },
    {
      q: 'How do you optimise a long FlatList?',
      a: 'Memoise the row, keep renderItem stable with useCallback, tune initialNumToRender and windowSize, and avoid heavy work inside renderItem.',
      level: 'intermediate',
    },
    {
      q: 'When use SectionList?',
      a: 'When the data is grouped under headers, such as settings groups or courses by category.',
      level: 'basic',
    },
  ],
  navigation: [
    {
      q: 'What is React Navigation?',
      a: 'The standard navigation library. It provides stack, tab and drawer navigators and handles the back button, params and deep links.',
      level: 'basic',
    },
    {
      q: 'How does a screen read params?',
      a: 'From route.params. Pass ids, not whole objects, so the param remains serialisable for deep links and state restoration.',
      level: 'basic',
    },
    {
      q: 'Why keep one NavigationContainer?',
      a: 'Nesting containers creates separate navigation histories and breaks back behaviour. One container at the root is the correct pattern.',
      level: 'intermediate',
    },
    {
      q: 'How do deep links work?',
      a: 'A linking config maps URL paths to screen names and params. The OS opens the app with the URL, and React Navigation selects the matching screen.',
      level: 'intermediate',
    },
  ],
  forms: [
    {
      q: 'What is a controlled TextInput?',
      a: 'One whose value comes from state and is updated through onChangeText. The component always reflects the state.',
      level: 'basic',
    },
    {
      q: 'Why validate on the server too?',
      a: 'The client can be modified or bypassed. The server is the only place that can guarantee valid data.',
      level: 'basic',
    },
    {
      q: 'What does keyboardShouldPersistTaps do?',
      a: 'It lets a tap on a button work while the keyboard is open instead of only dismissing the keyboard.',
      level: 'intermediate',
    },
    {
      q: 'How do you prevent duplicate submissions?',
      a: 'Disable the submit button while the request is in flight, guard with a loading flag, and use an idempotency key on the server for critical writes.',
      level: 'intermediate',
    },
  ],
  networking: [
    {
      q: 'Does fetch reject on HTTP errors?',
      a: 'No. It resolves for any HTTP response. Check response.ok and handle 4xx and 5xx explicitly.',
      level: 'basic',
    },
    {
      q: 'How do you model a network screen?',
      a: 'With loading, error, empty and data states. A single state object prevents contradictory combinations.',
      level: 'intermediate',
    },
    {
      q: 'How do you handle offline mode?',
      a: 'Cache the last response, show an offline banner, queue writes in an outbox, and sync when the connection returns with idempotent requests.',
      level: 'intermediate',
    },
    {
      q: 'Why not retry a POST automatically?',
      a: 'It may create duplicate records. Use an idempotency key or only retry requests known to be safe.',
      level: 'advanced',
    },
  ],
  storage: [
    {
      q: 'What is AsyncStorage?',
      a: 'An asynchronous key-value store for small, unencrypted data such as preferences. It is not a database and not secure storage.',
      level: 'basic',
    },
    {
      q: 'When use SQLite?',
      a: 'For structured data, queries, joins, progress tracking and an offline outbox. It is a real relational database inside the app.',
      level: 'intermediate',
    },
    {
      q: 'Where should tokens be stored?',
      a: 'In the Android Keystore or iOS Keychain through a library such as react-native-keychain. Never in AsyncStorage or a plain file.',
      level: 'basic',
    },
    {
      q: 'What makes offline sync safe?',
      a: 'An outbox with a synced flag, unique request ids and an idempotent server. A retry must not duplicate the effect.',
      level: 'advanced',
    },
  ],
  'native-features': [
    {
      q: 'When should you ask for a permission?',
      a: 'When the user first needs the feature, with a short explanation. Asking at launch without context reduces acceptance.',
      level: 'basic',
    },
    {
      q: 'How often should you request notification permission?',
      a: 'Once, then respect the answer. Repeating the prompt is annoying and the OS may stop showing it.',
      level: 'basic',
    },
    {
      q: 'When does adding a library require a rebuild?',
      a: 'When it contains native code. A JS-only dependency can reload instantly; a native module must be compiled into the app.',
      level: 'intermediate',
    },
    {
      q: 'Is a device id a secure identity?',
      a: 'No. It can be reset or spoofed. Use it for analytics and session binding, not authentication.',
      level: 'advanced',
    },
  ],
  performance: [
    {
      q: 'What does React.memo do?',
      a: 'It skips a re-render when props are shallow-equal. Use it on expensive components with stable props.',
      level: 'basic',
    },
    {
      q: 'Why is a huge image expensive?',
      a: 'It must be decoded at full size, using memory and CPU. Resize or request an image close to the displayed size.',
      level: 'basic',
    },
    {
      q: 'How do you find the cause of slow UI?',
      a: 'Profile with React DevTools for re-renders and the platform profiler for CPU and memory. Measure before changing code.',
      level: 'intermediate',
    },
    {
      q: 'What is the New Architecture?',
      a: 'Fabric for the renderer, TurboModules for native modules and JSI for direct calls. It reduces bridge overhead and enables synchronous native access.',
      level: 'advanced',
    },
  ],
  'projects-interview': [
    {
      q: 'What makes a good portfolio app?',
      a: 'One small, finished flow with real data, loading and error states, local persistence and a clean UI. Depth beats a large unfinished feature list.',
      level: 'basic',
    },
    {
      q: 'How do you test a screen?',
      a: 'Render it with React Native Testing Library, interact through visible labels and buttons, and assert the result the user sees.',
      level: 'intermediate',
    },
    {
      q: 'What is needed to publish on Android?',
      a: 'A signed AAB with the release key, an increasing version code, a store listing and a privacy policy. Test the release build on a real device.',
      level: 'intermediate',
    },
    {
      q: 'Why is losing the signing key a problem?',
      a: 'The store trusts that key for every update. Without it you cannot publish an update under the same app identity.',
      level: 'advanced',
    },
  ],
};
