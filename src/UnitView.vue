<template>
  <div class="unit-view info-panel">
    <span>{{ equipment.label }}: <em>{{ equipment.value }}</em></span>
    <span>Defense: <em>{{ defense }}</em></span>
    <span>Moves: <em>{{ moves }}</em></span>
    <span v-if="cargo">Cargo: <em>{{ cargo }}</em></span>
    <span>Cost: <em>{{ cost }}</em></span>
    <span>Prerequisite: <em><item-link :item="item.prerequisite"></item-link></em></span>
    <markup-view v-if="item.text" :text="item.text"></markup-view>
  </div>
</template>

<script>
import ViewMixin from './ViewMixin'
import {ceil, capitalize} from 'lodash'

export default {
  mixins: [ ViewMixin ],
  computed: {
    equipment() {
      let weapon = this.item.weapon;
      let label, value;
      if(weapon == undefined) {
        label = 'Equipment';
        value = 'Alien Artifact';
      }
      else if(weapon.power == 0) {
        label = 'Equipment';
        value = weapon.name;
      }
      else {
        label = 'Weapon';
        if(weapon.power == -1) {
          value = 'Psi';
        }
        else {
          value = weapon.power;
        }
      }
      return { label, value };
    },
    defense() {
      let armor = this.item.armor.armor;
      if(armor == -1) {
        return 'Psi';
      }
      return armor;
    },
    moves() {
      var chassis = this.item.chassis;
      return capitalize(chassis.type)+' '+chassis.moves;
    },
    cargo() {
      if(this.item.cargo) {
        return this.item.cargo;
      }
      if(this.item.name == 'Unity Foil') {
        return 1;
      }
      if(this.item.weapon && this.item.weapon.id == 'Transport') {
        return this.item.chassis.cargo;
      }
      return 0;
    },
    cost() {
      let cost = this.item.cost;
      if(cost > 0) {
        return cost * 10;
      }
      else {
        let mode = this.item.chassis.type;
        let weapon = this.item.weapon.cost;
        let armor = this.item.armor.cost;
        let speed = this.item.chassis.cost;
        let reactor = 1;

        if(mode == 'SEA') {
          armor = armor / 2;
        }
        weapon = Math.max(weapon, armor / 2);
        let cost = weapon * (armor + speed) * 10 / Math.pow(2, reactor + 1);

        if(mode == 'SEA') {
          cost /= 2;
        }
        if(speed == 1) {
          cost /= 2;
        }
        if(weapon > 1 && armor > 1) {
          cost += 10;
        }
        if(weapon != 1 || armor != 1 || speed != 1 || reactor != 1) {
          cost = Math.max(cost, (reactor * 2 - reactor / 2) * 10);
        }
        cost = ceil(cost, -1);
        return cost;
      }
    }
  }
}
</script>

<style scoped>
.unit-view {
  display: flex;
  flex-direction: column;
}

.unit-view em {
  color: #b8c060;
  font-style: normal;
}
</style>
