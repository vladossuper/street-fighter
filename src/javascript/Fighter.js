
class Fighter {
    
    constructor(name, health, attack, defense) {
        this.name = name;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
    }

    getHitPower() {
        let criticalHitChance = (min, max) => (Math.random() * (max - min) + min).toFixed(2);
        let hitPower = this.attack * criticalHitChance(1, 2);
        
        return hitPower;
    }

    getBlockPower() {
        let dodgeChance = (min, max) => (Math.random() * (max - min) + min).toFixed(2);
        let blockPower = this.defense * dodgeChance(1, 2);
        
        return blockPower;
    }
    

}

export default Fighter;