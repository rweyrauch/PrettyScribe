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

import { WarcryUnit, WarcryUnitRoleToString, RosterWarcry, WarcryWeapon } from "./rosterWarcry";
import { Renderer} from "./renderer";


export class RendererWarcry implements Renderer {

    private _roster: RosterWarcry|null = null;
   
    constructor(roster: RosterWarcry) {
        this._roster = roster;
    }

    render(title: HTMLElement|null, list: HTMLElement|null, forces: HTMLElement|null): void {
        if (this._roster == null) {
            return;
        }

        if (title) {
            title.innerHTML = '<h3>' + this._roster._name + ' (' + this._roster._points + ' pts</h3>';
        }

        for (let force of this._roster._forces) {
            const forceTitle = document.createElement('div');
            if (forceTitle) {
              forceTitle.innerHTML = '<p>' + force._catalog + ' ' + force._name + '</p>';
            }
            if (list)
                list.appendChild(forceTitle);

            const table = document.createElement('table');
            table.classList.add('table');
            table.classList.add('table-sm');
            table.classList.add('table-striped');
            const thead = document.createElement('thead');
            table.appendChild(thead);
            thead.classList.add('thead-light');
            const tr = document.createElement('tr');
            thead.appendChild(tr);
            const headerInfo = [{ name: "NAME", w: '35%'}, {name:"ROLE", w:'25%'}, {name:"POINTS", w:'15%'}];
            headerInfo.forEach(element => {
              let th = document.createElement('th');
              th.scope = "col";
              th.innerHTML = element.name;
              th.style.width = element.w;
              tr.appendChild(th);
            });
            forceTitle.appendChild(table);

            let body = document.createElement('tbody');
            table.appendChild(body);
            for (let unit of force._units) {
              let tr = document.createElement('tr');
              let uname = document.createElement('td');
              uname.innerHTML = unit._name;
              let role = document.createElement('td');
              role.innerHTML = WarcryUnitRoleToString[unit._role];
              let pts = document.createElement('td');
              pts.innerHTML = unit._points.toString();
              tr.appendChild(uname);
              tr.appendChild(role);
              tr.appendChild(pts);
              body.appendChild(tr);    
            }

            let allegianceAbilities = document.createElement('div');
            if (force._allegiance._rules.size > 0) {
                let abilityHeader = document.createElement('h3');
                allegianceAbilities.appendChild(abilityHeader);
                abilityHeader.textContent = force._allegiance._name + " Abilities";
                for (let trait of force._allegiance._rules) {
                    let row = document.createElement('div');
                    let name = document.createElement('h4');
                    name.textContent = trait[0];
                    let desc = document.createElement('p');
                    desc.textContent = trait[1];
                    row.appendChild(name);
                    row.appendChild(desc);
                    allegianceAbilities.appendChild(row);
                }
            }

            if (forces)
                forces.appendChild(allegianceAbilities);
            else
                return;

            let unitsRegion = document.createElement('div');
            for (let unit of force._units) {
                unitsRegion.appendChild(this.renderUnitHtml(unit));  

                let divider = document.createElement('hr');
                divider.className = "aos_dark";
                unitsRegion.appendChild(divider);             
            }                
            forces.appendChild(unitsRegion);
        }
    }

    protected createCharacteristicCard(label: string, value: string): HTMLDivElement {
        let root = document.createElement('div');
        root.className = "col";
        root.innerHTML = `
            <div class="card warcry_card">
                <img class="card-img-top warcry_card_img" src="./assets/warcry/runemarks/black/characteristics-${label}.svg" alt="">
                <div class="card-body warcry_card_label">
                    <p class="card-title warcry_font">${value}</p>
                </div>
            </div>`;
        return root;            
    }

    protected createWeapon(weapon: WarcryWeapon, parent: HTMLDivElement) {
        let weaponName = document.createElement('p');
        weaponName.className = "card-title warcry_font";
        weaponName.innerHTML = weapon._name;
        parent.appendChild(weaponName);

        let weaponRow = document.createElement('div');
        weaponRow.className = "row";
        parent.appendChild(weaponRow);

        let weaponTypeName = this.getWeaponTypeRunemark(weapon._name);
        let weaponType = document.createElement('div');
        weaponType.className = "col";
        weaponType.innerHTML = `
            <div class="card warcry_card">
                <img src="./assets/warcry/runemarks/black/weapons-${weaponTypeName}.svg" alt="">
            </div>`;
        weaponRow.appendChild(weaponType);

        let weaponRange = this.createCharacteristicCard("range", weapon._range);
        weaponRow.appendChild(weaponRange);

        let weaponAttacks = this.createCharacteristicCard("attacks", weapon._attacks);
        weaponRow.appendChild(weaponAttacks);
 
        let weaponStr = this.createCharacteristicCard("strength", weapon._strength);
        weaponRow.appendChild(weaponStr);

        let weaponDam = this.createCharacteristicCard("damage", weapon._damage);
        weaponRow.appendChild(weaponDam);          
    }

    protected renderUnitHtml(unit: WarcryUnit): HTMLDivElement {

        let unitRoot = document.createElement('div');
        unitRoot.className = "container-fluid border";

        let row0 = document.createElement('div');
        row0.className = "row align-items-center";
        unitRoot.append(row0);
       
        let factionName = "chaos-tzeentch-arcanites";        
        let factionImg = document.createElement('div');
        factionImg.className = "col-1";
        factionImg.innerHTML = `<img class="border border-dark rounded-circle warcry_card" src="./assets/warcry/runemarks/black/factions-${factionName}.svg" alt="">`;
        row0.appendChild(factionImg);

        let unitName = document.createElement('div');
        unitName.className = "col";
        unitName.innerHTML = `<span class="warcry_font" style="font-size: 2.2em;">${unit._name}</span>`;
        row0.appendChild(unitName);
        
        let abilities = document.createElement('div');
        abilities.className = "col-4";
        row0.appendChild(abilities);
        for (let key of unit._keywords) {
            // is key a unit ability?
            const ability = this.getAbilityRunemark(key);
            if (ability != "") {
                let runemark = new Image();
                runemark.className = "border border-dark rounded-circle warcry_card";
                runemark.src = `./assets/warcry/runemarks/black/fighters-${ability}.svg`;
                abilities.appendChild(runemark);
            }
        }

        let points = document.createElement('div');
        points.className = "col-1";
        points.innerHTML = `<div class="border border-dark text-center rounded-circle warcry_font" style="width: 72px; height: 72px; line-height: 72px;">${unit._points}</div>`;
        row0.appendChild(points);

        let row1 = document.createElement('div');
        row1.className = "row align-items-center";
        unitRoot.append(row1);

        let weapon1 = document.createElement('div');
        weapon1.className = "col";
        row1.appendChild(weapon1);
        if (unit._weapons.length == 2) {
            this.createWeapon(unit._weapons[1], weapon1);
        }

        let blank1 = document.createElement('div');
        blank1.className = "col";
        row1.appendChild(blank1);

        let row2 = document.createElement('div');
        row2.className = "row align-items-center";
        unitRoot.append(row2);

        let weapon2 = document.createElement('div');
        weapon2.className = "col";
        row2.appendChild(weapon2);
        if (unit._weapons.length >= 1) {
            this.createWeapon(unit._weapons[0], weapon2);
        }

        let stats = document.createElement('div');
        stats.className = "col";
        row2.appendChild(stats);
        let statsRow = document.createElement('div');
        statsRow.className = "row";
        stats.appendChild(statsRow);

        let blank2 = document.createElement('div');
        blank2.className = "col";
        statsRow.appendChild(blank2);

        let move = this.createCharacteristicCard("move", unit._move.toString());    
        statsRow.appendChild(move);

        let toughness = this.createCharacteristicCard("toughness", unit._toughness.toString());
        statsRow.appendChild(toughness);
    
        let wounds = this.createCharacteristicCard("wounds", unit._wounds.toString());
        statsRow.appendChild(wounds);

        return unitRoot;
    }

    private getFactionRunemark(name: string) : string {
        const name_ref = name.toLowerCase();
        if (name_ref.includes("beasts of chaos")) {
            return "chaos-beasts-of-chaos";
        }
        else if (name_ref.includes("corvus")) {
            return "chaos-corvus-cabal";
        }
        else if (name_ref.includes("cypher")) {
            return "chaos-cypher-lords";
        }
        else if (name_ref.includes("everchosen")) {
            return "chaos-everchosen";
        }
        else if (name_ref.includes("golems")) {
            return "chaos-iron-golems";
        }
        else if (name_ref.includes("khorne") && name_ref.includes("bloodbound")) {
            return "chaos-khorne-bloodbound";
        }
        else if (name_ref.includes("khorne") && name_ref.includes("daemon")) {
            return "chaos-khorne-daemons";
        }
        else if (name_ref.includes("nurgle") && name_ref.includes("rotbringer")) {
            return "chaos-nurgle-rotbringers";
        }
        else if (name_ref.includes("nurgle") && name_ref.includes("daemon")) {
            return "chaos-nurgle-daemons";
        }
        else if (name_ref.includes("scions")) {
            return "chaos-scions-of-the-flame";
        }
        else if (name_ref.includes("skaven")) {
            return "chaos-skaven";
        }
        else if (name_ref.includes("slaanesh") && name_ref.includes("sybariteI g")) {
            return "chaos-slaanesh-syberites";
        }
        else if (name_ref.includes("slaanesh") && name_ref.includes("daemon")) {
            return "chaos-slaanesh-daemons";
        }
        else if (name_ref.includes("slaves")) {
            return "chaos-slaves-to-darkness";
        }
        else if (name_ref.includes("spire")) {
            return "chaos-spire-tyrants";
        }
        else if (name_ref.includes("splintered")) {
            return "chaos-splintered-fang";
        }
        else if (name_ref.includes("unmade")) {
            return "chaos-the-unmade";
        }
        else if (name_ref.includes("tzeentch") && name_ref.includes("arcanite")) {
            return "chaos-tzeentch-arcanites";
        }
        else if (name_ref.includes("tzeentch") && name_ref.includes("daemon")) {
            return "chaos-tzeentch-daemons";
        }
        else if (name_ref.includes("untamed")) {
            return "chaos-untamed-beasts";
        }
        else if (name_ref.includes("flesh")) {
            return "death-flesh-eater-courts";
        }

        return "";
    }

    private getAbilityRunemark(name: string) : string {
        const name_ref = name.toLowerCase();
        if (name_ref.includes("agile")) {
            return "agile";
        }
        else if (name_ref.includes("ally")) {
            return "ally";
        }
        else if (name_ref.includes("beast")) {
            return "beast";
        }
        else if (name_ref.includes("berserker")) {
            return "berserker";
        }
        else if (name_ref.includes("brute")) {
            return "brute";
        }
        else if (name_ref.includes("bulwark")) {
            return "bulwark";
        }
        else if (name_ref.includes("champion")) {
            return "champion";
        }
        else if (name_ref.includes("destroyer")) {
            return "destroyer";
        }
        else if (name_ref.includes("elite")) {
            return "elite";
        }
        else if (name_ref.includes("ferocious")) {
            return "ferocious";
        }
        else if (name_ref.includes("fly")) {
            return "fly";
        }
        else if (name_ref.includes("frenzied")) {
            return "frenzied";
        }
        else if (name_ref.includes("gargantuan")) {
            return "gargantuan";
        }
        else if (name_ref.includes("icon")) {
            return "icon-bearer";
        }
        else if (name_ref.includes("leader")) {
            return "leader";
        }
        else if (name_ref.includes("minion")) {
            return "minion";
        }
        else if (name_ref.includes("mount")) {
            return "mount";
        }
        else if (name_ref.includes("mystic")) {
            return "mystic";
        }
        else if (name_ref.includes("priest")) {
            return "priest";
        }
        else if (name_ref.includes("scout")) {
            return "scout";
        }
        else if (name_ref.includes("sentience")) {
            return "sentience";
        }
        else if (name_ref.includes("terrifying")) {
            return "terrifying";
        }
        else if (name_ref.includes("thrall")) {
            return "thrall";
        }
        else if (name_ref.includes("trapper")) {
            return "trapper";
        }
        else if (name_ref.includes("warrior")) {
            return "warrior";
        }

        // Unknown
        return "";
    }

    private getWeaponTypeRunemark(name: string) : string {
        const name_ref = name.toLowerCase();
        if (name_ref.includes("axe") || name_ref.includes("cleaver")) return "axe";
        else if (name_ref.includes("claws") || name_ref.includes("talon") || name_ref.includes("grasping") || name_ref.includes("pincher")) return "claws";
        else if (name_ref.includes("club")) return "club";
        else if (name_ref.includes("dagger") || name_ref.includes("shank")) return "dagger";
        else if (name_ref.includes("fangs") || name_ref.includes("teeth") || name_ref.includes("jaws") || name_ref.includes("maw")) return "fangs";
        else if (name_ref.includes("hammer") || name_ref.includes("anvil")) return "hammer";
        else if (name_ref.includes("mace") || name_ref.includes("staff") || name_ref.includes("stave") || name_ref.includes("flail")) return "mace";
        else if (name_ref.includes("scythe")) return "scythe";
        else if (name_ref.includes("spear") || name_ref.includes("glaive") || name_ref.includes("halberd") || 
                 name_ref.includes("lance") || name_ref.includes("harpoon") || name_ref.includes("polearm")) return "spear";
        else if (name_ref.includes("sword") || name_ref.includes("blade") || name_ref.includes("sickles")) return "sword";
        else if (name_ref.includes("arcane bolt") || name_ref.includes("sorcerous bolt")) return "blast";
        else if (name_ref.includes("bow") || name_ref.includes("bolas") || name_ref.includes("cannon") || 
                 name_ref.includes("pistol") || name_ref.includes("javelin")) return "ranged-weapon";
        else if (name_ref.includes("whip")) return "reach-weapon";
        return "unarmed";
    }

}