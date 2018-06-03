// Variables

// Declare a global variable hero
let hero = {
  name: 'Floris',
  heroic: true,
  inventory: [{type:'sword',damage:3},
              {type:'knife',damage:2},
              {type:'cannonball',damage:10},
             ],
  health: 10,
  weapon: {
    type: 'broomstick',
    damage: 1 /* if damage is set to 0 (no damage) weaponHasDamage
                 returns false! So instead set it to 1 (slight damage) to
                 make the test work */
  }
}
// Keep track of the number of inventory items displayed on the web page
let oldPageInventoryLength=0;

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
  console.log(creature.inventory);
  creature.weapon=creature.inventory[index];
  // Modify the creature's `inventory` by removing the `index`th element from it

  //creature.inventory=creature.inventory.splice(index,1);
  // The splice function did not work, ok let's do with a for loop and push

  let newInventory=[];
  for (i=0;i<creature.inventory.length;i++){
    if (i!==index){
      newInventory.push(creature.inventory[i]);
    }
  }
  creature.inventory=newInventory;
  console.log('updated inventory');
  console.log(creature.inventory);
  // Return the creature object
  return creature;
}

// Declare a function that takes two creatures, the first of which is a hero,
// which deal damage to each other until one of them dies.
function doBattle (heroicCreature,creature) {
  // Make a guard clause which checks if `heroicCreature` is `heroic`.
  // If `heroicCreature` is not `heroic` return `null` from this function.
  if (!heroicCreature.heroic){
    return null;
  }
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
    window.alert('Victory, your hero ' + hero.name + ' killed the enemy!');
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
  console.log('Hero\'s health is ' + hero.health);
  updateStats()
}

// Get the weapon image page element by getElementById
let weaponId= document.getElementById('weapon');
// Call the pickUpItem function when the weapon image is clicked
weaponId.onclick = function(){
  pickUpItem(hero,{type:'lance',damage:3});
  console.log('Hero\'s picked up item is ' + hero.inventory[hero.inventory.length-1].type);
  updateStats()
}

// Get the enemy image page element by getElementById
let enemyId= document.getElementById('enemy');
// Call the doBattle function when the weapon image is clicked
enemyId.onclick = function(){
  let enemy = {health:10,weapon:{damage:2}}
  console.log('Hero\'s weapon\'s damage is ' + hero.weapon.damage);
  console.log('Enemy\'s weapon\'s damage is ' + enemy.weapon.damage);
  console.log('Before the battle:')
  console.log('Hero\'s health is ' + hero.health);
  console.log('Enemy\'s health is ' + enemy.health);
  console.log('The battle starts');
  let winner=doBattle(hero,enemy);
  console.log('After the battle:')
  console.log('Hero\'s health is ' + hero.health);
  console.log('Enemy\'s health is ' + enemy.health);
  console.log('Winner\'s health is ' + winner.health);
  updateStats()
}

// Get the backpack image page element by getElementById
let backpackId= document.getElementById('backpack');
// Call the equipWeapon function when the backpack image is clicked
backpackId.onclick = function(){
  // check whether there are any weapons left
  if (hero.inventory.length === 0){
    window.alert('Sorry, no weapons left to be equiped');
    return
  }
  // Ask and force the user to enter a valid weapon index
  let index;
  let indexMax=hero.inventory.length-1
  let message='Please enter a valid weapon index number';
  message=message+'\nThe index should be between 0 and ' + indexMax
  index=parseInt(window.prompt(message))
  while (index<0 || index > hero.inventory.length-1 || isNaN(index)) {
    index = parseInt(window.prompt(message))
  }
  // Call the equipWeapon function with the given index
  hero=equipWeapon(hero,index);
  console.log('Hero\'s equiped weapon is ' + hero.weapon.type);
  console.log(hero);
  updateStats()
}

// Declare a function that writes the hero's name, health, weapon type,
// weapon damage to the page.
function displayStats(){
  // select the document ul element by id heroStatus
  let heroStatusId = document.getElementById('heroStatus');

  // Declare a helper function to create/add one status item as a
  // list item to the web page including an id for later retrieval
  function addHeroStatusItemToPage(listId,listItem){
    // Create a new list element
    let newListItem = document.createElement("li");
    // Set the id attribute for the new status item
    newListItem.setAttribute("id", listId);
    // Create the content for the new status item
    let newContent = document.createTextNode(listItem);
    // Add the new status item to the newly created list element
    newListItem.appendChild(newContent);
    // Add the new status item to the document ul element
    heroStatusId.appendChild(newListItem);
  }
  // Add the status items to the web page
  addHeroStatusItemToPage('heroName','Name: ' + hero.name);
  addHeroStatusItemToPage('heroHealth','Health: ' + hero.health);
  addHeroStatusItemToPage('heroWeaponType','Weapon type: ' + hero.weapon.type);
  addHeroStatusItemToPage('heroWeaponDamage','Weapon damage: ' + hero.weapon.damage);
}

// Call the displayStats function
displayStats();

// Declare a function that writes the hero's inventory to the page.
function displayInventory(){
  // select the document ul element by id heroInventory
  let heroInventoryId = document.getElementById('heroInventory');

  // Declare a helper function to create/add the next inventory item as a
  // list item to the web page including an id for later retrieval
  function addHeroInventoryItemToPage(listId,listItem){
    // Create a new list element
    let newListItem = document.createElement("li");
    // Set the id attribute for the new inventory item
    newListItem.setAttribute("id", listId);
    // Create the content for the new inventory item
    let newContent = document.createTextNode(listItem);
    // Add the new inventory item to the newly created list element
    newListItem.appendChild(newContent);
    // Add the new inventory item to the document ul element
    heroInventoryId.appendChild(newListItem);
  };

  // Add the inventory items to the web page with element id weapon0,weapon1,...
  hero.inventory.forEach(function(weapon,index){
    let weaponDescription='Type: ' + weapon.type + ', Damage: ' + weapon.damage;
    addHeroInventoryItemToPage('weapon'+index,weaponDescription)
  });
  // Remember the length of the current inventory shown on the page,
  // needed in updateStats
  oldPageInventoryLength=hero.inventory.length
}

// Call the displayInventory function
displayInventory();

// Declare a function that calls `displayStats` and `displayInventory`.
function updateStats() {
  // First remove all the status and inventory elements from the page
  let parent = document.getElementById("heroStatus");
  var child = document.getElementById("heroName");
  parent.removeChild(child);
  parent.removeChild(document.getElementById("heroHealth"));
  parent.removeChild(document.getElementById("heroWeaponType"));
  parent.removeChild(document.getElementById("heroWeaponDamage"));
  parent = document.getElementById("heroInventory");
  // For the inventory run a for loop for the remaining weapons left
  // and remove each one from the page by element id weapon0, weapon1, ...
  for (index=0;index<oldPageInventoryLength;index++) {
    parent.removeChild(document.getElementById("weapon"+index));
  }
  // Now call the displayStats and displayInventory functions
  displayStats();
  displayInventory()
}

// Call the updateStats function
updateStats();
