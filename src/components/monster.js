import * as PIXI from 'pixi.js';

export default class Monster {
  constructor(args) {
    this.container = new PIXI.Container();
    this.sprite = new PIXI.Sprite();
    this.hpSprite = new PIXI.Sprite();
    this.hpGraphics = new PIXI.Graphics();
    this.hpSprite.addChild(this.hpGraphics);
    // Opt-in to interactivity
    this.sprite.interactive = true;
    this.sprite.interactiveChildren = true;
    // Shows hand cursor
    // this.sprite.buttonMode = true;
    // Pointers normalize touch and mouse
    this.sprite.anchor.set(0.5);
    this.sprite.on('pointerdown', this.onMouseClick.bind(this));

    this.container.addChild(this.sprite);
    this.container.addChild(this.hpSprite);

    this.x = args.x;
    this.y = args.y;
    this.target = { x: this.x, y: this.y };
    this.dir = args.dir;
    this.hero = args.hero;
    this.monsterName = '';
    this.maxHp = 1;
    this.armor = 0;
    this.hp = 0;
    this.alive = true;
    this.effects = [];
    this.isShowingHp = false;
  }

  destructor() {
    this.container.removeChild(this.sprite);
    this.container.removeChild(this.hpGraphics);
  }

  onMouseClick(e) {
    e.stopPropagation();
    this.hero.targetMonster = this;
  }

  calculateEffects() {
    for (let i = 0; i < this.effects.length; i += 1) {
      this.effects[i].onEffect(this);
      this.isShowingHp = true;
    }
    this.effects = [];
  }

  checkAlive() {
    if (this.hp <= 0) {
      this.alive = false;
      this.isShowingHp = false;
      this.destructor();
    }
  }

  setLayer(layer) {
    this.hpSprite.displayGroup = layer;
    this.sprite.displayGroup = layer;
  }

  updateZOder() {
    this.hpSprite.zOrder = -this.sprite.y - this.sprite.height / 2;
    this.sprite.zOrder = -this.sprite.y - this.sprite.height / 2;
  }

  updateHp() {
    this.hpGraphics.clear();
    this.hpGraphics.lineStyle(0, 0xffffff, 1);
    this.hpGraphics.beginFill(0xffffff, 1);
    this.hpGraphics.drawRect(
      this.sprite.x - this.sprite.width / 2,
      this.sprite.y - this.sprite.height / 2 * 1.1,
      this.sprite.width,
      3
    );

    this.hpGraphics.lineStyle(0, 0xff3300, 1);
    this.hpGraphics.beginFill(0xff3300, 1);
    this.hpGraphics.drawRect(
      this.sprite.x - this.sprite.width / 2,
      this.sprite.y - this.sprite.height / 2 * 1.1,
      this.sprite.width * this.hp / this.maxHp,
      3
    );
  }
}
