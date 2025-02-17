import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { IconSymbol } from './ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

interface Props {
  isListening: boolean;
  onPress: () => void;
}

export function RecognitionButton({ isListening, onPress }: Props) {
  const tintColor = useThemeColor({}, 'tint');
  
  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={isListening}
      style={[
        styles.button,
        { backgroundColor: `${tintColor}20` }
      ]}
    >
      {isListening ? (
        <ActivityIndicator size="large" color={tintColor} />
      ) : (
        <IconSymbol 
          name="waveform" 
          size={40} 
          color={tintColor}
        />
      )}
      <ThemedText style={styles.text}>
        {isListening ? 'Listening...' : 'Tap to Listen'}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  }
}); 