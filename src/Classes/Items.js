import { Recipe } from "./Recipe"

class Item {
    constructor(id) {
        this.id = id
        this.name = ""
        this.recipe = null
        this.source = null
        this.ingredientCount = 0
    }

    getID() {
        return this.id
    }

    getName() {
        return this.name
    }

    getSource() {
        return this.source
    }

    setName(name) {
        this.name = name
    }

    setSource(source) {
        this.source = source
    }

    addRecipe(recipe) {
        this.recipe = recipe
    }

    getRecipe() {
        return this.recipe
    }

    getIngredientCount() {
        return this.ingredientCount
    }

    setIngredientCount(count) {
        this.ingredientCount = count
    }
}

class Items {
    static list = []
    static nextID = 0

    static addItem(name, recipe, ingredientCount, source) {
        let item = new Item(this.nextID);
        item.setName(name)
        item.addRecipe(recipe)
        item.setSource(source)
        item.setIngredientCount(ingredientCount)
        this.list.push(item)
        this.list.sort((a, b) => a.getName() > b.getName() ? 1:-1)
        return this.nextID++
    }

    static getItems() {
        return this.list
    }

    static getItem(id) {
        let item = this.list.find(item => item.getID() === id)
        return item
    }
}

Items.addItem("Copper Ore", null, 0, 0)//0
let r = new Recipe(1,1)
r.addIngredient(0,3)
Items.addItem("Copper Bar", r, 1, 1)//1
r = new Recipe(1, 1)
r.addIngredient(1, 5)
Items.addItem("Copper Shortsword", r, 1, 2)//2
Items.addItem("Starfury", null, 0, 3)//3
Items.addItem("Enchanted Sword", null, 0, 4)//4
Items.addItem("Bee Keeper", null, 0, 5)//5
Items.addItem("Chlorophyte Ore", null, 0, 0)//6
r = new Recipe(1, 1)
r.addIngredient(6, 5)
Items.addItem("Chlorophyte Bar", r, 1, 6)//7
Items.addItem("Hallowed Bar", null, 0, 7)//8
r = new Recipe(1, 1)
r.addIngredient(8, 12)
Items.addItem("Excalibur", r, 1, 10)//9
Items.addItem("Jungle Spores", null, 0, 8)//10
Items.addItem("Stinger", null, 0, 9)//11
r = new Recipe(2, 1)
r.addIngredient(10, 12)
r.addIngredient(11, 12)
Items.addItem("Blade of Grass", r, 2, 2)//12
Items.addItem("Broken Hero Sword", null, 0, 11)//13
Items.addItem("Obsidian", null, 0, 0)//14
Items.addItem("Hellstone", null, 0, 0)//15
r = new Recipe(2, 1)
r.addIngredient(14, 1)
r.addIngredient(15, 3)
Items.addItem("Hellstone Bar", r, 2, 6)//16
r = new Recipe(1, 1)
r.addIngredient(16, 20)
Items.addItem("Volcano", r, 1, 2)//17
Items.addItem("Muramasa", null, 0, 12)//18
Items.addItem("Demonite Ore", null, 0, 13)//19
r = new Recipe(1, 1)
r.addIngredient(19, 3)
Items.addItem("Demonite Bar", r, 1, 1)//20
r = new Recipe(1, 1)
r.addIngredient(20, 10)
Items.addItem("Light's Bane", r, 1, 2)//21
r = new Recipe(4, 1)
r.addIngredient(12, 1)
r.addIngredient(17, 1)
r.addIngredient(18, 1)
r.addIngredient(21, 1)
Items.addItem("Night's Edge", r, 4, 14)//22
Items.addItem("Soul of Might", null, 0, 15)//23
Items.addItem("Soul of Sight", null, 0 ,16)//24
Items.addItem("Soul of Fright", null, 0, 17)//25
r = new Recipe(4, 1)
r.addIngredient(22, 1)
r.addIngredient(23, 20)
r.addIngredient(24, 20)
r.addIngredient(25, 20)
Items.addItem("True Night's Edge", r, 4, 10)//26
r = new Recipe(2, 1)
r.addIngredient(7, 24)
r.addIngredient(9, 1)
Items.addItem("True Excalibur", r, 2, 10)//27
r = new Recipe(3, 1)
r.addIngredient(26, 1)
r.addIngredient(13, 1)
r.addIngredient(27, 1)
Items.addItem("Terra Blade", r, 3, 10)//28
Items.addItem("Seedler", null, 0, 18)//29
Items.addItem("The Horseman's Blade", null, 0, 19)//30
Items.addItem("Influx Waver", null, 0, 20)//31
Items.addItem("Star Wrath", null, 0, 21)//32
Items.addItem("Meowmere", null, 0, 21)//33
r = new Recipe(10, 1)
r.addIngredient(2, 1)
r.addIngredient(3, 1)
r.addIngredient(4, 1)
r.addIngredient(5, 1)
r.addIngredient(28, 1)
r.addIngredient(29, 1)
r.addIngredient(30, 1)
r.addIngredient(31, 1)
r.addIngredient(32, 1)
r.addIngredient(33, 1)
Items.addItem("Zenith", r, 10, 10)//34

export default Items