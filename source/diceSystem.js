
export default class DiceSystem
{
    constructor() 
    {
        this.attributeDice = new Die(6);
        this.skillDice = new Die(6);
        this.gearDice = new Die(6);
        this.artifactDiceD8 = new Die(8);
        this.artifactDiceD10 = new Die(10);
        this.artifactDiceD12 = new Die(12);
        this.rollName = ""
    }

    ResetDices()
    {
        this.attributeDice = new Die(6);
        this.skillDice = new Die(6);
        this.gearDice = new Die(6);
        this.artifactDiceD8 = new Die(8);
        this.artifactDiceD10 = new Die(10);
        this.artifactDiceD12 = new Die(12);
        this.rollName = ""
    }
    /////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////// Roll Dices /////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////

    Roll(attributeDices, skillDices, gearDices, artifactDices, modifier, rollName)
    {
        console.log(attributeDices);
        console.log(skillDices);
        // Roll all dices separately
        let attributeRoll = this.RollDice(this.attributeDice, attributeDices);
        let skillRoll = this.RollDice(this.skillDice, Math.abs(skillDices + modifier));
        let gearRoll = this.RollDice(this.gearDice, gearDices);
        let artifactD8Roll = this.RollDice(this.artifactDiceD8, artifactDices[0]);
        let artifactD10Roll = this.RollDice(this.artifactDiceD10, artifactDices[1]);
        let artifactD12Roll = this.RollDice(this.artifactDiceD12, artifactDices[2]);
        let artifactRoll = ((artifactD8Roll.concat(artifactD10Roll)).concat(artifactD12Roll)).sort();
        this.rollName = rollName;
        return {attributeRoll, skillRoll, gearRoll, artifactRoll}
    }

    RollDice(dice, numberDices)
    {
        // Roll.
        var roll = dice.roll(numberDices).results

        // Return a sorted array with roll.
        roll.sort();
        return roll;
    }

    /////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////// Push Roll /////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////

    PushRoll()
    {
        let attributeRoll = this.PushDice(this.attributeDice, [2,3,4,5]);
        let skillRoll = this.PushDice(this.skillDice, [1,2,3,4,5]);
        let gearRoll = this.PushDice(this.gearDice, [2,3,4,5]);
        let artifactD8Roll = this.PushDice(this.artifactDiceD8, [1,2,3,4,5]);
        let artifactD10Roll = this.PushDice(this.artifactDiceD10, [1,2,3,4,5]);
        let artifactD12Roll = this.PushDice(this.artifactDiceD12, [1,2,3,4,5]);
        let artifactRoll = ((artifactD8Roll.concat(artifactD10Roll)).concat(artifactD12Roll)).sort();

        return {attributeRoll, skillRoll, gearRoll, artifactRoll}
    }

    PushDice(dice, numbersToPush)
    {
        // Roll.
        var roll = dice.reroll(numbersToPush).results

        // Return a sorted array with roll.
        roll.sort();
        return roll;
    }

    /////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////// Other Rolls ////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////

    RollConsumable(dice)
    {
        if (dice === "none")
            return [0];
        var face = parseInt(dice.slice(1));
        var consumableDice = new Die(face);
        var roll = consumableDice.roll(1).results
        return roll;
    }
}