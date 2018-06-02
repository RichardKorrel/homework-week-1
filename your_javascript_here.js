// Variables

// Declare a global variable hero
let hero = {
  name: 'Floris',
  heroic: true,
  inventory: [{type:'sword',damage:1}],
  health: 10,
  weapon: {
    type: 'sword',
    damage: 1 /* if damage is set to 0 (no damage) weaponHasDamage
                 returns false! So instead set it to 1 (slight damage) to
                 make the test work */
  }
}

// Game logic

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

// UI

// Get the bed image page element by getElementById
let bedId= document.getElementById('bed');
console.log(bedId);
// Call the rest function when the bed image is clicked
bedId.onclick = function(){
  rest(hero);
  console.log('Hero\'s health is ' + hero.health)
}

// Get the weapon image page element by getElementById
let weaponId= document.getElementById('weapon');
// Call the pickupItem function when the weapon image is clicked
weaponId.onclick = function(){
  pickUpItem(hero,{type:'lance',damage:2});
  console.log('Hero\'s picked up item is ' + hero.inventory[hero.inventory.length-1].type);
  console.log(hero)
}
