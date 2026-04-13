import { Injectable } from '@angular/core';
import emojiData from 'emojibase-data/fr/data.json';
import { EMOJI_SYNONYMS } from '../data/emoji-synonyms';

export interface EmojiEntry {
  label: string;
  emoji: string;
}

interface EmojibaseItem {
  label: string;
  emoji: string;
  group?: number;
  tags?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class EmojiService {
  private readonly RELEVANT_GROUPS_AUTO = [4]; // Food & Drink

  // Données brutes du package (Uniquement Nourriture)
  private readonly rawFoodEmojis = (emojiData as EmojibaseItem[]).filter(item =>
    this.RELEVANT_GROUPS_AUTO.includes(item.group ?? -1)
  );

  /**
   * Nettoie une chaîne : minuscules + suppression des accents
   * Ex: "Pâtes" -> "pates", "Bœuf" -> "boeuf"
   */
  private normalize(str: string): string {
    return str
      .toLowerCase()
      .normalize("NFD") // Sépare les accents (é -> e + ')
      .replace(/[\u0300-\u036f]/g, ""); // Supprime les marques d'accents
  }

  search(query: string): EmojiEntry[] {
    const rawQuery = query.trim();
    if (rawQuery.length < 2) return [];

    // On normalise la recherche de l'utilisateur (ex: "pates")
    const normalizedQuery = this.normalize(rawQuery);

    const results: EmojiEntry[] = [];
    const seenLabels = new Set<string>();
    const seenEmojis = new Set<string>();

    // 1. RECHERCHE DANS LES SYNONYMES (Prioritaire)
    for (const [emojiChar, synonyms] of Object.entries(EMOJI_SYNONYMS)) {
      // On cherche parmi les synonymes en les normalisant aussi
      const matches = synonyms.filter(synonym =>
        this.normalize(synonym).includes(normalizedQuery)
      );

      matches.forEach(matchName => {
        const normalizedName = this.normalize(matchName);
        if (!seenLabels.has(normalizedName)) {
          results.push({
            label: matchName,
            emoji: emojiChar,
          });
          seenLabels.add(normalizedName);
          seenEmojis.add(emojiChar);
        }
      });
    }

    // 2. RECHERCHE DANS LE PACKAGE OFFICIEL
    // On exclut les emojis déjà couverts par les synonymes (même emoji, label différent)
    const standardMatches = this.rawFoodEmojis.filter(item => {
      const label = item.label || '';
      // On compare le label sans accent avec la requête sans accent
      // On vérifie aussi les tags s'ils existent
      return this.normalize(label).includes(normalizedQuery) ||
             item.tags?.some((tag: string) => this.normalize(tag).includes(normalizedQuery));
    });

    standardMatches.forEach(item => {
      if (!seenLabels.has(this.normalize(item.label)) && !seenEmojis.has(item.emoji)) {
        results.push({
          label: item.label,
          emoji: item.emoji,
        });
        seenLabels.add(this.normalize(item.label));
        seenEmojis.add(item.emoji);
      }
    });

    // 3. TRI INTELLIGENT
    return results.sort((a, b) => {
      // On compare sur les versions normalisées pour le tri aussi
      const normA = this.normalize(a.label);
      const normB = this.normalize(b.label);
      
      const aStarts = normA.startsWith(normalizedQuery);
      const bStarts = normB.startsWith(normalizedQuery);
      
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return normA.localeCompare(normB);
    });
  }

}
