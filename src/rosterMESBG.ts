export type RosterMESBG =  {
  name: string;
  forces: MESBGForce[];
  points: number;
  warriors: number;
};

type Breakpoints = {
  half: number;
  quarter: number;
  modelCount: number;
};

type Rule = {
  name: string;
  ruleText: string;
};

type Profile = {
  movement: string;
  fight: string;
  strength:string;
  defense:string;
  attack: string;
  wounds: string;
  courage: string;
};

type HeroStuff = {
  actions: string[];
  might: string;
  will: string;
  fate: string;
  heroicTier: string;
  magicalPowers: MagicalPower[];
  isLeader: boolean;
}

type Model = {
  name: string;
  points: number;
  keywords: string[];
  rules: Rule[];
  profile: Profile;
  wargear: Wargear[];
  mount?: Model;
  heroStuff?: HeroStuff;
}

type Wargear = {
  name: string;
  points: number;
  rules: string[];
}

type MagicalPower = {
  name: string;
  duration: string;
  range: string;
  casting: string;
  normalEffect: string;
  channelledEffect: string;
}

type Warriors = {
  count: number;
  points: number;
  model: Model;
}
type Warband = Warriors[]; 

type Unit = {
  leader: Model;
  warband: Warband;
}

export type MESBGForce = {
  name: string;
  breakpoints: Breakpoints;
  units: Unit[];
  armyBonus: Rule[];
};

// that's actually a crazy newline Battlescribe invented and only uses sometimes, not a space at the end there
const GOOFY_NEWLINE_EXP = /\r\n|\r|\n| /;

/**
 * 
 * @param doc a MESBG roster XML document
 * @returns An object containing the points cost and number of warriors in the list
 */
const parsePointsAndWarriors = (doc: XMLDocument) : {points: number, warriors: number} => {
  const costs = doc.querySelectorAll("roster>costs>cost");
  let points = 0;
  let warriors = 0;
  for(let cost of costs) {
    if(cost.getAttribute("name")?.trim() === "Points") {
      points = parseInt(cost.getAttribute("value") ?? "0");
    }
    if(cost.getAttribute("name")?.trim() === "Warriors") {
      warriors = parseInt(cost.getAttribute("value") ?? "0");
    }
  }
  return {points, warriors};
};

/**
 * 
 * @param force a "force" level node
 * @returns The name the person gave it or a generic MESBG name
 */
const getForceName = (force: Element) : string => {
  return force.getAttribute("catalogueName") ?? "MESBG Force";
}

/**
 * 
 * @param breakpointSelection the selection that has breakpoint stuff
 * @returns Breakpoint stuff
 */
const parseBreakpoints = (breakpointSelection: Element): Breakpoints => {
  const bp: Breakpoints = {half: 0, quarter: 0, modelCount: 0};
  for(let rule of breakpointSelection.querySelectorAll("rules>rule")) {
    const ruleName = rule.getAttribute("name") ?? "";
    if(ruleName.endsWith("is halfway. (model)")) {
      const halfwayMark = parseFloat(ruleName);
      if(!isNaN(halfwayMark)) {
        bp.half = Math.ceil(halfwayMark);
      }
    }
    if(ruleName.endsWith("models remaining. (model)")) {
      const quarterMark = parseFloat(ruleName);
      if(!isNaN(quarterMark)) {
        bp.quarter = Math.ceil(quarterMark);
      }
    }
    if(ruleName.endsWith("total models in Army. (model)")) {
      const modelCount = parseFloat(ruleName);
      if(!isNaN(modelCount)) {
        bp.modelCount = modelCount;
      }
    }
  }
  return bp;
}

/**
 * 
 * @param rulesNodes 
 * @returns A list of rule names and their text
 */
const parseRules = (rulesNodes: NodeListOf<Element>) => {
  const rules: Rule[] = [];
  for(let rule of rulesNodes) {
    if(rule.hasAttribute("name")) {
      const name = rule.getAttribute("name") ?? null;
      const desc = rule.querySelector("rule>description")?.textContent ?? "";
      if(name !== null) {
        rules.push({
          name,
          ruleText: desc, 
        });
      }
    }
  }
  return rules;
};

const getHeroicStuff = (modelSelection: Element): HeroStuff | undefined => {
  let fate = "";
  let will = "";
  let might = "";
  let actions:string[] = [];
  let heroicTier = "";
  let isLeader = false;
  const magicalPowers: MagicalPower[] = [];

  for(let profile of modelSelection.querySelectorAll("profiles > profile[typeName=\"Hero\"]")) {
    for(let characteristic of profile.querySelectorAll("characteristics > characteristic")) {
      switch(characteristic.getAttribute("name")?.trim() ?? "")  {
        case "Might": might = characteristic.textContent ?? ""; break;
        case "Fate": fate = characteristic.textContent ?? ""; break;
        case "Will": will = characteristic.textContent ?? ""; break;
        case "Heroic Actions":
          actions = characteristic.textContent?.split(GOOFY_NEWLINE_EXP) ?? [];
          break;
        case "Heroic Tier": heroicTier = characteristic.textContent ?? "";break;
      }
    }
  }
  for(let powerProfile of modelSelection.querySelectorAll("profile[typeName=\"Magical Power\"]")) {
      const name = powerProfile.getAttribute("name") ?? "Unnamed Magic Power";
      const duration = powerProfile.querySelector(":scope characteristic[name~=\"Duration\"]")?.textContent ?? "";
      const range = powerProfile.querySelector(":scope characteristic[name~=\"Range\"]")?.textContent ?? "";
      const casting = powerProfile.querySelector(":scope characteristic[name~=\"Casting\"]")?.textContent ?? "";
      const normalEffect = powerProfile.querySelector(":scope characteristic[name~=\"Rule\"]")?.textContent ?? "";
      const channelledEffect = powerProfile.querySelector(":scope characteristic[name~=\"Channelled\"]")?.textContent ?? "";
      magicalPowers.push({
        name,
        duration,
        range,
        casting,
        normalEffect,
        channelledEffect,
      })
  }
  isLeader = modelSelection.querySelector("selection[name=\"Leader (Valour)\"]") ? true : false;
  return {
    fate,
    will,
    might,
    heroicTier,
    actions,
    magicalPowers,
    isLeader,
  };
}

/**
 * Parses out all the stats, equipment, rules, etc. for a model in a
 * somewhat ugly and inefficient manner. 
 * 
 * @param modelSelection the selection node that has all the data for a model
 * @returns  the parsed model in full
 */
const parseModel = (modelSelection: Element): Model => {
  const rules = parseRules(modelSelection.querySelectorAll("rules > rule") ?? []);
  const name = modelSelection.getAttribute("name")?.trim() ?? "Unknown Model Name";
  let keywords: string[] = [];
  const wargear: Wargear[] = [];
  let mount: Model | undefined = undefined;
  // profile data
  let movement = "";
  let fight = "";
  let strength = "";
  let defense = "";
  let attack = "";
  let wounds = "";
  let courage = "";
  let heroStuff: HeroStuff | undefined = undefined;
  const tmpProfiles = modelSelection.querySelectorAll("profiles > profile");
  for(let profile of modelSelection.querySelectorAll(":scope profiles > profile")) {
    const typeName = profile.getAttribute("typeName");
    // guard against mounts causing double dipping, although they shouldn't???
    const profileName = profile.getAttribute("name")?.trim() ?? "wowza";
    if((typeName === "Hero" || typeName === "Warrior") && profileName.startsWith(name)) {
      for(let characteristic of profile.querySelectorAll("characteristics > characteristic")) {
        switch(characteristic.getAttribute("name")?.trim() ?? "")  {
          case "Wounds": wounds = characteristic.textContent ?? ""; break;
          case "Courage": courage = characteristic.textContent ?? ""; break;
          case "Attack": attack = characteristic.textContent ?? ""; break;
          case "Defense": defense = characteristic.textContent ?? ""; break;
          case "Strength": strength = characteristic.textContent ?? ""; break;
          case "Fight": fight = characteristic.textContent ?? ""; break;
          case "Movement": movement = characteristic.textContent ?? ""; break;
          case "Keywords":
            keywords = characteristic.textContent?.split(GOOFY_NEWLINE_EXP) ?? []; 
            break;
        }
      } // end stats
      // wargear / upgrades / mounts and other stuff a model can have
      // see if we are wargear (vs. a mount or "leader" attribute)
      for(let equipment of getDirectSelections(modelSelection) ?? []) { // TODO: just select the appropriate nodes
        if(equipment.querySelector("profile[typeName$=\"Wargear\"]")) {
          const name = equipment.getAttribute("name") ?? "Equipment";
          // note the `$=` is because BattleScribe likes to put spaces in front of values
          const points = parseInt(equipment.querySelector("cost[name$=\"Points\"]")?.getAttribute("value") ?? "0");
          const rules: string[]  = [];
          for(let rule of equipment.querySelectorAll("characteristics > characteristic")) {
            if(rule.textContent !== null) {
              rules.push(rule.textContent);
            }
          }
          wargear.push({ name, points, rules });
        }
        if(equipment.querySelector("profile[typeName$=\"Warrior\"]")) {
          mount = parseModel(equipment.querySelector("profile[typeName$=\"Warrior\"]")?.parentElement?.parentElement!);
        }
      }
      if(typeName === "Hero") {
        heroStuff = getHeroicStuff(modelSelection);
      }
    }
  }
  let points = 0;
  for(let cost of getDirectCosts(modelSelection) ?? []) {
    if(cost.getAttribute("name")?.trim() === "Points") {
      points = parseInt(cost.getAttribute("value") ?? "0");
    }
  }
  return {
    name,
    points,
    keywords,
    rules,
    profile: {
      attack,
      courage,
      defense,
      fight,
      movement,
      strength,
      wounds,
    },
    wargear,
    mount,
    heroStuff,
  }
};

const parseWarband = (warbandSelection: Element): Warband => {
  const warband: Warband = [];
  // do neat things
  // loop over each thing
  for(let sel of getDirectSelections(warbandSelection) ?? []) {
    const _m = sel.querySelector("selection[type~=\"model\"]");
    if(_m !== null) {
      const model = parseModel(sel);
      const count = parseInt(_m.getAttribute("number") ?? "0");
      const points = parseInt(_m.querySelector("cost[name~=\"Points\"]")?.getAttribute("value") ?? "0");
      warband.push({
        model,
        count,
        points,
      })
    }
  }
  return warband;
}

/**
 * Gets only the top-level "selection" elements of a node. Using `querySelectorAll` by
 * default return _all_ the nodes down the tree, which we don't want sometimes.
 *  
 * @param el a node that has "selections" inside
 * @returns 
 */
const getDirectSelections = (el: Element) : NodeListOf<Element> | null => 
  el.querySelector("selections")?.querySelectorAll(":scope > selection") ?? null;

/**
 * Gets only the top-level "cost" elements of a node. Using `querySelectorAll` by
 * default return _all_ the nodes down the tree, which we don't want sometimes.
 *  
 * @param el a node that probably has "costs" inside
 * @returns 
 */
const getDirectCosts = (el: Element) : NodeListOf<Element> | null => 
  el.querySelector("costs")?.querySelectorAll(":scope > cost") ?? null;


/**
 * Takes a `selection` that looks like a Hero and parses the two interesting bits inside, which
 * are the inner `selections->selection` that are the model and the warband.
 *  
 * @param heroSelection 
 * @returns 
 */
const parseHero = (heroSelection: Element): Unit | null => {
  // inside here there is a type: "model" and a  name "Warband" selection
  let maybeLeader: Model | null = null;
  let warband: Warband = [];
  const directSelections = getDirectSelections(heroSelection);
  if(directSelections === null) {
    return directSelections;
  }
  for(let selection of directSelections) {
    if(selection.getAttribute("type") === "model") {
      maybeLeader = parseModel(selection);
    }
    if(selection.getAttribute("name") === "Warband") {
      // do something neat
      warband = parseWarband(selection);
    }
  }
  if(maybeLeader !== null) {
    return {
      leader: maybeLeader,
      warband,
    }
  }
  return null;
};

/**
 * 
 * @param node a top level force->selections->selection node
 * @returns if that node looks like a hero / unit 
 */
const isModelSelection = (node: Element):boolean => {
  let isHero = false;
  for(let s of getDirectSelections(node) ?? []) {
    if(s.getAttribute("type") === "model") {
      isHero = true;
    }
  }
  return isHero;
}

const parseForces = (doc: XMLDocument) : MESBGForce[] => {
  const forcesList = doc.querySelectorAll("roster>forces>force");
  const parsedForces: MESBGForce[] = [];
  for(let force of forcesList) {
    const name = getForceName(force);
    let breakpoints: Breakpoints = {half: 0, quarter: 0, modelCount: 0};
    const units: Unit[] = [];
    const armyBonus: Rule[] = []; // maybe there can be more than one??
    // iterate over top-level selections
    const forceSelections = getDirectSelections(force);
    if(forceSelections === null) {
      continue;
    }
    for(let selection of forceSelections) {
      const val = selection.getAttribute("name");
      if(val === "Determine Breakpoint & 25%") {
        breakpoints = parseBreakpoints(selection);
      } else if(isModelSelection(selection)) {
          const unit = parseHero(selection);
          if(unit !== null) {
            units.push(unit);
          }
      } else { // this, in theory is the faction / army bonus!
        const _r = selection.querySelectorAll("rules > rule");
        for(let rule of _r) {
          const _d = rule.querySelector("description")?.textContent ?? "";
          armyBonus.push({
            name: rule.getAttribute("name") ?? "",
            ruleText: _d,
          })
        }

      } 
    }
    parsedForces.push({
      name,
      breakpoints,
      units,
      armyBonus,
    })
  }
  return parsedForces;
};

export function CreateMESBGRoster(doc: XMLDocument): RosterMESBG | null {
  if(doc) {
    const name = 
      doc.querySelector("roster")?.getAttribute("name") 
      ?? "Middle-Earth Stratgegy Battle Game Roster";
    
    const {points, warriors} = parsePointsAndWarriors(doc);
    
    const forces = parseForces(doc);

    return {
      name,
      forces,
      points,
      warriors,
    };
  }
  return null;
};


/*

HERO TYPES

"Hero of Legend"
"Hero of Valour"
"Hero of Fortitude"
"Minor Hero"
"Independent Hero"
"Warrior Warband"
"Legendary Legion"

/* ------------------- *\

NOTES WHILE I WRITE THIS

---- root -----
roster[]
- costs[] : has "Points" named node and "Warriors" name node
-- cost
- costLimits : don't care
- foces[]
-- force : catalogName on this node = faction
--- publications[] : don't care
--- categories[] : seems empty or useless so far
--- selections[] : this is where the good stuff is!
---- selection : SEE BELOW!
--- rules : seems empty so far
--- profiles : seems empty so far



/// DIFFERENT SELECTION ELEMENTS OFF OF "FORCE" ROOT

selection: name "Determine Alliance Level", type: "upgrade"
-- rules[] (seems to be empty / useless)
-- costs[] (seems to be empty / useless)
-- selections[] (seems to be empty / useless)
-- categories[]
---- category:name "Misc"
---- category:name "Evil Army"
---- category:name "Mordor"

selection: name "Determine Breakpoint & 25%", type: "upgrade"
-- categories[]
---- category:name "Misc"
-- rules[]
---- rule: "[ x ] total models in Army. (model)" <text node with silly description>
---- rule: "[ x ] is halfway. (model)" <text node with description>
---- rule: "[ x ] models remaining. (model)" <text node with description> . NOTE: this is the 25% one!

[ character name ] (type: "upgrade")
-- categories[]
---- category:name "Hero of _____"
-- selections[]

---- selection: type "model", name [character name]
------ costs[]
-------- cost: name "Points", value [point cost]
------ rules[]
-------- rule: name [Rule Name]
---------- description <text node w/ rule text>
------ profiles[]
-------- profile: typeName "Hero", name [character name]
---------- characteristics[]
------------ characteristic: name [ move, fight, etc.] <text node with value> NOTE: can have multiple "Heroic Actions" nodes! Also has "Keywords" node and "Heroic Tier"
-------- profile: typeName "Magical Power", name [power name]
---------- characteristics[]
------------ characteristic: name [ Duration, Range, Casting, Rule, Channelled] <text node with value>


---- selection:name "Warband", type "upgrade"
------ costs[] (nothing)
------ categories[] (nothing)
------ rules[] (nothing)
------ profiles[] (nothing)
------ selections[]
-------- selection: type "upgrade", number [number of models], name [ model name (i.e. "Mordor Troll", "Warg Rider", etc.) ]
---------- costs[] (nothing)
---------- categories[] (nothing)
---------- rules[] 
------------ rule: name [rule name] <text node with rule text>



\* -------------------- */