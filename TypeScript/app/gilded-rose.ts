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
        break;
      case Catalog.AGED_BRIE:
        this.quality = Math.min(MAX_QUALITY, this.quality + (this.sellIn < 0 ? 2 : 1));
        break;
      case Catalog.BACKSTAGE_PASSES:
        let stepper = 1;
        if(this.sellIn < 0){
          stepper = -this.quality;
        }else if(this.sellIn < 5){
          // We use 5 rather than 6, because 'sellIn' is deducted before we read it.
          stepper = 3;
        }else if(this.sellIn < 10){
          // Same here, use 10 rather 11.
          stepper = 2;
        }
        this.quality = Math.min(this.quality + stepper, MAX_QUALITY);
        break;
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

  /**
   * Surface items for testing purpose
   */
  outputItems(){
    this.items.forEach(element => {
      console.log(element.name + ', ' + element.sellIn + ', ' + element.quality);
    });
  }

  /**
   * Update each element
   * @returns items
   */
  updateQuality() {
    this.items.forEach(t=> t.updateQuality());
    return this.items.map(t=>new Item(t.name,t.sellIn,t.quality));
  }
}

