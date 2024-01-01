import { RosterMESBG, Warriors, Profile, Model } from "./rosterMESBG";

const WHITESPACE_REGEX = /\s+/g;

type WarriorCardData = {
  name: string;
  keywords: string;
  statLines: Map<
    string,
    {
      profile: Profile;
      equipments: Set<string>;
    }
  >;
  ruleNames: string;
  mount?: Model;
};

const makeModelKey = (model: Model) => {
  const modelKey = model.name.trim().replace(WHITESPACE_REGEX, "-");
  const mountKey =
    model.mount?.name.trim().replace(WHITESPACE_REGEX, "-") ?? "";
  return modelKey + mountKey;
};

/**
 * Make an HTML element suitable for putting stuff in
 *
 * @param t tag name
 * @param classes All the CSS classes you want on there as a string
 * @returns An HTML element with all the classes you done did give it
 */
const el = (
  t: keyof HTMLElementTagNameMap,
  classes: string = ""
): HTMLElement => {
  const _el = document.createElement(t);
  _el.className = classes;
  return _el;
};

/**
 * Makes an HTML element with a string of your choosing inside.
 * @param t HTML tag
 * @param classes Classes as string
 * @param text Text you want inside
 * @returns An HTML element with a chid text node
 */
const textEl = (
  t: keyof HTMLElementTagNameMap,
  classes: string = "",
  text: string = ""
): HTMLElement => {
  const _el = el(t, classes);
  _el.appendChild(document.createTextNode(text));
  return _el;
};

/**
 * Makes a div that will space things out and force a new block
 * @returns A spacer DIV
 */
const nobrDiv = () => el("div", "mesbg_noBreak mesbg_bumpDown");

/**
 *  Makes an empty TABLE with the CSS classes for stats display
 * @returns A table element with all the right CSS classes
 */
const statsTable = () =>
  el("table", "mesbg_profileTable mesbg_noBreak mesbg_bumpDown");

/**
 * Makes a stats header cell all fancy like
 * @param txt Text for the call
 * @returns
 */
const statsHeader = (txt: string[]) => {
  const _tr = el("tr");
  txt.forEach((str) => {
    _tr.appendChild(textEl("th", "", str));
  });
  return _tr;
};
const statsRow = (txt: string[]) => {
  const _tr = el("tr");
  txt.forEach((str) => {
    _tr.appendChild(textEl("td", "", str));
  });
  return _tr;
};
const makeStatsTable = (labels: string[], values: string[]) => {
  const _tbl = statsTable();
  _tbl.appendChild(statsHeader(labels));
  _tbl.appendChild(statsRow(values));
  return _tbl;
};

/**
 *
 * @param modelType a warrior model
 * @returns a string representation of its profile to use a key to check for duplicates in similar model types
 */
const profileKey = (profile: Profile) =>
  [
    profile.movement,
    profile.fight,
    profile.strength,
    profile.defense,
    profile.attack,
    profile.wounds,
    profile.courage,
  ].join("-");
const wargearKey = (modelType: Warriors) =>
  modelType.model.wargear.map((w) => w.name).join(", ");

const renderHeroName = (n: string) => textEl("h2", "mesbg_h2", n);
const renderWarriorName = (n: string) => textEl("h2", "mesbg_h2", n);
const renderRosterName = (n: string) => textEl("h1", "mesbg_h1", n);
const renderEquipmentList = (n: string) =>
  textEl("p", "mesbg_equipmentList", n);

/* ===== CHECKBOX TRACKERS ====== */
const checkboxStates = {
  showTracker: true,
  showRules: true,
  woundChart: true,
};
type CheckboxStates = keyof typeof checkboxStates;

const checkboxHandler = (name: CheckboxStates) => () => {
  const newState = !checkboxStates[name];
  checkboxStates[name] = newState;
  const _div = document.querySelector(`.mesbg_${name}`);
  if (_div !== null) {
    if (newState) {
      _div.classList.remove("mesbg_hideMe");
    } else {
      _div.classList.add("mesbg_hideMe");
    }
  }
};
const getCheckboxAndLabel = (name: CheckboxStates, labelText: string) => {
  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("name", name);
  input.setAttribute("id", name);
  if (checkboxStates[name]) {
    input.setAttribute("checked", "checked");
  }
  input.addEventListener("change", checkboxHandler(name));
  const label = document.createElement("label");
  label.setAttribute("for", name);
  label.appendChild(document.createTextNode(` ${labelText}  `));
  label.prepend(input);
  return label;
};

const PROFILE_HEADERS = ["Mv", "F", "S", "D", "A", "W", "C"];
// TODO: figure out why title and friends can be `null` at all...
export const renderMESBG = (
  roster: RosterMESBG,
  titleEl: HTMLElement | null,
  listEl: HTMLElement | null,
  forcesEl: HTMLElement | null
): void => {
  if (titleEl !== null) {
    const _boxes = el("div", "mesbg_noPrint mesbg_toggleHolder");
    _boxes.appendChild(getCheckboxAndLabel("showRules", "show rules text"));
    _boxes.appendChild(
      getCheckboxAndLabel("showTracker", "include hero points tracker")
    );
    _boxes.appendChild(
      getCheckboxAndLabel("woundChart", "include To Wound Chart")
    );
    titleEl.appendChild(_boxes);
    titleEl.appendChild(renderRosterName(roster.name));
    titleEl.appendChild(
      textEl(
        "h4",
        "mesbg_rosterInfo",
        `${roster.points} points | ${roster.warriors} warriors `
      )
    );
  }
  // UNIT SUMMARIES
  /* ======================================== *\
    RENDERS THE BLOCKS AT THE TOP THAT
    SUMMARIZE LEADERS AND THIER WARBANDS
  \* ======================================== */
  if (listEl !== null) {
    const _wrapper = el("div", "mesbg_container");
    listEl.appendChild(_wrapper);
    roster.forces.forEach((force) => {
      // force name
      _wrapper.appendChild(textEl("h2", "mesbg_forceName", force.name));
      _wrapper.appendChild(
        textEl(
          "h4",
          "mesbg_h4 mesbg_bumpDown",
          `${force.breakpoints.modelCount} models
          | broken at ${force.breakpoints.half} casualties
          | quartered at ${force.breakpoints.quarter} models remaining
          `
        )
      );
      textEl(
        "p",
        "mesbg_rosterInfo",
        `${roster.points} points | ${roster.warriors} warriors `
      );
      const _grid = el("div", "mesbg_flexGrid");
      _wrapper.appendChild(_grid);
      force.units.forEach((unit) => {
        const _unitWrapper = el("div", "mesbg_card");
        _unitWrapper.appendChild(
          renderHeroName(
            `${unit.leader.name}  - ${unit.leader.points}pts ${
              unit.leader.heroStuff?.isLeader ? "  (Leader)" : ""
            }`
          )
        );
        _unitWrapper.appendChild(
          renderEquipmentList(
            `${unit.leader.wargear.map((w) => w.name).join(", ")}${
              unit.leader.mount ? ", " + unit.leader.mount?.name : ""
            }`
          )
        );
        _unitWrapper.appendChild(el("hr", "mesbg_bumpDown"));
        unit.warband.forEach((warrior) => {
          const _r = renderWarriorName(
            `${warrior.count} ${warrior.model.name} - ${warrior.points}pts`
          );
          _unitWrapper.appendChild(_r);
          _unitWrapper.appendChild(
            textEl(
              "p",
              "mesbg_equipmentList",
              `${warrior.model.wargear.map((w) => w.name).join(", ")}${
                warrior.model.mount ? ", " + warrior.model.mount?.name : ""
              }`
            )
          );
        });
        _grid.appendChild(_unitWrapper);
      });
    });
  }
  // DATA CARDS
  // TODO: remove the duplication
  if (forcesEl != null) {
    const _wrapper = el("div", "mesbg_container");
    forcesEl.appendChild(_wrapper);
    roster.forces.forEach((force) => {
      // this will hold consolidated data for warriors so we can have one
      // card per unit type, even with different stat-lines.
      const cardData = new Map<string, WarriorCardData>();
      force.units.forEach((unit) => {
        /* ============================== *\
          RENDER THE LEADER CARD
        \* ============================== */
        // do the leader
        const _card = el("div", "mesbg_card");
        const _unitWrapper = el("div", "mesbg_twoColumn");
        _card.appendChild(
          renderHeroName(`${unit.leader.name}  - ${unit.leader.points}pts`)
        );
        _card.appendChild(
          textEl(
            "h3",
            "mesbg_h3 mesbg_bumpDown",
            unit.leader.keywords.join(", ")
          )
        );
        const _flx = el("div", "mesbg_flex mesbg_noBreak");
        _flx.appendChild(
          makeStatsTable(PROFILE_HEADERS, [
            unit.leader.profile.movement,
            unit.leader.profile.fight,
            unit.leader.profile.strength,
            unit.leader.profile.defense,
            unit.leader.profile.attack,
            unit.leader.profile.wounds,
            unit.leader.profile.courage,
          ])
        );
        _flx.appendChild(
          makeStatsTable(
            ["M", "W", "F"],
            [
              unit.leader.heroStuff?.might ?? "-",
              unit.leader.heroStuff?.will ?? "-",
              unit.leader.heroStuff?.fate ?? "-",
            ]
          )
        );
        _unitWrapper.appendChild(_flx);
        // gear list
        const _gearBlock = nobrDiv();
        _gearBlock.appendChild(textEl("h3", "mesbg_h3", "Wargear"));
        if (unit.leader.wargear.length === 0) {
          _gearBlock.appendChild(textEl("i", "", "none"));
        } else {
          _gearBlock.appendChild(
            textEl(
              "p",
              "mesbg_cardWargear",
              unit.leader.wargear.map((w) => w.name).join(", ")
            )
          );
        }
        _unitWrapper.appendChild(_gearBlock);
        // heroic actions
        if (unit.leader.heroStuff?.actions.length ?? 0 > 0) {
          const _w = nobrDiv();
          _w.appendChild(textEl("h3", "mesbg_h3", "Heroic Actions"));
          const _actionList = el(
            "ul",
            "mesbg_list mesbg_noBreak mesbg_bumpDown"
          );
          unit.leader.heroStuff?.actions.forEach((a) => {
            _actionList
              .appendChild(el("li"))
              .appendChild(document.createTextNode(a));
          });
          _w.appendChild(_actionList);
          _unitWrapper.appendChild(_w);
        }

        // rules (have parser mark special ones?)
        _unitWrapper.appendChild(textEl("h3", "mesbg_h3", "Special Rules"));
        _unitWrapper.appendChild(
          textEl(
            "p",
            "mesbg_bumpDown",
            unit.leader.rules.map((r) => r.name).join(", ")
          )
        );

        // fancy magic power table
        if (unit.leader.heroStuff?.magicalPowers.length ?? 0 > 0) {
          const _pwrTable = statsTable();
          _pwrTable.className = "mesbg_powerTable mesbg_noBreak"; // TODO: lol
          const _pwrHeaderRow = el("tr");
          _pwrHeaderRow
            .appendChild(el("th"))
            .appendChild(textEl("h3", "mesbg_h3", "Magical Powers"));
          _pwrHeaderRow
            .appendChild(el("th"))
            .appendChild(textEl("span", "", "Range"));
          _pwrHeaderRow
            .appendChild(el("th"))
            .appendChild(textEl("span", "", "Casting"));
          _pwrTable.appendChild(_pwrHeaderRow);
          unit.leader.heroStuff?.magicalPowers.forEach((p) => {
            const _pwrRow = el("tr");
            _pwrRow
              .appendChild(el("td"))
              .appendChild(textEl("span", "", p.name));
            _pwrRow
              .appendChild(el("td"))
              .appendChild(textEl("span", "", p.range));
            _pwrRow
              .appendChild(el("td"))
              .appendChild(textEl("span", "", p.casting));
            _pwrTable.appendChild(_pwrRow);
          });
          _unitWrapper.appendChild(_pwrTable);
        }
        // Does they have a mount?
        if (unit.leader.mount !== undefined) {
          const _d = nobrDiv();
          _d.appendChild(renderWarriorName(`Mount: ${unit.leader.mount.name}`));
          const _flx = el("div", "mesbg_flex mesbg_noBreak");
          _flx.appendChild(
            makeStatsTable(PROFILE_HEADERS, [
              unit.leader.mount.profile.movement,
              unit.leader.mount.profile.fight,
              unit.leader.mount.profile.strength,
              unit.leader.mount.profile.defense,
              unit.leader.mount.profile.attack,
              unit.leader.mount.profile.wounds,
              unit.leader.mount.profile.courage,
            ])
          );
          _d.append(_flx);
          _unitWrapper.append(_d);
        }

        _card.appendChild(_unitWrapper);
        _wrapper.appendChild(_card);
        // do the warband
        /* ======================================== *\
          GROUP ALL THE MODELS IN EACH WARBAND SO
          WE CAN RENDER THEM LATER

          Maybe I should do this in the parser. In fact
          I definitley should. But it is late and I want
          to get this done before I play tomorrow
        \* ======================================== */
        unit.warband.forEach((modelType) => {
          const _model = modelType.model;
          const modelKey = makeModelKey(_model);
          if (cardData.has(modelKey)) {
            const _existing = cardData.get(modelKey);
            // this is a string of the statline
            const _pfKey = profileKey(_model.profile);
            const _maybeProfile = _existing?.statLines.get(_pfKey);
            const _equipmentString = _model.wargear
              .map((w) => w.name.trim())
              .join(", ");
            if (_maybeProfile === undefined) {
              _existing?.statLines.set(_pfKey, {
                profile: _model.profile,
                equipments: new Set([_equipmentString]),
              });
            } else {
              _maybeProfile.equipments.add(_equipmentString);
            }
          } else {
            const newData: WarriorCardData = {
              name: _model.name,
              keywords: _model.keywords.join(", "),
              mount: _model.mount,
              ruleNames: _model.rules.map((r) => r.name).join(", "),
              statLines: new Map([
                [
                  profileKey(_model.profile),
                  {
                    profile: _model.profile,
                    equipments: new Set([
                      _model.wargear.map((w) => w.name.trim()).join(", "),
                    ]),
                  },
                ],
              ]),
            };
            cardData.set(modelKey, newData);
          }
        });
      });
      // NOW WE CAN RENDER THE WARRIOR CARDS!
      const warriorCardWrapper = el("div", "mesbg_twoColumnGrid");
      cardData.forEach((value, key) => {
        const _card = el("div", "mesbg_card");
        const _unitWrapper = el("div", "mesbg_twoColumn");
        // name and keywords. Same for everyone!
        _card.appendChild(renderWarriorName(value.name));
        _card.appendChild(
          textEl("p", "mesbg_cardWargear mesbg_bumpDown", value.keywords)
        );
        // now go through the stat lines and make them goodly
        value.statLines.forEach((v, k) => {
          const _flx = el("div", "mesbg_noBreak");
          _flx.appendChild(textEl("h3", "mesbg_h3", "Wargear"));
          v.equipments.forEach((_line) => {
            _flx.appendChild(textEl("p", "mesbg_cardWargear", _line));
          });
          _flx.appendChild(
            makeStatsTable(PROFILE_HEADERS, [
              v.profile.movement,
              v.profile.fight,
              v.profile.strength,
              v.profile.defense,
              v.profile.attack,
              v.profile.wounds,
              v.profile.courage,
            ])
          );
          _unitWrapper.appendChild(_flx);
        });

        // rules, which should be the same for everone
        if (value.ruleNames.length > 0) {
          _unitWrapper.appendChild(textEl("h3", "mesbg_h3", "Special Rules"));
          _unitWrapper.appendChild(
            textEl("p", "mesbg_bumpDown", value.ruleNames)
          );
        }

        if (value.mount !== undefined) {
          const _d = nobrDiv();
          _d.appendChild(renderWarriorName(`Mount: ${value.mount.name}`));
          const _flx = el("div", "mesbg_flex mesbg_noBreak");
          _flx.appendChild(
            makeStatsTable(PROFILE_HEADERS, [
              value.mount.profile.movement,
              value.mount.profile.fight,
              value.mount.profile.strength,
              value.mount.profile.defense,
              value.mount.profile.attack,
              value.mount.profile.wounds,
              value.mount.profile.courage,
            ])
          );
          _d.append(_flx);
          _unitWrapper.append(_d);
        }
        _card.appendChild(_unitWrapper);
        warriorCardWrapper.appendChild(_card);
      });
      _wrapper.appendChild(warriorCardWrapper);
    });
    // DO THE RULES
    const seenRules = new Set<string>(); // only print each rule once!
    const _rulesOuter = el("div", "mesbg_pageBreak mesbg_showRules");
    _rulesOuter.appendChild(textEl("h1", "mesbg_h1", "Rules"));
    const _ruleWrapper = el("div", "mesbg_twoColumn");
    roster.forces.forEach((force) => {
      // army wide rule
      force.armyBonus.forEach((_rule) => {
        _ruleWrapper.appendChild(
          textEl("h3", "mesbg_h3", `"${_rule.name}" (Army Bonus)`)
        );
        _ruleWrapper.appendChild(textEl("p", "mesbg_bumpDown", _rule.ruleText));
      });
      // rules found in units
      force.units.forEach((unit) => {
        unit.leader.rules.forEach((_rule) => {
          if (seenRules.has(_rule.name) === false) {
            _ruleWrapper.appendChild(textEl("h3", "mesbg_h3", _rule.name));
            _ruleWrapper.appendChild(
              textEl("p", "mesbg_bumpDown", _rule.ruleText)
            );
            seenRules.add(_rule.name);
          }
        });
        unit.warband.forEach((modelType) => {
          modelType.model.rules.forEach((_rule) => {
            if (seenRules.has(_rule.name) === false) {
              _ruleWrapper.appendChild(textEl("h3", "mesbg_h3", _rule.name));
              _ruleWrapper.appendChild(
                textEl("p", "mesbg_bumpDown", _rule.ruleText)
              );
              seenRules.add(_rule.name);
            }
          });
        });
      });
      _rulesOuter.appendChild(_ruleWrapper);
      _wrapper.appendChild(_rulesOuter);
      // OMG Hero Points Tracker mb?
      const _trackerTable = el(
        "table",
        "mesbg_pageBreak mesbg_trackerTable mesbg_showTracker"
      );
      _trackerTable.innerHTML =
        "<tr><th></th><th>M</th><th>W</th><th>F</th></tr>";
      roster.forces.forEach((force) => {
        force.units.forEach((unit) => {
          const _r = el("tr");
          _r.innerHTML = `<td><h3 class="mesbg_h3">${unit.leader.name}</h3></td><td><div class="mesbg_diceBlock" /></td><td><div class="mesbg_diceBlock" /></td><td><div class="mesbg_diceBlock" /></td>`;
          _trackerTable.appendChild(_r);
        });
      });
      _wrapper.appendChild(_trackerTable);
      // TO WOUND CHART
      const _toWound = el("table", "mesbg_pageBreak mesbg_woundChart");
      _toWound.innerHTML = `
        <thead>
          <tr>
            <th class="mesbg_toWoundHeader">&nbsp;</th><th class="mesbg_toWoundHeader" colspan="11">Defence</th>
          </tr>
        <thead>
        <tbody>
          <tr>
            <th class="mesbg_toWoundHeader" rowspan="11" style="transform: rotate(-90deg);">Strength</th>
            <th>&nbsp</th> <th>1</th> <th>2</th> <th>3</th> <th>4</th> <th>5</th> <th>6</th> <th>7</th> <th>8</th> <th>9</th> <th>10</th>
          </tr>
          <tr>
            <th>1</th> <td>4</td> <td>5</td> <td>5</td> <td>6</td> <td>6</td> <td>6/4</td> <td>6/5</td> <td>6/6</td> <td>-</td> <td>-</td>
          </tr>
          <tr>
            <th>2</th> <td>4</td> <td>4</td> <td>5</td> <td>5</td> <td>6</td> <td>6</td> <td>6/4</td> <td>6/5</td> <td>6/6</td> <td>-</td>
          </tr>
          <tr>
            <th>3</th> <td>3</td> <td>4</td> <td>4</td> <td>5</td> <td>5</td> <td>6</td> <td>6</td> <td>6/4</td> <td>6/5</td> <td>6/6</td>
          </tr>
          <tr>
            <th>4</th> <td>3</td> <td>3</td> <td>4</td> <td>4</td> <td>5</td> <td>5</td> <td>6</td> <td>6</td> <td>6/4</td> <td>6/5</td>
          </tr>
          <tr>
            <th>5</th> <td>3</td> <td>3</td> <td>3</td> <td>4</td> <td>4</td> <td>5</td> <td>5</td> <td>6</td> <td>6</td> <td>6/4</td> </tr>
          <tr>
            <th>6</th> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>4</td> <td>4</td> <td>5</td> <td>5</td> <td>6</td> <td>6</td>
          </tr>
          <tr>
            <th>7</th> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>4</td> <td>4</td> <td>5</td> <td>5</td> <td>6</td>
          </tr>
          <tr>
            <th>8</th> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>4</td> <td>4</td> <td>5</td> <td>5</td>
          </tr>
          <tr>
            <th>9</th> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>4</td> <td>4</td> <td>5</td>
          </tr>
          <tr>
            <th>10</th> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>3</td> <td>4</td> <td>4</td>
          </tr>
        </tbody>
      `;
      _wrapper.appendChild(_toWound);
    });
  }
};
