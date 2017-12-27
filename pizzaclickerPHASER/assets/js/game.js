var width = window.innerWidth;
var height = window.innerHeight;

var game = new Phaser.Game(width, height, Phaser.AUTO, '', {preload: preload, create: create, update: update, render: render, onClickPizza: onClickPizza});

var pizzaText = "Pizza Clicker"

/*
  =============================================================================
  =============================================================================
          PRELOAD
  =============================================================================
  =============================================================================
*/

function preload() {
  game.load.image('pizza', 'assets/images/pizza2.png');
  game.load.image('cursor', 'assets/images/pizza1.png');
  game.load.image('pizzaman', 'assets/images/pizza1.png');
  game.load.image('auto-oven', 'assets/images/pizza1.png');
  game.load.image('factory', 'assets/images/pizza1.png');
  this.deltaTime = 0;

  // player
  this.player = {
    name: "SHOW SHOW",
    pizzaPerClick: 1,
    pizzaPerSec: 0,
    pizzas: 0
  };


  /*
    GAME SCREEN SECTIONS
  */
  this.pizzaInfoUIPositions = {
    initialX: 0,
    finishX: width / 4
  };

  this.centerUI = {
    initialX: width / 4,
    finishX: 3*width / 4
  }

  this.storeUI = {
    initialX: 3*width / 4,
    finishX: width
  }


  this.pizza = {
    positionX: this.pizzaInfoUIPositions.finishX / 2,
    positionY: ((height / 2) - 75)
  };

  /*
    PIZZA AREA BACKGROUND
  */
  var pizzaAreaBackground = this.game.add.bitmapData(this.pizzaInfoUIPositions.finishX, height);
  pizzaAreaBackground.ctx.fillStyle = "#9a738d";
  pizzaAreaBackground.ctx.strokeStyle = "#35371c";
  pizzaAreaBackground.ctx.lineWidth = 12;
  pizzaAreaBackground.ctx.fillRect(0, 0, this.pizzaInfoUIPositions.finishX, height);
  pizzaAreaBackground.ctx.strokeRect(0, 0, this.pizzaInfoUIPositions.finishX, height);
  this.game.cache.addBitmapData('pizzaAreaBackground', pizzaAreaBackground);

  /*
    BUILDINGS
  */

  //background
  var bmd = this.game.add.bitmapData((this.storeUI.finishX - this.storeUI.initialX), height);
  bmd.ctx.fillStyle = "#9a738d";
  bmd.ctx.strokeStyle = "#35371c";
  bmd.ctx.lineWidth = 12;
  bmd.ctx.fillRect(0, 0, (this.storeUI.finishX - this.storeUI.initialX), height);
  bmd.ctx.strokeRect(0, 0, (this.storeUI.finishX - this.storeUI.initialX), height);
  this.game.cache.addBitmapData('buildingsPanel', bmd);


  // creating the buttons
}

/*
  =============================================================================
  =============================================================================
          CREATE
  =============================================================================
  =============================================================================
*/

function create() {
  var state = this;

  this.pizzaAreaPanel = this.game.add.image(0, 0, this.game.cache.getBitmapData('pizzaAreaBackground'));
  this.buildingsPanel = this.game.add.image(this.storeUI.initialX, 0, this.game.cache.getBitmapData('buildingsPanel'));

                /*
                =================================================================
                =================================================================
                    PIZZA INFO UI (LEFT PART)
                =================================================================
                =================================================================
                */
  var pizzaSprite = game.add.sprite(this.pizza.positionX, this.pizza.positionY, 'pizza');
  pizzaSprite.scale.setTo( 3, 3);
  pizzaSprite.angle += 180;
  pizzaSprite.anchor.setTo(0.5, 0.5);

  // enabling input to click
  pizzaSprite.inputEnabled = true;
  pizzaSprite.events.onInputDown.add(state.onClickPizza, state);

  // Text when Clicking Pizza
  this.pizzaTextPool = this.add.group();
  var ppCText;
  for(var i = 0; i < 50; i++) {
    ppCText = this.add.text(0, 0, '1', {
      font: '42px Arial Black',
      fill: '#fff',
      strokeThickness: 4
    });
    ppCText.exists = false;
    ppCText.tween = game.add.tween(ppCText)
    .to({
      alpha: 0,
      y: 50,
      x: this.game.rnd.integerInRange(this.pizza.positionX - 150, this.pizza.positionX + 150)
    }, 1000, Phaser.Easing.Cubic.Out);

    ppCText.tween.onComplete.add(function(text, tween) {
      text.kill();
    });
    this.pizzaTextPool.add(ppCText);
  }

  // Text of how much pizza you have
  this.pizzaInfoUI = this.game.add.group();
  this.pizzaInfoUI.position.setTo((this.pizzaInfoUIPositions.finishX / 2), this.pizza.positionY - 200);

  this.pizzeriaNameText = this.pizzaInfoUI.addChild(this.game.add.text(0, 0, (this.player.name + "'s Pizzeria"), {
    font: '18px Arial Black',
    fill: '#fff',
    strokeThickness: 4
  }));
  this.pizzaCountText = this.pizzaInfoUI.addChild(this.game.add.text(0, 50, ("Pizzas: " + this.player.pizzas), {
    font: '42px Arial Black',
    fill: '#fff',
    strokeThickness: 4
  }));
  this.pizzaPerSecondText = this.pizzaInfoUI.addChild(this.game.add.text(0, 100, ("per second: " + this.player.pizzaPerSec), {
    font: '24px Arial Black',
    fill: '#fff',
    strokeThickness: 4
  }));

  this.pizzeriaNameText.anchor.set(0.5);
  this.pizzaCountText.anchor.set(0.5);
  this.pizzaPerSecondText.anchor.set(0.5);

  /*
                =================================================================
                =================================================================
                    STORE (RIGHT PART)
                =================================================================
                =================================================================
  */
  this.storeInfoUI = this.game.add.group();
  this.storeInfoUI.position.setTo(( this.storeUI.initialX + ((this.storeUI.finishX - this.storeUI.initialX) / 2)), 100);

  this.storeLabelText = this.storeInfoUI.addChild(this.game.add.text(0, 0, "Store", {
    font: '36px Arial Black',
    fill: '#fff',
    strokeThickness: 4
  }));

  this.storeLabelText.anchor.set(0.5);

  var buildingsButtons = this.buildingsPanel.addChild(this.game.add.group());
  buildingsButtons.position.setTo(20, 150);

  var buildingsButtonData = [
    {
      icon: 'cursor', name: 'Cursor', level: 0, cost: 10, ppc: 0.1
    },
    {
      icon: 'pizzaman', name: 'Gennaro', level: 0, cost: 100, ppc: 1
    },
    {
      icon: 'auto-oven', name: 'Auto Oven', level: 0, cost: 500, ppc: 10
    },
    {
      icon: 'factory', name: 'Factory', level: 0, cost: 2500, ppc: 50
    }
  ];

  var button;
  buildingsButtonData.forEach(function(buttonData, index) {
    button = state.game.add.button(0, (50 * index), state.game.cache.getBitmapData('button'));
    button.icon = button.addChild(state.game.add.image(6, 6, buttonData.icon));
    button.text = button.addChild(state.game.add.text(42, 6, (buttonData.name + ": " + buttonData.level), {
      font: '16px Arial Black'
    }));
    button.details = buttonData;
    button.costText = button.addChild(this.game.add.text(42, 24, ("Cost: " + buttonData.cost), {
      font: '16px Arial Black'
    }));
    button.events.onInputDown.add(onBuildingButtonClick, state);

    buildingsButtons.addChild(button);
  });
}

function update() {

  this.deltaTime += game.time.elapsed/1000;

  if(this.deltaTime > 0.1) {
    this.player.pizzas += (this.player.pizzaPerSec * this.deltaTime);
    this.deltaTime = 0;
  }

  this.pizzaCountText.text = ("Pizzas: " + (this.player.pizzas).toFixed(2));
  this.pizzaPerSecondText.text = ("per second: " + (this.player.pizzaPerSec).toFixed(2));
}

function render() {

}

/*

*/

function onBuildingButtonClick(button, pointer) {
  if(this.player.pizzas - button.details.cost >= 0) {
    console.log(button);
    this.player.pizzas -= button.details.cost;
    this.player.pizzaPerSec += button.details.ppc;
    button.details.level++;
    button.text.text = (button.details.name + ": " + button.details.level);
    // upgrade here how much of the building the player have
  }
}

function onClickPizza(pizza, pointer) {
  var ppCText = this.pizzaTextPool.getFirstExists(false);
  if(ppCText) {
    ppCText.text = ("+" + this.player.pizzaPerClick);
    ppCText.reset(pointer.positionDown.x, (pointer.positionDown.y - 50));
    ppCText.alpha = 1;
    ppCText.tween.start();
  }

  this.player.pizzas += this.player.pizzaPerClick;
}
