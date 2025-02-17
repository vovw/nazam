import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useState } from 'react';
import { RecognitionButton } from '@/components/RecognitionButton';
import { recognizeSong, RecognitionError, type RecognizedSong } from '@/services/musicRecognition';
import { Alert } from 'react-native';

export default function HomeScreen() {
  const [isListening, setIsListening] = useState(false);
  const [currentSong, setCurrentSong] = useState<RecognizedSong | null>(null);

  const handleRecognition = async () => {
    setIsListening(true);
    try {
      const song = await recognizeSong();
      setCurrentSong(song);
    } catch (error) {
      if (error instanceof RecognitionError) {
        Alert.alert('Recognition Failed', error.message);
      } else {
        Alert.alert('Error', 'An unexpected error occurred');
      }
    } finally {
      setIsListening(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      {currentSong ? (
        <ThemedView style={styles.songContainer}>
          <ThemedText type="title">{currentSong.title}</ThemedText>
          <ThemedText type="subtitle">{currentSong.artist}</ThemedText>
        </ThemedView>
      ) : (
        <RecognitionButton 
          isListening={isListening}
          onPress={handleRecognition}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  songContainer: {
    alignItems: 'center',
    gap: 8,
  }
});
