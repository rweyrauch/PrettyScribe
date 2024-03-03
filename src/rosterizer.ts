/*
 * Generic types and util functions for dealing with Rosterizer registries.
 */

/** Top-level registry. */
export interface Registry extends Entry {
  name: string, // Registry name
  info: {
    game: string,
    name: string, // Army name
  }
}

/** Equivalent to BattleScribe's `selection`. */
export interface Entry {
  assets: Assets;
  designation: string; // Name
  quantity: number;
  stats: Stats;
  classification: string; // Type
  tally: { [key: string]: number; };
  text: string;
  keywords: { [key: string]: string[]; };
}

export interface Assets {
  included: Entry[];
  traits: Entry[];
}

export type Stats = { [key: string]: StatValue; };

export interface StatValue {
  group: string;
  statOrder: number;
  groupOrder?: number;
  visibility: string;
  format?: string;
  value: string | number;
}

/**
 * Given generic Stats, will return an ordered list of key-value pairs that are
 * relevant (eg for a unit or a weapon).
 */
export function filterAndOrderStats(stats: Stats) {
  return Object.entries(stats)
    .filter(s => s[1].statOrder >= 0
            && s[1].groupOrder === undefined
            && s[1].visibility === 'normal')
    .sort((a, b) => a[1].statOrder - b[1].statOrder);
}

/**
 * Format a stat into a readable string.
 */
export function formatStat(stat: StatValue): string {
  const value = String(stat.value);
  return stat.format ? stat.format.replace(/{[vt]}/, value) : value;
}
