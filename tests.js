// This file has tests to help you see how you are doing

// Declare a global variable hero
let hero = {
  name: 'Floris',
  heroic: true,
  inventory: [],
  health: 10,
  weapon: {
    type: 'sword',
    damage: 1 /* if damage is set to 0 (no damage) weaponHasDamage
                 returns false! So instead set it to 1 (slight damage) to
                 make the test work */
  }
}

function heroExists(){ return typeof hero !== 'undefined' && hero.constructor === Object }
function heroIsHeroic(){ return heroExists() && hero.heroic && hero.heroic.constructor === Boolean}
function heroHasName(){ return heroExists() && hero.name && hero.name.constructor === String }
function heroHasInventory(){ return heroExists() && hero.inventory && hero.inventory.constructor === Array }
function heroHasHealth(){ return heroExists() && hero.health && hero.health.constructor === Number }
function heroHasWeapon(){ return heroExists() && hero.weapon && hero.weapon.constructor === Object }
function weaponHasType(){ return hero.weapon.type && hero.weapon.type.constructor === String }
function weaponHasDamage(){ return hero.weapon.damage && hero.weapon.damage.constructor === Number }
function weaponHasStats(){ return heroHasWeapon() && weaponHasType() && weaponHasDamage() }

function allHeroTestPassed() {
    return heroExists()
        && heroHasInventory()
        && heroHasHealth()
        && heroHasWeapon()
        && weaponHasStats()
}


function heroTests(){
    console.log('Hero tests:')
    console.assert(heroExists(), 'You havent created a hero object')
    console.assert(heroHasName(), 'Your hero does not have a name')
    console.assert(heroIsHeroic(), 'Your hero is not heroic')
    console.assert(heroHasInventory(), 'Your hero does not have an inventory')
    console.assert(heroHasHealth(), 'Your hero does not have health')
    console.assert(heroHasWeapon(), 'Your hero does not have a weapon')
    console.assert(weaponHasStats(), 'Your weapon does not have the right stats')

    if(allHeroTestPassed()) {
        console.log('%c Hero tests passed! ', 'color: #32CD32')
    }
}

// Declare a function that restores a creatures health to 10
// Assume it to be a hero object
function rest (creature){
  // Set the health of the creature object to 10
  creature.health = 10;
  // Return the updated creature object
  return creature;
}

// Declare a function that adds an item to the inventory of a creature
function pickUpItem (creature, item){
  // Push the item to the creature object
  creature.inventory.push(item);
  // Return the updated creature object
  return creature;
}

// Declare a function that subtracts one creatures weapon damage from another
// creatures health
function dealDamage (attacker, defender){
  // Subtract the weapon damage of the attacker from the health of the defender
  defender.health-=attacker.weapon.damage;
  // Return the defender object
  return defender;
}

// Declare a function that takes and changes the weapon of the creature to one
// that is in their inventory and removes that weapon from their inventory.
function equipWeapon (creature, index){
  // Modify the `weapon` of the `creature` by assigning it the value of the
  // `index`th element of the `inventory`
  creature.weapon=creature.inventory[index];
  // modify the creature's `inventory` by removing the `index`th element from it
  creature.inventory=creature.inventory.slice(index+1,index+1);
  // Return the creature object
  return creature;
}

// Declare a function that takes two creatures, the first of which is a hero,
// which deal damage to each other until one of them dies.
function doBattle (heroicCreature,creature) {
  // Make a guard clause which checks if `heroicCreature` is `heroic`.
  // If `heroicCreature` is not `heroic` return `null` from this function.
  if (!heroicCreature.heroic)
    return null;
  // While `heroicCreature` and `creature` have health above zero they take
  // turns dealingDamage to eachother: `heroicCreature` deals damage to
  // `creature` first. If `creature` survives it deals damage to
  // `heroicCreature`.
  while (heroicCreature.health>0&&creature.health>0){
    dealDamage(heroicCreature,creature);
    if (creature.health> 0) {
      heroicCreature=dealDamage(creature,heroicCreature)
    }
  }
  //console.log(heroicCreature);
  //console.log(creature);

  // check if `heroicCreature` has health above zero; if so return it from the
  // function. Otherwise give the user feedback about the death of their hero
  // with a popup.
  if (heroicCreature.health>0){
    return heroicCreature
  }
  else{
    window.alert('Oh no, your hero died!');
    return creature
  }
}

function functionsExist() {
    try {
        dealDamage && doBattle && pickUpItem && equipWeapon && rest
    } catch (error) {
        return false
    }

    return true
}

function dealDamageWorks() {
    try {
        return dealDamage({ weapon: { damage: 5 }}, { health: 10 }).health === 5
    } catch (error) {
        return false
    }
}

function doBattleGuardStatementWorks() {
    var heroStub = { heroic: true, health: 10, weapon: { damage: 2 } }
    var creatureStub = { heroic: false, health: 5, weapon: { damage: 1 } }

    try {
        var error = doBattle(creatureStub, heroStub)
        return error === null
    } catch (error) {
        return false
    }
}

function doBattleWorks() {
    var heroStub = { heroic: true, health: 10, weapon: { damage: 2 } }
    var creatureStub = { heroic: false, health: 5, weapon: { damage: 1 } }
    try {
        var victor = doBattle(heroStub, creatureStub)
        return victor.heroic && victor.health === 8
    } catch (error) {
        return false
    }
}

function pickUpItemWorks() {
    try {
        return pickUpItem({ inventory: [] }, { type: 'gun', damage: '100'}).inventory.length === 1
    } catch (error) {
        return false
    }
}

function equipWeaponWorks() {
    try {
        var creature = equipWeapon({ inventory: [{ type: 'gun', damage: '100'}], weapon: null }, 0)
        return creature.weapon.type === 'gun' && creature.inventory.length === 0
    } catch (error) {
        return false
    }
}

function restWorks() {
    try {
        return rest({ health: 5 }).health === 10
    } catch (error) {
        return false
    }
}

function allFunctionTestsPassed() {
    return functionsExist()
        && dealDamageWorks()
        && doBattleGuardStatementWorks()
        && doBattleWorks()
        && pickUpItemWorks()
        && equipWeaponWorks()
        && restWorks()
}

function functionTests(){
    console.log('Function tests:')
    console.assert(functionsExist(), 'You have not declared all necessary functions yet')

    if (!functionsExist()) return

    console.assert(dealDamageWorks(), 'dealDamage is not working as it should')
    console.assert(pickUpItemWorks(), 'pickUpItem is not working as it should')
    console.assert(equipWeaponWorks(), 'equipWeapon is not working as it should')
    console.assert(doBattleGuardStatementWorks(), 'doBattle guard statement is not working as it should')
    console.assert(doBattleWorks(), 'doBattle is not working as it should')
    console.assert(restWorks(), 'rest is not working as it should')

    if(!allFunctionTestsPassed()) return

    console.log('%c Function tests passed! ', 'color: #32CD32')
}

function runTests(){
    heroTests()
    functionTests()
}

runTests()
