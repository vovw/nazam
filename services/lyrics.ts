export interface LyricsData {
  lyrics: string;
  timestamps?: number[]; // Optional timestamps for each line
}

export async function fetchLyrics(title: string, artist: string): Promise<LyricsData | null> {
  // TODO: Implement lyrics API integration
  return null;
} 