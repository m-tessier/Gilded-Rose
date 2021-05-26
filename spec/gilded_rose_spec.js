let { Item } = require('../src/js/Item.js');
let { Shop } = require('../src/js/Shop.js');


describe("GildedRose shop manager", function () {
  let listItems;

  beforeEach(function () {
    listItems = [];
  });



  // ITEMS NORMAUX
  it("Baisser de 1 la qualité et sellIn d'item normaux", function () {
    listItems.push(new Item("+5 Dexterity Vest", 10, 20));
    listItems.push(new Item("Mana Cake", 3, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 2, quality: 5 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });


  it("Baisser de 2 la qualité quand sellIn est négatif d'item normaux", function () {
    listItems.push(new Item("+5 Dexterity Vest", 0, 10));
    listItems.push(new Item("Mana Cake", -5, 15));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: -1, quality: 8 },
      { sellIn: -6, quality: 13 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });




  // QUALITE ENTRE 0 ET 50
  it("La qualité ne peut pas être négative pour des items normaux, ou Conjured", function () {
    listItems.push(new Item("+5 Dexterity Vest", 5, 0));
    listItems.push(new Item("Conjured Magic Stick", -5, 2));
    listItems.push(new Item("Conjured Magic Stick", -5, 1));
    listItems.push(new Item("Conjured Magic Stick", -5, 0));
    
    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: 4, quality: 0 },
      { sellIn: -6, quality: 0 },
      { sellIn: -6, quality: 0 },
      { sellIn: -6, quality: 0 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });


  it("La qualité ne peut pas être suppérieur à 50 pour Aged Brie et Backstage passes", function () {
    listItems.push(new Item("Aged Brie", 20, 50));
    listItems.push(new Item("Aged Brie", 10, 49));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 20, 50));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 3, 49));
    
    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: 19, quality: 50 },
      { sellIn: 9, quality: 50 },
      { sellIn: 19, quality: 50 },
      { sellIn: 2, quality: 50 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });


  it("La qualité est égale à 0 quand sellIn est négatif pour Aged Brie et Backstage passes", function () {
    listItems.push(new Item("Aged Brie", 0, 10));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 0, 15));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: -1, quality: 0 },
      { sellIn: -1, quality: 0 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });




  // AGED BRIE ET BACKSTAGE
  it("Augmenter la qualité de 1 pour Aged Brie et Backstage passes", function () {
    listItems.push(new Item("Aged Brie", 20, 30));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 20, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 19, quality: 31 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });


  it("Augmenter la qualité de 2 quand il reste 11 jours ou moins pour Aged Brie et Backstage passes", function () {
    listItems.push(new Item("Aged Brie", 11, 30));
    listItems.push(new Item("Aged Brie", 8, 30));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 11, 30));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 8, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: 10, quality: 32 },
      { sellIn: 7, quality: 32 },
      { sellIn: 10, quality: 32 },
      { sellIn: 7, quality: 32 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });


  it("Augmenter la qualité de 3 quand il reste 5 jours ou moins pour Aged Brie et Backstage passes", function () {
    listItems.push(new Item("Aged Brie", 5, 30));
    listItems.push(new Item("Aged Brie", 3, 30));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 5, 30));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 3, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: 4, quality: 33 },
      { sellIn: 2, quality: 33 },
      { sellIn: 4, quality: 33 },
      { sellIn: 2, quality: 33 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  


  // CONFURED
  it("La qualité diminue deux fois plus vite pour Conjured", function () {
    listItems.push(new Item("Conjured Dark Blade", 20, 30));
    listItems.push(new Item("Conjured Magic Stick", -5, 20));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: 19, quality: 28 },
      { sellIn: -6, quality: 16 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });




  // SULFURAS
  it("La qualité de Sulfuras ne se modifie pas", function () {
    listItems.push(new Item("Sulfuras, Hand of Ragnaros", null, 80));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: null, quality: 80 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
    });
  });

});