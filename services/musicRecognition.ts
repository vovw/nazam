import * as ExpoShazamKit from 'expo-shazamkit';

// This is a placeholder for the actual implementation
export interface RecognizedSong {
  title: string;
  artist: string;
  timestamp: number;
  artworkURL?: string;
}

export class RecognitionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RecognitionError';
  }
}

export async function recognizeSong(): Promise<RecognizedSong> {
  try {
    const results = await ExpoShazamKit.startListening();
    
    if (!results.length) {
      throw new RecognitionError('No song detected');
    }

    const song = results[0];
    return {
      title: song.title,
      artist: song.artist,
      timestamp: Date.now(),
      artworkURL: song.artworkURL
    };
  } catch (error) {
    if (error instanceof RecognitionError) {
      throw error;
    }
    throw new RecognitionError('Failed to recognize song');
  }
} 