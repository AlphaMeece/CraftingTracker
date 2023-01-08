class Resources {
    constructor() {
        this.requirements = []
        this.resources = []
    }

    getRequirements() {
        return this.requirements
    }

    getRequirement(item) {
        return this.requirements.find(x => x.id === item)
    }

    clearRequirements() {
        this.requirements = []
    }

    getResources() {
        return this.resources
    }

    getResource(item) {
        return this.resources.find(x => x.id === item)
    }

    clearResources() {
        this.resources = []
    }

    addRequirement(item, amount) {
        let requirement = this.requirements.find(x => x.id === item)

        if(requirement === undefined) {
            requirement = {id: item, amount: 0, required: 0}
            this.requirements.push(requirement)
            this.resources.push({id: item, amount: 0})
        }

        requirement.required += amount
    }

    addResource(item, amount) {
        let resource = this.resources.find(x => x.id === item)

        if(resource === undefined) {
            resource = {id: item, amount: 0}
            this.resources.push(resource)
        }

        resource.amount += amount
    }

    devoteResource(item, amount, required) {
        let requirement = this.requirements.find(x => x.id === item)
        let resource = this.resources.find(x => x.id === item)
        let difference = 0

        if(required - amount > resource.amount) {
            requirement.amount += resource.amount
            difference = resource.amount
            resource.amount = 0
        } else {
            resource.amount -= required - amount
            difference = required - amount
            requirement.amount += required
        }

        return difference
    }

    revokeResource(item, amount) {
        let requirement = this.requirements.find(x => x.id === item)
        let resource = this.resources.find(x => x.id === item)

        resource.amount += amount
        requirement.amount -= amount
    }
}

export default Resources