var width = window.innerWidth;
var height = window.innerHeight;
const CURRENT_VERSION = 'v0.0.2';
const MULTIPLIER = 1.12;

var game = new Phaser.Game(width, height, Phaser.AUTO, '', {preload: preload, create: create, update: update, render: render, onClickPizza: onClickPizza});

var stage = new Phaser.Stage(game);
stage.disableVisibilityChange = true;

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
  game.load.image('cursor', 'assets/images/cursore.png');
  game.load.image('pizzaman', 'assets/images/gennaro.png');
  game.load.image('auto-oven', 'assets/images/pizza1.png');
  game.load.image('factory', 'assets/images/pizza1.png');
  this.deltaTime = 0;

  /* ==============================================================
              PLAYER
  ================================================================= */
  this.player = {
    name: "SHOW SHOW",
    pizzaPerClick: 1,
    pizzaPerSec: 0,
    pizzas: 0,
    pizzasOnLifetime: 0
  };


   /* ==============================================================
              GAME SCREEN SECTIONS
    ================================================================= */
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
  pizzaSprite.scale.setTo( 4, 4);
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
      font: '24px Arial Black',
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

  // PIZZA UI
  this.pizzaInfoUI = this.game.add.group();
  this.pizzaInfoUI.position.setTo((this.pizzaInfoUIPositions.finishX / 2), this.pizza.positionY - 200);

  // GAME VERSION
  this.gameVersion = this.pizzaInfoUI.addChild(this.game.add.text(-140, height - 90, CURRENT_VERSION, {
    font: '16px Arial Black',
    fill: '#fff',
    strokeThickness: 4
  }));

   // Pizzeria Text
  this.pizzeriaNameText = this.pizzaInfoUI.addChild(this.game.add.text(0, 0, (this.player.name + "'s Pizzeria"), {
    font: '18px Arial Black',
    fill: '#fff',
    strokeThickness: 4
  }));

   // Pizza Count Text
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
      icon: 'cursor', name: 'Cursore', level: 0, cost: 10, baseCost: 10, pps: 0.1
    },
    {
      icon: 'pizzaman', name: 'Gennaro', level: 0, cost: 100, baseCost: 100, pps: 1
    },
    {
      icon: 'auto-oven', name: 'Forno a Legna', level: 0, cost: 1200, baseCost: 1200, pps: 10
    },
    {
      icon: 'factory', name: 'Fabbrica', level: 0, cost: 14000, baseCost: 14000, pps: 50
    }
  ];

  var button;
  buildingsButtonData.forEach(function(buttonData, index) {
    button = state.game.add.button(0, (50 * index), state.game.cache.getBitmapData('button'));
    button.icon = button.addChild(state.game.add.image(0, 6, buttonData.icon));
    button.text = button.addChild(state.game.add.text(42, 6, (buttonData.name), {
      font: '16px Arial Black'
    }));
    button.levelText = button.addChild(state.game.add.text(250, 6, buttonData.level), {
      font: '16px Arial Black'
    })
    button.details = buttonData;
    button.costText = button.addChild(this.game.add.text(42, 24, (buttonData.cost), {
      font: '16px Arial Black'
    }));
    button.events.onInputDown.add(onBuildingButtonClick, state);

    buildingsButtons.addChild(button);
  });
}

/* ========================================================
        UPDATE FUNCTION
======================================================== */
var theta = 0;

function update() {
  this.deltaTime += game.time.elapsed/1000;

  if(this.deltaTime > 0.1) {
    this.player.pizzas += (this.player.pizzaPerSec * this.deltaTime);
    this.player.pizzasOnLifetime += (this.player.pizzaPerSec * this.deltaTime);
    this.deltaTime = 0;
  }

  theta += this.deltaTime;
  console.log(theta);
  console.log(this.pizzaSprite);

  this.pizzaCountText.text = ("Pizzas: " + (this.player.pizzas).toFixed(2));
  this.pizzaPerSecondText.text = ("per second: " + (this.player.pizzaPerSec).toFixed(2));
}

function render() {

}

/* ========================================================
        CLICKED ON BUILDING
======================================================== */
function onBuildingButtonClick(button, pointer) {
  if(this.player.pizzas - button.details.cost >= 0) {
    console.log(button);
    this.player.pizzas -= button.details.cost;
    this.player.pizzaPerSec += button.details.pps;
    button.details.level++;
    button.details.cost = calculatePrice(button.details.baseCost, button.details.level);
    button.levelText.text = (button.details.level);
    button.costText.text = (button.details.cost.toFixed(2));
    // upgrade here how much of the building the player have
  }
}

/* ========================================================
        CLICKED ON PIZZA
======================================================== */
function onClickPizza(pizza, pointer) {
  var ppCText = this.pizzaTextPool.getFirstExists(false);
  if(ppCText) {
    ppCText.text = ("+" + this.player.pizzaPerClick);
    ppCText.reset(pointer.positionDown.x, (pointer.positionDown.y - 50));
    ppCText.alpha = 1;
    ppCText.tween.start();
  }

  pizza.scale.setTo(pizza.scale.x - 0.1, pizza.scale.y - 0.1);
  setTimeout(function(){
    pizza.scale.setTo(4,4);
  }, 100);

  this.player.pizzas += this.player.pizzaPerClick;
  this.player.pizzasOnLifetime += this.player.pizzaPerClick;
}

/* ========================================================
  THE EXPONENTIAL FUNCTION THAT DICTATES THE WHOLE GAME
======================================================== */
function calculatePrice(baseCost, level) {
  var price = (baseCost * (MULTIPLIER ** level));
  return price;
}
