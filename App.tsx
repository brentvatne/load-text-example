import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

function TextFileContents({ source }: { source: number }) {
  const [text, setText] = useState('');

  useEffect(() => {
    async function readFileAsync() {
      const module = Asset.fromModule(source);
      await module.downloadAsync();
      const contents = await FileSystem.readAsStringAsync(module.localUri!);
      setText(contents);
    }

    readFileAsync();
  }, [source])

  return <Text>{text}</Text>
}

export default function App() {
  return (
    <View style={styles.container}>
      <TextFileContents source={require('./hello.txt')} />
      <TextFileContents source={require('./hello.md')} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
