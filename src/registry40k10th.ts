import {Wh40k} from "./roster40k10th";
import { filterAndOrderStats, formatStat, Entry, Registry } from "./rosterizer";

export function Create40kRosterFromRegistry(registry: Registry) {
  return CreateRoster(registry);
}

export function CreateRoster(registry: Registry) {
  const roster = new Wh40k.Roster40k();
  const force = new Wh40k.Force();
  roster._name = registry.name;
  force._name = registry.info.name;
  ParseDetachment(registry, force);
  for (const unitEntry of registry.assets.included) {
    const unit = ParseUnit(unitEntry);
    force._units.push(unit);
    roster._cost.add(unit._cost);
    for (const entry of [...unit._rules.entries(), ...unit._weaponRules.entries()]) {
      force._rules.set(entry[0], entry[1]);
    }
  }
  force._rules = new Map([...force._rules.entries()].sort());  // Sort rules.
  roster._forces.push(force);
  return roster;
}

function ParseDetachment(registry: Registry, force: Wh40k.Force) {
  const detachment = registry.assets.traits.filter(t => t.classification === 'Detachment')[0];
  if (!detachment) return;

  force._faction = detachment.designation;
  force._rules.set(detachment.designation, detachment.text);
}

function ParseUnit(entry: Entry) {
  const unit = new Wh40k.Unit();
  unit._name = entry.designation;
  unit._cost._points = entry.stats.Points.value as number;

  entry.keywords['Faction']?.sort().forEach(f => unit._factions.add(f));
  entry.keywords['Keywords']?.sort().forEach(kw => unit._keywords.add(kw));

  ParseUnitStatsProfile(entry, unit);
  ParseUnitProfiles(entry, unit);
  
  // TODO: model list

  unit.normalize();
  return unit;
}

function ParseUnitStatsProfile(entry: Entry, unit: Wh40k.Unit) {
  const unitStats = converStatsToTabularProfileRow(entry, 'Unit');
  if (Object.keys(unitStats).length > 1) {
    if (!unit._profileTables['Unit']) unit._profileTables['Unit'] = new Wh40k.TabularProfile();
    unit._profileTables['Unit'].addRow(Object.assign({ Unit: entry.designation }, unitStats));
  }
}

function ParseUnitProfiles(entry: Entry, unit: Wh40k.Unit) {
  for (const trait of [...entry.assets.traits, ...entry.assets.included]) {
    const classification = trait.classification;
    if (classification === 'Wargear' || classification === 'Enhancement') {
      if (!unit._abilities[classification]) unit._abilities[classification] = new Map();
      unit._abilities[classification].set(trait.designation, trait.text);
      if (trait.stats.Points) {
        unit._cost._points += trait.stats.Points?.value as number;
      }
    } else if (classification === 'Ability') {
      // TODO: Damaged, Invulns, and Leader are incorrectly tagged as Core.
      if (trait.tally['Core'] || trait.tally['Faction']) {
        // Core abilities don't have text in the unit datasheet, and get
        // aggregated under Rules at the bottom of the page.
        unit._rules.set(trait.designation, trait.text);
      } else {
        if (!unit._abilities['Abilities']) unit._abilities['Abilities'] = new Map();
        unit._abilities['Abilities'].set(trait.designation, trait.text);
      }
    } else if (classification === 'Model') {
      ParseUnitStatsProfile(trait, unit);
      // Recurse into Model traits for additional profiles like weapons.
      ParseUnitProfiles(trait, unit);
    } else if (classification === 'Ranged Weapon' || classification === 'Melee Weapon') {
      ParseWeaponProfile(trait, unit);
      // Check for attack profiles like standard/overcharge.
      const subweaponTraits = trait.assets.traits.filter(t => t.classification === classification);
      for (const subweaponTrait of subweaponTraits) {
        ParseWeaponProfile(subweaponTrait, unit, trait.designation);
      }
    } else {
      console.error(`Unexepcted classification '${classification}'`)
    }
  }
}

function ParseWeaponProfile(trait: Entry, unit: Wh40k.Unit, namePrefix?: string) {
  const key = `${trait.classification}s`;
  const row = converStatsToTabularProfileRow(trait, key, unit);
  if (namePrefix) {
    row[Object.keys(row)[0]] = `${namePrefix} - ${row[Object.keys(row)[0]]}`;
  }

  // Weapons with multiple profiles (eg standard/overcharge), don't have stats
  // on the top level trait, so ignore them.
  if (Object.keys(row).length <= 1) return;

  const weaponAbilities = trait.assets.traits.filter(t => t.classification === 'Ability');
  if (weaponAbilities.length > 0) {
    weaponAbilities.forEach(a => unit._weaponRules.set(a.designation, a.text));
    const keywords = weaponAbilities.map(t => t.designation);
    Object.assign(row, { Keywords: keywords.join(', ') });
  }

  if (!unit._profileTables[key]) unit._profileTables[key] = new Wh40k.TabularProfile();
  unit._profileTables[key].addRow(row);
}

function converStatsToTabularProfileRow(entry: Entry, name: string, unit?: Wh40k.Unit) {
  const relevantStats = filterAndOrderStats(entry.stats);
  const row = Object.assign(
      {[name]: entry.designation},
      Object.fromEntries(relevantStats.map(s => [s[0], formatStat(s[1])])));
  return row;
}
