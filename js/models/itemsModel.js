export default class Item{
    id = 0;
    name = ''
    description = ''
    value = 0
    img = ''
    constructor(name, description, value = 0, img) {
        this.id = (itemArray.length == 0 ? 1 : itemArray[itemArray.length - 1].id + 1);
        this.name = name;
        this.description = description;
        this.value = value;
        this.img = img;
    }
    get id() { return this.id; }
    set id(value) { this.id = value; }

    get name() { return this.name; }
    set name(value) { this.name = value; }

    get description() { return this.description; }
    set description(value) { this.description = value; }

    get value() { return this.value; }
    set value(value) { 
        if(value < 0) this.value = 0;
        else this.value = value;
    }

    get img() { return this.img; }
    set img(value){this.img = value;}
}

//ITENS
var itemArray = []
const item1 = new Item('Death Unbounded', 'The next time you die in a boss battle, you will revive.', 500,'../../media/img/icon_deathUnbound.png')
itemArray.push(item1)
const item2 = new Item('Way to Cool', 'Your way too cool for that exercise, just skip it.', 1500, '../../media/img/icon_wayToCool.png')
itemArray.push(item2)
const item3 = new Item('Play Maker', 'Reduce your options to only 2 being one of them the correct one.', 2500, '../../media/img/icon_playMaker.png')
itemArray.push(item3)
const item4 = new Item('Secret Achivment', 'Nice you found a secret achivment this one is for free',0, '../../media/img/icon_secretAchivment.png')
itemArray.push(item4)

export{itemArray}