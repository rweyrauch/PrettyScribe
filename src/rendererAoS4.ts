/*
    Copyright 2020 Rick Weyrauch,

    Permission to use, copy, modify, and/or distribute this software for any purpose
    with or without fee is hereby granted, provided that the above copyright notice
    and this permission notice appear in all copies.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
    FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
    OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
    TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE
    OF THIS SOFTWARE.
*/

import {
    AoS4Ability, AoS4BattleTacticCard, AoS4Force, AoS4Manifestation,
    AoS4MeleeWeapon, AoS4RangedWeapon, AoS4Unit, FormatAbilityText, RosterAoS4
} from "./rosterAoS4";
import { Renderer } from "./renderer";

export class RendererAoS4 implements Renderer {

    private _roster: RosterAoS4 | null = null;

    constructor(roster: RosterAoS4) {
        this._roster = roster;
    }

    render(title: HTMLElement | null, list: HTMLElement | null, forces: HTMLElement | null): void {
        if (!this._roster) return;

        if (title) {
            let pointsStr = this._roster._points.toString();
            if (this._roster._pointLimit > 0) {
                pointsStr += ' / ' + this._roster._pointLimit;
            }
            title.innerHTML = '<h3>' + this._roster._name.toUpperCase() + ' (' + pointsStr + ' pts)</h3>';
        }

        let globalUnitId = 0;

        for (let force of this._roster._forces) {
            if (force._name !== "Regiment") {
                // Army config force - render army-wide config
                this.renderArmyConfig(force, list, forces);
                continue;
            }

            // Regiment force
            const forceTitle = document.createElement('div');
            forceTitle.innerHTML = '<p>' + force._catalog + ' - ' + force._name + '</p>';
            if (list) list.appendChild(forceTitle);

            const headerInfo = [
                { name: "NAME", width: '40%' },
                { name: "SELECTIONS", width: '45%' },
                { name: "POINTS", width: '15%' }
            ];
            const table = this.createTable(headerInfo);
            table.classList.add("table", "table-sm", "aos4_font");
            forceTitle.appendChild(table);

            let body = document.createElement('tbody');
            table.appendChild(body);

            for (let unit of force._units) {
                unit._id = globalUnitId++;
                let tr = document.createElement('tr');
                let uname = document.createElement('td');
                uname.innerHTML = `<a class="text-dark" href="#unit_${unit._id}">${unit._name}</a>`;
                let selections = document.createElement('td');
                selections.innerHTML = "";
                for (const selection of unit._selections) {
                    if (selection !== unit._name) {
                        selections.innerHTML += selection + "<br>";
                    }
                }
                let pts = document.createElement('td');
                pts.textContent = unit._points.toString();
                tr.appendChild(uname);
                tr.appendChild(selections);
                tr.appendChild(pts);
                body.appendChild(tr);
            }

            if (!forces) continue;

            let divider = document.createElement('hr');
            divider.classList.add("aos4_dark");
            forces.appendChild(divider);

            for (let unit of force._units) {
                forces.appendChild(this.renderUnitHtml(unit));

                let unitDivider = document.createElement('hr');
                unitDivider.classList.add("aos4_dark");
                forces.appendChild(unitDivider);
            }
        }
    }

    private renderArmyConfig(force: AoS4Force, list: HTMLElement | null, forces: HTMLElement | null): void {
        if (list) {
            const forceTitle = document.createElement('div');
            forceTitle.innerHTML = '<p>' + force._catalog + ' - ' + force._name + '</p>';
            list.appendChild(forceTitle);
        }

        if (!forces) return;

        let configRoot = document.createElement('div');

        // Battle Traits
        if (force._battleTraits.length > 0) {
            let header = document.createElement('h3');
            header.textContent = "BATTLE TRAITS";
            configRoot.appendChild(header);
            this.renderAbilityList(configRoot, force._battleTraits);
        }

        // Battle Formation
        if (force._battleFormation.length > 0) {
            let header = document.createElement('h3');
            header.textContent = force._battleFormationName ? "BATTLE FORMATION: " + force._battleFormationName.toUpperCase() : "BATTLE FORMATION";
            configRoot.appendChild(header);
            this.renderAbilityList(configRoot, force._battleFormation);
        }

        // Battle Tactic Cards
        if (force._battleTacticCards.length > 0) {
            let header = document.createElement('h3');
            header.textContent = "BATTLE TACTIC CARDS";
            configRoot.appendChild(header);
            this.renderBattleTacticCards(configRoot, force._battleTacticCards);
        }

        // Spell Lore
        if (force._spellLore.length > 0) {
            let header = document.createElement('h3');
            header.textContent = "SPELL LORE";
            configRoot.appendChild(header);
            this.renderAbilityList(configRoot, force._spellLore);
        }

        // Prayer Lore
        if (force._prayerLore.length > 0) {
            let header = document.createElement('h3');
            header.textContent = "PRAYER LORE";
            configRoot.appendChild(header);
            this.renderAbilityList(configRoot, force._prayerLore);
        }

        // Manifestations
        if (force._manifestations.length > 0) {
            let header = document.createElement('h3');
            header.textContent = "MANIFESTATIONS";
            configRoot.appendChild(header);
            for (let manifestation of force._manifestations) {
                configRoot.appendChild(this.renderManifestationHtml(manifestation));
            }
        }

        // Manifestation Abilities (Summon spells/prayers)
        if (force._manifestationAbilities.length > 0) {
            let header = document.createElement('h3');
            header.textContent = "MANIFESTATION ABILITIES";
            configRoot.appendChild(header);
            this.renderAbilityList(configRoot, force._manifestationAbilities);
        }

        // Faction Terrain
        if (force._factionTerrain.length > 0) {
            let header = document.createElement('h3');
            header.textContent = "FACTION TERRAIN";
            configRoot.appendChild(header);
            for (let terrain of force._factionTerrain) {
                configRoot.appendChild(this.renderUnitHtml(terrain));
            }
        }

        forces.appendChild(configRoot);
    }

    private createTable(heading: { name: string, width: string }[]): HTMLTableElement {
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        table.appendChild(thead);
        thead.classList.add('aos4_light');
        const tr = document.createElement('tr');
        thead.appendChild(tr);
        heading.forEach(element => {
            let th = document.createElement('th');
            th.scope = "col";
            th.textContent = element.name;
            th.style.width = element.width;
            tr.appendChild(th);
        });
        return table;
    }

    private renderUnitHtml(unit: AoS4Unit): HTMLDivElement {
        let unitRoot = document.createElement('div');
        unitRoot.classList.add("container-fluid", "aos4_unit");

        let unitName = document.createElement('div');
        unitName.classList.add("p-2", "mb-2", "aos4_medium", "text-center", "text-uppercase", "text-black");
        unitName.innerHTML = `<span class="h3"><a name="unit_${unit._id}">${unit._name}</a></span>`;
        unitRoot.append(unitName);

        let unitRow = document.createElement('div');
        unitRow.classList.add("row");
        unitRoot.append(unitRow);

        // Stats box
        if (unit._move || unit._health || unit._save || unit._control) {
            let unitStats = document.createElement('div');
            unitStats.classList.add("col-3");
            unitStats.innerHTML = `<div class="aos4_unit_stats">
                <div class="aos4_stat_move"><p class="h1">${unit._move || '-'}</p></div>
                <div class="aos4_stat_health"><p class="h1">${unit._health || '-'}</p></div>
                <div class="aos4_stat_save"><p class="h1">${unit._save || '-'}</p></div>
                <div class="aos4_stat_control"><p class="h1">${unit._control || '-'}</p></div>
                </div>`;
            unitRow.append(unitStats);
        }

        let unitInfo = document.createElement('div');
        unitInfo.classList.add("col");
        unitRow.appendChild(unitInfo);

        // Ranged Weapons
        if (unit._rangedWeapons.length > 0) {
            this.renderRangedWeaponTable(unitInfo, unit._rangedWeapons);
        }

        // Melee Weapons
        if (unit._meleeWeapons.length > 0) {
            this.renderMeleeWeaponTable(unitInfo, unit._meleeWeapons);
        }

        // Abilities
        if (unit._abilities.length > 0) {
            this.renderAbilitiesSection(unitInfo, unit._abilities);
        }

        // Keywords
        if (unit._keywords.size > 0) {
            this.renderKeywords(unitRoot, unit._keywords);
        }

        return unitRoot;
    }

    private renderManifestationHtml(manifestation: AoS4Manifestation): HTMLDivElement {
        let root = document.createElement('div');
        root.classList.add("container-fluid", "aos4_unit");

        let nameDiv = document.createElement('div');
        nameDiv.classList.add("p-2", "mb-2", "aos4_medium", "text-center", "text-uppercase", "text-black");
        nameDiv.innerHTML = `<span class="h3">${manifestation._name}</span>`;
        root.append(nameDiv);

        let row = document.createElement('div');
        row.classList.add("row");
        root.append(row);

        // Stats box with Banishment instead of Control
        let statsDiv = document.createElement('div');
        statsDiv.classList.add("col-3");
        statsDiv.innerHTML = `<div class="aos4_manifestation_stats">
            <div class="aos4_stat_move"><p class="h1">${manifestation._move || '-'}</p></div>
            <div class="aos4_stat_health"><p class="h1">${manifestation._health || '-'}</p></div>
            <div class="aos4_stat_save"><p class="h1">${manifestation._save || '-'}</p></div>
            <div class="aos4_stat_control"><p class="h1">${manifestation._banishment || '-'}</p></div>
            </div>`;
        row.append(statsDiv);

        let info = document.createElement('div');
        info.classList.add("col");
        row.appendChild(info);

        // Melee Weapons
        if (manifestation._meleeWeapons.length > 0) {
            this.renderMeleeWeaponTable(info, manifestation._meleeWeapons);
        }

        // Abilities
        if (manifestation._abilities.length > 0) {
            this.renderAbilitiesSection(info, manifestation._abilities);
        }

        // Keywords
        if (manifestation._keywords.size > 0) {
            this.renderKeywords(root, manifestation._keywords);
        }

        return root;
    }

    private renderRangedWeaponTable(parent: HTMLElement, weapons: AoS4RangedWeapon[]): void {
        let table = document.createElement('table');
        table.classList.add("table", "table-sm", "aos4_table", "aos4_font", "text-center");
        table.innerHTML =
            `<tr class="aos4_light">
                <th>Ranged Weapons</th>
                <th>Rng</th>
                <th>Atk</th>
                <th>Hit</th>
                <th>Wnd</th>
                <th>Rnd</th>
                <th>Dmg</th>
                <th>Ability</th>
            </tr>`;
        let body = document.createElement('tbody');
        table.appendChild(body);

        for (let weapon of weapons) {
            let row = document.createElement('tr');
            row.innerHTML = `<td>${weapon._name}</td><td>${weapon._range}</td><td>${weapon._attacks}</td>
                             <td>${weapon._toHit}</td><td>${weapon._toWound}</td><td>${weapon._rend}</td>
                             <td>${weapon._damage}</td><td>${weapon._ability}</td>`;
            body.appendChild(row);
        }
        parent.appendChild(table);
    }

    private renderMeleeWeaponTable(parent: HTMLElement, weapons: AoS4MeleeWeapon[]): void {
        let table = document.createElement('table');
        table.classList.add("table", "table-sm", "aos4_table", "aos4_font", "text-center");
        table.innerHTML =
            `<tr class="aos4_light">
                <th>Melee Weapons</th>
                <th>Atk</th>
                <th>Hit</th>
                <th>Wnd</th>
                <th>Rnd</th>
                <th>Dmg</th>
                <th>Ability</th>
            </tr>`;
        let body = document.createElement('tbody');
        table.appendChild(body);

        // Deduplicate weapons by name
        let seen = new Set<string>();
        for (let weapon of weapons) {
            let key = weapon._name + '|' + weapon._attacks + '|' + weapon._toHit + '|' + weapon._toWound + '|' + weapon._rend + '|' + weapon._damage + '|' + weapon._ability;
            if (seen.has(key)) continue;
            seen.add(key);

            let row = document.createElement('tr');
            row.innerHTML = `<td>${weapon._name}</td><td>${weapon._attacks}</td>
                             <td>${weapon._toHit}</td><td>${weapon._toWound}</td><td>${weapon._rend}</td>
                             <td>${weapon._damage}</td><td>${weapon._ability}</td>`;
            body.appendChild(row);
        }
        parent.appendChild(table);
    }

    private renderAbilitiesSection(parent: HTMLElement, abilities: AoS4Ability[]): void {
        // Group abilities by type
        const groups: Map<string, AoS4Ability[]> = new Map();
        for (let ability of abilities) {
            let list = groups.get(ability._type);
            if (!list) {
                list = [];
                groups.set(ability._type, list);
            }
            list.push(ability);
        }

        // Render each group
        const typeOrder = ["Passive", "Activated", "Spell", "Prayer", "Blood Tithe"];
        for (let type of typeOrder) {
            let list = groups.get(type);
            if (!list || list.length === 0) continue;

            let header = document.createElement('h4');
            header.textContent = type === "Blood Tithe" ? "BLOOD TITHE ABILITIES" : type.toUpperCase() + " ABILITIES";
            parent.appendChild(header);

            for (let ability of list) {
                let card = document.createElement('div');
                card.classList.add("aos4_ability_card", "aos4_font");

                let nameEl = document.createElement('div');
                nameEl.classList.add("aos4_ability_name");
                nameEl.innerHTML = `<strong>${ability._name}</strong>`;
                card.appendChild(nameEl);

                if (ability._type !== "Passive" && ability._timing) {
                    let timingEl = document.createElement('div');
                    timingEl.classList.add("aos4_ability_field");
                    timingEl.innerHTML = `<strong>Timing: </strong>${FormatAbilityText(ability._timing)}`;
                    card.appendChild(timingEl);
                }

                if (ability._type === "Spell" && ability._castingValue) {
                    let cvEl = document.createElement('div');
                    cvEl.classList.add("aos4_ability_field");
                    cvEl.innerHTML = `<strong>Casting Value: </strong>${ability._castingValue}`;
                    card.appendChild(cvEl);
                }

                if (ability._type === "Prayer" && ability._chantingValue) {
                    let chEl = document.createElement('div');
                    chEl.classList.add("aos4_ability_field");
                    chEl.innerHTML = `<strong>Chanting Value: </strong>${ability._chantingValue}`;
                    card.appendChild(chEl);
                }

                if (ability._type === "Blood Tithe") {
                    if (ability._bloodTithePoints) {
                        let btEl = document.createElement('div');
                        btEl.classList.add("aos4_ability_field");
                        btEl.innerHTML = `<strong>Blood Tithe Points: </strong>${ability._bloodTithePoints}`;
                        card.appendChild(btEl);
                    }
                    if (ability._unlockCondition) {
                        let ucEl = document.createElement('div');
                        ucEl.classList.add("aos4_ability_field");
                        ucEl.innerHTML = `<strong>Unlock Condition: </strong>${FormatAbilityText(ability._unlockCondition)}`;
                        card.appendChild(ucEl);
                    }
                }

                if (ability._declare) {
                    let declareEl = document.createElement('div');
                    declareEl.classList.add("aos4_ability_field");
                    declareEl.innerHTML = `<strong>Declare: </strong>${FormatAbilityText(ability._declare)}`;
                    card.appendChild(declareEl);
                }

                if (ability._effect) {
                    let effectEl = document.createElement('div');
                    effectEl.classList.add("aos4_ability_field");
                    effectEl.innerHTML = `<strong>Effect: </strong>${FormatAbilityText(ability._effect)}`;
                    card.appendChild(effectEl);
                }

                if (ability._keywords) {
                    let kwEl = document.createElement('div');
                    kwEl.classList.add("aos4_ability_field");
                    kwEl.innerHTML = `<strong>Keywords: </strong>${FormatAbilityText(ability._keywords)}`;
                    card.appendChild(kwEl);
                }

                if (ability._usedBy) {
                    let ubEl = document.createElement('div');
                    ubEl.classList.add("aos4_ability_field");
                    ubEl.innerHTML = `<strong>Used By: </strong>${FormatAbilityText(ability._usedBy)}`;
                    card.appendChild(ubEl);
                }

                parent.appendChild(card);
            }
        }
    }

    private renderAbilityList(parent: HTMLElement, abilities: AoS4Ability[]): void {
        this.renderAbilitiesSection(parent, abilities);
    }

    private renderBattleTacticCards(parent: HTMLElement, cards: AoS4BattleTacticCard[]): void {
        for (let card of cards) {
            let cardDiv = document.createElement('div');
            cardDiv.classList.add("aos4_ability_card", "aos4_font");

            let nameEl = document.createElement('div');
            nameEl.classList.add("aos4_ability_name");
            nameEl.innerHTML = `<strong>${card._name}</strong>`;
            cardDiv.appendChild(nameEl);

            if (card._card) {
                let cardField = document.createElement('div');
                cardField.classList.add("aos4_ability_field");
                cardField.innerHTML = `<strong>Card: </strong>${FormatAbilityText(card._card)}`;
                cardDiv.appendChild(cardField);
            }

            if (card._affray) {
                let field = document.createElement('div');
                field.classList.add("aos4_ability_field");
                field.innerHTML = `<strong>Affray: </strong>${FormatAbilityText(card._affray)}`;
                cardDiv.appendChild(field);
            }

            if (card._strike) {
                let field = document.createElement('div');
                field.classList.add("aos4_ability_field");
                field.innerHTML = `<strong>Strike: </strong>${FormatAbilityText(card._strike)}`;
                cardDiv.appendChild(field);
            }

            if (card._domination) {
                let field = document.createElement('div');
                field.classList.add("aos4_ability_field");
                field.innerHTML = `<strong>Domination: </strong>${FormatAbilityText(card._domination)}`;
                cardDiv.appendChild(field);
            }

            parent.appendChild(cardDiv);
        }
    }

    private renderKeywords(parent: HTMLElement, keywords: Set<string>): void {
        let kwDiv = document.createElement('div');
        kwDiv.classList.add("container-fluid");
        let row = document.createElement('div');
        row.classList.add("row");
        kwDiv.appendChild(row);
        let label = document.createElement('div');
        label.classList.add("col-5", "border", "aos4_dark", "text-center");
        label.innerHTML = "<strong>KEYWORDS</strong>";
        row.appendChild(label);
        let previous_separator = "";
        let all_keywords = "";
        for (let kw of keywords) {
            all_keywords += previous_separator;
            all_keywords += kw;
            previous_separator = ", ";
        }
        let values = document.createElement('div');
        values.classList.add("col", "border", "text-left", "text-uppercase");
        values.innerText = all_keywords;
        row.appendChild(values);
        parent.appendChild(kwDiv);
    }
}
