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
  ParseUnitCost(entry, unit);

  entry.keywords['Faction']?.sort().forEach(f => unit._factions.add(f));
  entry.keywords['Keywords']?.sort().forEach(kw => unit._keywords.add(kw));

  ParseModels(entry, unit);
  ParseUnitProfiles(entry, unit);

  unit.normalize();
  return unit;
}

function ParseUnitCost(entry: Entry, unit: Wh40k.Unit) {
  unit._cost._points = 0;

  // Units with variable sizing have points specificed based on model count.
  // Addons will have points in their entry -- this includes some bonus models
  // which should NOT be counted for the unit model count wrt pricing.
  let numModelsWithoutCosts = 0;
  let assetPoints = 0;
  function countPointsAndModels(e: Entry) {
    for (const asset of [...e.assets.included, ...e.assets.traits]) {
      if (asset.stats.Points?.value) {
        assetPoints += asset.stats.Points.value as number;
      } else if (asset.classification === 'Model') {
        numModelsWithoutCosts += asset.quantity;
      }
      countPointsAndModels(asset);
    }
  }

  countPointsAndModels(entry);
  unit._cost._points = entry.stats.Points.value as number
  if (entry.stats.model3rdTally.value
      && numModelsWithoutCosts > (entry.stats.model3rdTally.value as number)) {
    unit._cost._points = entry.stats.model4thCost.value as number;
  } else if (entry.stats.model2ndTally.value
      && numModelsWithoutCosts > (entry.stats.model2ndTally.value as number)) {
    unit._cost._points = entry.stats.model3rdCost.value as number;
  } else if (entry.stats.model1stTally.value
      && numModelsWithoutCosts > (entry.stats.model1stTally.value as number)) {
    unit._cost._points = entry.stats.model2ndCost.value as number;
  } else {
    unit._cost._points = entry.stats.Points.value as number;
  }
  unit._cost._points += assetPoints;
}

function ParseUnitProfiles(entry: Entry, unit: Wh40k.Unit) {
  for (const trait of [...entry.assets.traits, ...entry.assets.included]) {
    const classification = trait.classification;
    if (classification === 'Wargear' || classification === 'Enhancement') {
      if (!unit._abilities[classification]) unit._abilities[classification] = new Map();
      unit._abilities[classification].set(trait.designation, trait.text);
    } else if (classification === 'Ability') {
      if (trait.designation === 'Leader') {
        // Clean up Leader text, by splitting it up between the core rule and
        // the unit-specific rule.
        const splitIndex = trait.text.indexOf("This model can be attached");
        const coreRule = trait.text.substring(0, splitIndex).trim();
        if (coreRule) unit._rules.set(trait.designation, coreRule);
        const unitRule = trait.text.substring(splitIndex);
        if (!unit._abilities['Abilities']) unit._abilities['Abilities'] = new Map();
        unit._abilities['Abilities'].set(trait.designation, unitRule);
      } else if ((trait.tally['Core'] || trait.tally['Faction'])
          && !trait.designation.startsWith('Damaged:')) {
        // Core abilities don't have text in the unit datasheet, and get
        // aggregated under Rules at the bottom of the page.
        unit._rules.set(trait.designation, trait.text);
      } else {
        if (!unit._abilities['Abilities']) unit._abilities['Abilities'] = new Map();
        unit._abilities['Abilities'].set(trait.designation, trait.text);
      }
    } else if (classification === 'Model') {
      // Recurse into Model traits for additional profiles like weapons.
      ParseUnitProfiles(trait, unit);
    } else if (classification === 'Ranged Weapon'
        || classification === 'Melee Weapon'
        || classification === 'Weapon') {
      ParseWeaponProfile(trait, unit);
      // Check for attack profiles like standard/overcharge.
      const subweaponTraits = trait.assets.traits.filter(t => t.classification.endsWith('Weapon'));
      for (const subweaponTrait of subweaponTraits) {
        ParseWeaponProfile(subweaponTrait, unit, trait.designation);
      }
    } else {
      console.error(`Unexepcted classification '${classification}': ${trait.designation}`)
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

function ParseModels(entry: Entry, unit: Wh40k.Unit) {
  // Look for models in the unit...
  const models = [...entry.assets.traits, ...entry.assets.included]
      .filter(t => t.classification === 'Model');
  // ... and if there are none, the unit covers the model.
  if (models.length === 0) {
    models.push(entry);
  } else {
    // Since there are Models, look for unit-level upgrades.
    ParseModel(
      {
        designation: 'Unit Upgrades',
        assets: entry.assets,
        quantity: 1
      } as Entry, unit,
      /* addModelWithoutAddons = */ false);
  }

  for (const modelEntry of models) {
    ParseUnitStatsProfile(modelEntry, unit);
    ParseModel(modelEntry, unit);
  }
}

function ParseUnitStatsProfile(entry: Entry, unit: Wh40k.Unit) {
  const unitStats = converStatsToTabularProfileRow(entry, 'Unit');
  if (Object.keys(unitStats).length > 1) {
    if (!unit._profileTables['Unit']) unit._profileTables['Unit'] = new Wh40k.TabularProfile();
    unit._profileTables['Unit'].addRow(Object.assign({ Unit: entry.designation }, unitStats));
  }
}

function ParseModel(entry: Entry, unit: Wh40k.Unit, addModelWithoutAddons = true) {
  const model = new Wh40k.Model();
  model._name = entry.designation;
  model._count = entry.quantity;
  const addons = [...entry.assets.traits, ...entry.assets.included]
      .filter(t => t.classification === 'Wargear'
          || t.classification === 'Weapon'
          || t.classification === 'Ranged Weapon'
          || t.classification === 'Melee Weapon'
          || t.classification === 'Enhancement');
  for (const addon of addons) {
    // Use Upgrades for everything, even Weapons, since Upgrades and Weapons
    // are merged in the model list.
    const upgrade = new Wh40k.Upgrade();
    upgrade._name = addon.designation;
    const cost = addon.stats.Points?.value;
    if (cost) upgrade._cost._points = cost as number;
    
    model._upgrades.push(upgrade);
  }
  if (addModelWithoutAddons || addons.length > 0) {
    unit._models.push(model);
  }
}
