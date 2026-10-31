import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function VideoSection({ productVideo, colors }) {
  if (!productVideo) {
    return (
      <Text style={[styles.noData, { color: colors?.muted || '#6B7280' }]}>
        No video available
      </Text>
    );
  }

  const html = `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><style>*{margin:0;padding:0;overflow:hidden;}html,body{width:100%;height:100%;margin:0;padding:0;}</style></head><body><iframe src="https://www.youtube-nocookie.com/embed/${productVideo}?rel=0&playsinline=1&enablejsapi=1&origin=https://www.jncomputerbd.com" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></body></html>`;

  return (
    <View style={styles.container}>
      <WebView
        source={{ html }}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        allowsFullscreenVideo
        originWhitelist={['*']}
        nestedScrollEnabled
        mediaPlaybackRequiresUserAction={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  webview: {
    width: '100%',
    height: '100%',
  },
  noData: {
    fontSize: 13,
    textAlign: 'center',
    paddingVertical: 16,
  },
});
