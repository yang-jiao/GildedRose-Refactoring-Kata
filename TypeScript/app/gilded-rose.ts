export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

enum Catalog {
  NORMAL,
  AGED_BRIE,
  BACKSTAGE_PASSES,
  SULFURAS,
  CONJURED
}

const MAX_QUALITY = 50;

class EnhancedItem extends Item {
  catalog?: Catalog;
  constructor(name: string, sellIn: number, quality:number) {
    super(name,sellIn,quality);
    if(name === 'Aged Brie'){
      this.catalog = Catalog.AGED_BRIE;
    }else if(name === 'Backstage passes to a TAFKAL80ETC concert'){
      this.catalog = Catalog.BACKSTAGE_PASSES;
    }else if(name === 'Sulfuras, Hand of Ragnaros'){
      this.catalog = Catalog.SULFURAS;
    }else if(name === 'Conjured Mana Cake'){
      this.catalog = Catalog.CONJURED;
    }else{
      this.catalog = Catalog.NORMAL;
    }
  }

  updateQuality() {
    if(this.catalog !== Catalog.SULFURAS){
      this.sellIn--;
    }
    switch(this.catalog){
      case Catalog.NORMAL:
        this.quality = Math.max(0,this.sellIn < 0 ? this.quality - 2 :this.quality - 1);
        break;
      case Catalog.CONJURED:
        this.quality = Math.max(0,this.sellIn < 0 ? this.quality - 4 :this.quality - 2);
      case Catalog.AGED_BRIE:
        this.quality = Math.min(MAX_QUALITY, this.quality + 1);
      case Catalog.SULFURAS:
        let stepper = 1;
        if(this.sellIn < 0){
          stepper = -this.quality;
        }else if(this.sellIn < 6){
          stepper = 3;
        }else if(this.sellIn < 11){
          stepper = 2;
        }
        this.quality = this.quality + stepper
      default:
        // for 'SULFURAS', we don't update quality and sellIn
        break;
    }
  }
}






export class GildedRose {
  items: Array<EnhancedItem>;

  constructor(_items = [] as Array<Item>) {
    this.items = _items.map(i=> new EnhancedItem(i.name,i.sellIn,i.quality));
  }

  outputItems(){
    this.items.forEach(element => {
      console.log(element.name + ', ' + element.sellIn + ', ' + element.quality);
    });
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1
          }
        }
      } else {
        if (this.items[i].quality < MAX_QUALITY) {
          this.items[i].quality = this.items[i].quality + 1
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < MAX_QUALITY) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < MAX_QUALITY) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
          }
        }
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality
          }
        } else {
          if (this.items[i].quality < MAX_QUALITY) {
            this.items[i].quality = this.items[i].quality + 1
          }
        }
      }
    }
    return this.items.map(t=>new Item(t.name,t.sellIn,t.quality));
  }
}

