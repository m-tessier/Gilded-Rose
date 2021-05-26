class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    const listItemsUpdate = this.items.filter((item) => item.name !== 'Sulfuras, Hand of Ragnaros')

    listItemsUpdate.forEach((item) => {

      item.sellIn -= 1;
      
      switch (item.name) {
        case 'Aged Brie' :
          if (item.quality < 50) {
            item.quality += 1;
            item.sellIn < 0 ? item.quality += 1 : null;
          }
          break;
        case 'Backstage passes to a TAFKAL80ETC concert' :
          if (item.quality < 50) {
            item.quality = item.quality + 1;
            item.sellIn < 11 ? item.quality += 1 : null;
            item.sellIn < 6 ? item.quality += 1 : null;
            item.sellIn < 0 ? item.quality = 0 : null;
          }         
          break;
        case String(item.name.match(/^Conjured.*/)) :
          item.quality > 1 ? item.quality -= 2 : null;
          item.quality === 1 ? item.quality -= 1 : null;
          if (item.sellIn < 0) {
            item.quality > 1 ? item.quality -= 2 : null;
            item.quality === 1 ? item.quality -= 1 : null;
          }
          break;
        default :
        item.quality > 0 ? item.quality -= 1 : null;
        item.sellIn < 0 && item.quality > 0 ? item.quality -= 1 : null;
      }
    });
    console.log(this.items)

    return this.items;
  }
}

module.exports = { Shop };