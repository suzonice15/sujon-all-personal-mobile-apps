// React Native chapter: Animations & Publishing.

export default {
  id: 'animations-publishing',
  title: 'Animation & Release',
  description: 'Reanimated, lists and store publishing',
  icon: 'animation',
  lessons: [
    {
      id: 'rn-reanimated',
      title: 'Reanimated basics',
      blocks: [
        { type: 'text', value: 'Reanimated runs animations on the UI thread, so they stay smooth while JavaScript is busy. Shared values hold the animated state and useAnimatedStyle maps it to styles.' },
        { type: 'code', lang: 'rn', tryIt: false, value: `import Animated, {\n  useSharedValue,\n  useAnimatedStyle,\n  withSpring,\n} from 'react-native-reanimated';\n\nexport function LikeButton() {\n  const scale = useSharedValue(1);\n  const style = useAnimatedStyle(() => ({\n    transform: [{ scale: scale.value }],\n  }));\n\n  return (\n    <Pressable\n      onPress={() => {\n        scale.value = withSpring(1.25, {}, () => {\n          scale.value = withSpring(1);\n        });\n      }}\n    >\n      <Animated.View style={style}>\n        <Text>Like</Text>\n      </Animated.View>\n    </Pressable>\n  );\n}` },
        { type: 'note', value: 'Do not read a shared value during render. Read it inside an animated style or a worklet.' },
      ],
    },
    {
      id: 'rn-gestures',
      title: 'Gestures and transitions',
      blocks: [
        { type: 'text', value: 'Gesture Handler describes gestures declaratively. Combine a pan gesture with a spring to build a swipe-to-dismiss card without re-rendering React.' },
        { type: 'code', lang: 'rn', tryIt: false, value: `const pan = Gesture.Pan()\n  .onUpdate((event) => {\n    translateX.value = event.translationX;\n  })\n  .onEnd(() => {\n    translateX.value = withSpring(0);\n  });\n\nreturn (\n  <GestureDetector gesture={pan}>\n    <Animated.View style={[styles.card, animatedStyle]} />\n  </GestureDetector>\n);` },
        { type: 'list', items: [
          'Animate transform and opacity, not width',
          'Keep the gesture handler on the smallest view',
          'Respect reduced motion',
          'Measure on a low-end device',
        ] },
        { type: 'note', value: 'A 300ms spring feels responsive. A one-second animation feels broken.' },
      ],
    },
    {
      id: 'rn-release',
      title: 'Publishing to the stores',
      blocks: [
        { type: 'text', value: 'A release build needs a keystore, a version code that increases on every upload, and store assets. Test the signed build on a real device before uploading.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `cd android\n./gradlew bundleRelease\n\n# Sign and verify\napksigner sign --ks release.keystore app-release.apk\napksigner verify --print-certs app-release.apk\n\nadb install -r app-release.apk` },
        { type: 'list', items: [
          'Increment versionCode every upload',
          'Keep the keystore backed up',
          'Test the release build, not only debug',
          'Prepare screenshots and a privacy policy',
          'Use staged rollout for a risky release',
        ] },
        { type: 'note', value: 'Losing the upload keystore means you cannot update the app under the same package. Back it up in a secret store.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'animations-publishing',
      q: 'Why use Reanimated?',
      options: ['Smaller bundle', 'Animations run on the UI thread', 'It replaces React', 'It stores data'],
      answer: 1,
      explain: 'It keeps animation off the JS thread.',
    },
    {
      chapterId: 'animations-publishing',
      q: 'What should you animate?',
      options: ['Width and height', 'Transform and opacity', 'Layout every frame', 'Text content'],
      answer: 1,
      explain: 'Transforms and opacity are cheap.',
    },
    {
      chapterId: 'animations-publishing',
      q: 'What must increase on every store upload?',
      options: ['The app name', 'versionCode', 'The icon', 'The bundle id'],
      answer: 1,
      explain: 'Each upload needs a new versionCode.',
    },
    {
      chapterId: 'animations-publishing',
      q: 'Why test a signed release build?',
      options: ['It is faster', 'Minification and signing can break the app', 'It is required by law', 'To cache'],
      answer: 1,
      explain: 'Release-only bugs are common.',
    },
  ],
};
