import { RosterMESBG } from "./rosterMESBG";

const el = (t: keyof HTMLElementTagNameMap, classes: string = ""): HTMLElement => {
  const _el = document.createElement(t);
  // _el.setAttribute("class", classes);
  _el.className = classes;
  return _el ;
}
const textEl = (t: keyof HTMLElementTagNameMap, classes: string = "", text: string = ""): HTMLElement => {
  const _el = el(t, classes);
  _el.appendChild(document.createTextNode(text));
  return _el; 
};
const nobrDiv = () => el("div", "mesbg_noBreak mesbg_bumpDown");

const statsTable = () => el("table", "mesbg_profileTable mesbg_noBreak mesbg_bumpDown");
const statsHeader = (txt: string[]) => {
  const _tr = el("tr");
  txt.forEach(str => {
    _tr.appendChild(textEl("th", "", str));
  });
  return _tr;
};
const statsRow = (txt: string[]) => {
  const _tr = el("tr");
  txt.forEach(str => {
    _tr.appendChild(textEl("td", "", str));
  });
  return _tr;
};
const makeStatsTable = (labels:string[], values: string[]) => {
  const _tbl = statsTable();
  _tbl.appendChild(statsHeader(labels));
  _tbl.appendChild(statsRow(values));
  return _tbl;
};

const renderHeroName = (n:string) => textEl("h2", "mesbg_h2", n);
const renderWarriorName = (n:string) => textEl("h3", "mesbg_h3", n);
const renderRosterName = (n:string) => textEl("h1", "mesbg_h1", n);
const renderEquipmentList = (n:string) => textEl("p", "mesbg_equipmentList", n);

/* ===== CHECKBOX TRACKERS ====== */
const checkboxStates = {
  showTracker: true,
  showRules: true,
}
type CheckboxStates = keyof typeof checkboxStates;

const checkboxHandler = (name: CheckboxStates) => () => {
  const newState = !checkboxStates[name]
  checkboxStates[name] = newState;
  const _div = document.querySelector(`.mesbg_${name}`);
  if(_div !== null) {
    if(newState) {
      _div.classList.remove("mesbg_hideMe");
    } else {
      _div.classList.add("mesbg_hideMe")
    }
  }

}
const getCheckboxAndLabel = (name: CheckboxStates, labelText: string) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('name', name);
    input.setAttribute('id', name);
    if(checkboxStates[name]) {
      input.setAttribute('checked', 'checked');
    }
    input.addEventListener('change', checkboxHandler(name));
    const label = document.createElement('label');
    label.setAttribute('for', name);
    label.appendChild(document.createTextNode(` ${labelText}  `));
    label.prepend(input);
    return label;
}

const PROFILE_HEADERS = [ "Mv", "F", "S", "D", "A", "W", "C", ];
// TODO: figure out why title and friends can be `null` at all...
export const renderMESBG = (roster: RosterMESBG , titleEl: HTMLElement | null, listEl: HTMLElement | null, forcesEl: HTMLElement | null): void => {

  if(titleEl !== null) {
    const _boxes = el("div", "mesbg_noPrint mesbg_toggleHolder");
    _boxes.appendChild(getCheckboxAndLabel("showTracker", "include hero points tracker"));
    _boxes.appendChild(getCheckboxAndLabel("showRules", "show rules text"));
    titleEl.appendChild(_boxes);
    titleEl.appendChild(renderRosterName(roster.name));
    titleEl.appendChild(
      textEl("h4", "mesbg_rosterInfo", `${roster.points} points | ${roster.warriors} warriors `)
    );
  }
  // UNIT SUMMARIES
  if(listEl !== null) {
    const _wrapper = el("div", "mesbg_container");
    listEl.appendChild(_wrapper);
    roster.forces.forEach(force => {
      // force name
      _wrapper.appendChild(
        textEl("h2", "mesbg_forceName", force.name)
      );
      _wrapper.appendChild(
        textEl("h4", "mesbg_rosterInfo mesbg_bumpDown",
          `${force.breakpoints.modelCount} models
          | broken at ${force.breakpoints.half} casualties
          | quartered at ${force.breakpoints.quarter} models remaining
          `
        )
      )
      textEl("h4", "mesbg_rosterInfo", `${roster.points} points | ${roster.warriors} warriors `)
      const _grid = el("div", "mesbg_flexGrid");
      _wrapper.appendChild(_grid);
      force.units.forEach(unit => {
        const _unitWrapper = el("div", "mesbg_card");
        _unitWrapper.appendChild(
          renderHeroName(`${unit.leader.name}  - ${unit.leader.points}pts ${unit.leader.heroStuff?.isLeader ? "  (Leader)" : ""}`)
        );
        _unitWrapper.appendChild(
          renderEquipmentList(`${unit.leader.wargear.map(w => w.name).join(", ")}${unit.leader.mount ? ", " + unit.leader.mount?.name : ""}`)
        );
        _unitWrapper.appendChild(el("hr", "mesbg_bumpDown"));
        unit.warband.forEach(warrior => {
          const _r = renderWarriorName(`${warrior.count} ${warrior.model.name} - ${warrior.points}pts`);
          _r.appendChild(textEl("span", "mesbg_equipmentList", ` : ${warrior.model.wargear.map(w => w.name).join(", ")}${warrior.model.mount ? ", " + warrior.model.mount?.name : ""}`));
          _unitWrapper.appendChild(_r);
        });
        _grid.appendChild(_unitWrapper);
      })
    });
  }
  // DATA CARDS
  // TODO: remove the duplication
  if(forcesEl != null) {
    const _wrapper = el("div", "mesbg_container");
    forcesEl.appendChild(_wrapper);
    roster.forces.forEach(force => {
      force.units.forEach(unit => {
        // do the leader
        const _card = el("div", "mesbg_card");
        const _unitWrapper = el("div", "mesbg_twoColumn");
        _card.appendChild(
          renderHeroName(`${unit.leader.name}  - ${unit.leader.points}pts`)
        );
        _card.appendChild(textEl("h3", "mesbg_h3", 
          unit.leader.keywords.join(", ")
        ));
        const _flx = el("div", "mesbg_flex mesbg_noBreak");
        _flx.appendChild(
          makeStatsTable(
            PROFILE_HEADERS,
            [
              unit.leader.profile.movement,
              unit.leader.profile.fight,
              unit.leader.profile.strength,
              unit.leader.profile.defense,
              unit.leader.profile.attack,
              unit.leader.profile.wounds,
              unit.leader.profile.courage,
            ]
          )
        );
        _flx.appendChild(
          makeStatsTable(
            ["M","W","F"],
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
        if(unit.leader.wargear.length === 0) {
          _gearBlock.appendChild(textEl("i", "", "none"))
        } else {
          _gearBlock.appendChild(textEl("p", "mesbg_cardWargear", unit.leader.wargear.map(w => w.name).join(", ")));
        }
        _unitWrapper.appendChild(_gearBlock);
        // heroic actions
        if(unit.leader.heroStuff?.actions.length ?? 0 > 0) {
          const _w = nobrDiv();
          _w.appendChild(textEl("h3", "mesbg_h3", "Heroic Actions"));
          const _actionList = el("ul", "mesbg_list mesbg_noBreak mesbg_bumpDown");
          unit.leader.heroStuff?.actions.forEach(a => {
            _actionList.appendChild(el("li")).appendChild(document.createTextNode(a));
          });
          _w.appendChild(_actionList);
          _unitWrapper.appendChild(_w);
        }

        // rules (have parser mark special ones?)
        _unitWrapper.appendChild(textEl("h3", "mesbg_h3", "Special Rules"));
        _unitWrapper.appendChild(textEl("p", "mesbg_bumpDown", unit.leader.rules.map(r => r.name).join(", ")));

        // fancy magic power table
        if(unit.leader.heroStuff?.magicalPowers.length ?? 0 > 0) {
          const _pwrTable = statsTable(); 
          _pwrTable.className = "mesbg_powerTable mesbg_noBreak"; // TODO: lol
          const _pwrHeaderRow = el("tr");
          _pwrHeaderRow.appendChild(el("th")).appendChild(textEl("h3", "mesbg_h3", "Magical Powers"));
          _pwrHeaderRow.appendChild(el("th")).appendChild(textEl("span", "", "Range"));
          _pwrHeaderRow.appendChild(el("th")).appendChild(textEl("span", "", "Casting"));
          _pwrTable.appendChild(_pwrHeaderRow);
          unit.leader.heroStuff?.magicalPowers.forEach(p => {
            const _pwrRow = el("tr");
            _pwrRow.appendChild(el("td")).appendChild(textEl("span", "", p.name));
            _pwrRow.appendChild(el("td")).appendChild(textEl("span", "", p.range));
            _pwrRow.appendChild(el("td")).appendChild(textEl("span", "", p.casting));
            _pwrTable.appendChild(_pwrRow);
          })
          _unitWrapper.appendChild(_pwrTable);
        }
        // Does they have a mount?
        if(unit.leader.mount !== undefined) {
          const _d = nobrDiv();
          _d.appendChild(renderWarriorName(`Mount: ${unit.leader.mount.name}`));
          const _flx = el("div", "mesbg_flex mesbg_noBreak");
          _flx.appendChild(
            makeStatsTable(
              PROFILE_HEADERS,
              [
                unit.leader.mount.profile.movement,
                unit.leader.mount.profile.fight,
                unit.leader.mount.profile.strength,
                unit.leader.mount.profile.defense,
                unit.leader.mount.profile.attack,
                unit.leader.mount.profile.wounds,
                unit.leader.mount.profile.courage,
              ]
            )
          );
          _d.append(_flx);
          _unitWrapper.append(_d);
        }
        
        _card.appendChild(_unitWrapper);
        _wrapper.appendChild(_card);
        // do the warband
        unit.warband.forEach(modelType => {
          const _card = el("div", "mesbg_card");
          const _unitWrapper = el("div", "mesbg_twoColumn");

          _card.appendChild(
            renderWarriorName(modelType.model.name)
          );
          _card.appendChild(textEl("h3", "mesbg_h3", 
            modelType.model.keywords.join(", ")
          ));
          const _flx = el("div", "mesbg_flex mesbg_noBreak");
          _flx.appendChild(
            makeStatsTable(
              PROFILE_HEADERS,
              [
                modelType.model.profile.movement,
                modelType.model.profile.fight,
                modelType.model.profile.strength,
                modelType.model.profile.defense,
                modelType.model.profile.attack,
                modelType.model.profile.wounds,
                modelType.model.profile.courage,
              ]
            )
          );
          _unitWrapper.appendChild(_flx);
          // wargear
          _unitWrapper.appendChild(textEl("h3", "mesbg_h3", "Wargear"));
          _unitWrapper.appendChild(textEl("p", "mesbg_cardWargear mesbg_bumpDown", modelType.model.wargear.map(w => w.name).join(", ")));
          // rules (have parser mark special ones?)
          if(modelType.model.rules.length > 0) {
            _unitWrapper.appendChild(textEl("h3", "mesbg_h3", "Special Rules"));
            _unitWrapper.appendChild(textEl("p", "mesbg_bumpDown", modelType.model.rules.map(r => r.name).join(", ")));
          }
        if(modelType.model.mount !== undefined) {
          const _d = nobrDiv();
          _d.appendChild(renderWarriorName(`Mount: ${modelType.model.mount.name}`));
          const _flx = el("div", "mesbg_flex mesbg_noBreak");
          _flx.appendChild(
            makeStatsTable(
              PROFILE_HEADERS,
              [
                modelType.model.mount.profile.movement,
                modelType.model.mount.profile.fight,
                modelType.model.mount.profile.strength,
                modelType.model.mount.profile.defense,
                modelType.model.mount.profile.attack,
                modelType.model.mount.profile.wounds,
                modelType.model.mount.profile.courage,
              ]
            )
          );
          _d.append(_flx);
          _unitWrapper.append(_d);
        }
          _card.appendChild(_unitWrapper);
          _wrapper.appendChild(_card);
        });
      });

    });
    // DO THE RULES
    const seenRules = new Set<string>(); // only print each rule once!
    const _ruleWrapper = el("div", "mesbg_twoColumn mesbg_pageBreak mesbg_showRules");
    _ruleWrapper.appendChild(textEl("h1", "mesbg_h1 mesbg_bumpDown", "Rules"));
    roster.forces.forEach(force => {
      force.units.forEach(unit => {
        unit.leader.rules.forEach(_rule => {
          if(seenRules.has(_rule.name) === false) {
            _ruleWrapper.appendChild(textEl("h3", "mesbg_h3", _rule.name));
            _ruleWrapper.appendChild(textEl("p", "mesbg_bumpDown", _rule.ruleText));
            seenRules.add(_rule.name);
          }
        })
        unit.warband.forEach(modelType => {
          modelType.model.rules.forEach(_rule => {
            if(seenRules.has(_rule.name) === false) {
              _ruleWrapper.appendChild(textEl("h3", "mesbg_h3", _rule.name));
              _ruleWrapper.appendChild(textEl("p", "mesbg_bumpDown", _rule.ruleText));
              seenRules.add(_rule.name);
            }
          })
        });
      });
      _wrapper.appendChild(_ruleWrapper);
      // OMG Hero Points Tracker mb?
      const _trackerTable = el("table", "mesbg_pageBreak mesbg_trackerTable mesbg_showTracker");
      _trackerTable.innerHTML = "<tr><th></th><th>M</th><th>W</th><th>F</th></tr>";
      roster.forces.forEach(force => {
        force.units.forEach(unit => {
          const _r = el("tr");
          _r.innerHTML = `<td><h3 class="mesbg_h3">${unit.leader.name}</h3></td><td><div class="mesbg_diceBlock" /></td><td><div class="mesbg_diceBlock" /></td><td><div class="mesbg_diceBlock" /></td>`
          _trackerTable.appendChild(_r)
        });
      });
      _wrapper.appendChild(_trackerTable);
    })
  }
}