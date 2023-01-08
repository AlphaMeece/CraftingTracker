class Source {
    constructor(id) {
        this.id = id
        this.name = ""
        this.recipes = []
    }

    getID() {
        return this.id
    }

    getName() {
        return this.name
    }

    setName(name) {
        this.name = name
    }

    addItem(recipe) {
        this.recipes.push(recipe)
    }
}

class Sources {
    static list = []
    static nextID = 0

    static getSources() {
        return this.list
    }

    static addSource(name) {
        let source = new Source(this.nextID)
        source.setName(name)
        this.list.push(source)
        this.list.sort((a, b) => a.name - b.name)
        return this.nextID++
    }

    static getSource(id) {
        let source = this.list.find(source => source.getID() === id)
        if(source === undefined) {
            console.log(`No source of ID: ${id}, creating a new one`)
            this.list.push(new Source(id))
            this.nextID++
        }
        return source
    }
}

Sources.addSource("Mining")//0
Sources.addSource("Furnace")//1
Sources.addSource("Anvil")//2
Sources.addSource("Sky Chests")//3
Sources.addSource("Sword Shrine")//4
Sources.addSource("Queen Bee")//5
Sources.addSource("Hardmode Furnace")//6
Sources.addSource("Mechanical Bosses")//7
Sources.addSource("Underground Jungle")//8
Sources.addSource("Hornet")//9
Sources.addSource("Hardmode Anvil")//10
Sources.addSource("Mothron")//11
Sources.addSource("Dungeon Chests")//12
Sources.addSource("Eater of Worlds")//13
Sources.addSource("Demon Altar")//14
Sources.addSource("Destroyer of Worlds")//15
Sources.addSource("The Twins")//16
Sources.addSource("Skeletron Prime")//17
Sources.addSource("Plantera")//18
Sources.addSource("Pumpking")//19
Sources.addSource("Martian Saucer")//20
Sources.addSource("Moon Lord")//21

export default Sources