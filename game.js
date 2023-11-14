//Lager et bibliotek 
const fs = require('fs');

const prompt = require("prompt-sync")();

//Deklarerer hvilken fil det er
const filepathToClasses = "classes.json";
const filepathToRaces = "races.json"; 
const filepathToCharacter = "character.json";

//Les data fra filen
const readDataFromFile = (filepath) => {
    try {
        //Henter data fra filen i form av utf-8
        const data = fs.readFileSync(filepath, "utf-8");
        return JSON.parse(data); //det skal egentlig allerede være i JSON fra før, men skader ikke å være sikker
    } catch (error) {
        console.error("Feil ved lesing av filen", error);
        return; 
    }
}

//Storing the classes in an accessible array
let classes = readDataFromFile(filepathToClasses);
let races = readDataFromFile(filepathToRaces);
let character = readDataFromFile(filepathToCharacter);

const checkIfClassExists = (classChoice, classes) => {
    
    let classExists = false;

    //Går gjennom classes og ser om den finnes
    for(let i = 0; i < classes.length; i++){
        //Sjekker om det bruker har valgt finnes
        if(classes[i].class == classChoice){
            classExists = true;
            break;
        }
    }
    return classExists;
}

const checkIfRaceExists = (raceChoice, races) => {
    
    let raceExists = false;
    //Går gjennom races og ser om den finnes
    for(let i = 0; i < races.length; i++){
        //Sjekker om det bruker har valgt finnes
        if(races[i].race == raceChoice){
            raceExists = true;
            break;
        }
    }
    return raceExists;
}

const raceSelector = (raceChoice, races) => {
    
    while(true){
        if(checkIfRaceExists(raceChoice, races)){
            //Finne race brukeren har valgt
            const selectedRace = races.find((r) => r.race === raceChoice);

            let newCharacter = {
                "race": selectedRace.race,
                "attributes": {
                    "HP": selectedRace.attributes.HP,
                    "STRENGTH": selectedRace.attributes.STRENGTH,
                    "MAGIC": selectedRace.attributes.MAGIC,
                    "STEALTH": selectedRace.attributes.STEALTH,
                    "LUCK": selectedRace.attributes.LUCK
                }
            };

            //Omgjør dette til et JSON
            const characterData = JSON.stringify(newCharacter, null, 2);

            //Skriver dette over på filen character.json
            let updatedCharacter = fs.writeFileSync(filepathToCharacter, characterData);
            return updatedCharacter;
            //break;
        } else {
            console.log("This race do not exists, try again: ");
        }
    }
}

const classSelector = (classChoice, classes) => {

    while(true){
        if(checkIfClassExists(classChoice, classes)){
            //Finner class brukeren har valgt
            const selectedClass = classes.find((c => c.class === classChoice));

            //Oppdaterer character med attributes fra class og legger til class
            let updatedCharacter = {
                ...character,
                "class": selectedClass.class,
                "attributes": {
                    ...character.attributes,
                    "HP": character.attributes.HP + selectedClass.attributes.HP,
                    "STRENGTH": character.attributes.STRENGTH + selectedClass.attributes.STRENGTH,
                    "MAGIC": character.attributes.MAGIC + selectedClass.attributes.MAGIC,
                    "STEALTH": character.attributes.STEALTH + selectedClass.attributes.STEALTH,
                    "LUCK": character.attributes.LUCK + selectedClass.attributes.LUCK
                }
            };

            //Omgjør dette til et JSON
            const updatedCharacterData = JSON.stringify(updatedCharacter, null, 2);

            //Skriver dette over på filen character.json
            let thisUpdatedCharacter = fs.writeFileSync(filepathToCharacter, updatedCharacterData);
            return thisUpdatedCharacter;
            //break;
        } else {
            console.log("This class do not exists, try again: ");
        }
    }
}

const characterBackground = () => {
    
}

//Bare for min del
const resetCharacterToDefault = () => {

        let resetCharacter = {
            "name": "",
            "class": "",
            "experience": 0,
            "attributes": {
                "HP": 0,
                "STRENGTH": 0,
                "MAGIC": 0,
                "STEALTH": 0,
                "LUCK": 0
            }
        }

        //Omgjør dette til et JSON
        const updatedCharacterData = JSON.stringify(resetCharacter, null, 2);

        //Skriver dette over på filen character.json
        fs.writeFileSync(filepathToCharacter, updatedCharacterData);
        console.log("Character has been reset.");
     
}

const characterCreation = () => {

    while(true){
        const resetChoice = prompt("Do you want to reset your character to default? (y/n): ").toUpperCase();
        if(resetChoice == "Y") {
            resetCharacterToDefault();
            break;
        }

        const raceChoice = prompt("WHAT RACE DO YOU WANT TO PLAY? (ORC)/(ELF)/(HUMAN): ").toUpperCase();
        raceSelector(raceChoice, races);

        const classChoice = prompt("WHAT CLASS DO YOU WANT TO PLAY? (WARRIOR)/(MAGE)/(ROGUE): ").toUpperCase();
        classSelector(classChoice, classes);

        console.log(character);
    }
/*
    while(true){

        const raceChoice = prompt("WHAT RACE DO YOU WANT TO PLAY? (ORC)/(ELF)/(HUMAN): ").toUpperCase();
        
        if(checkIfRaceExists(raceChoice, races)) {

            //Finne race brukeren har valgt
            const selectedRace = races.find((r) => r.race === raceChoice);

            const classChoice = prompt("WHAT CLASS DO YOU WANT TO PLAY? (WARRIOR)/(MAGE)/(ROGUE): ").toUpperCase();

            if(checkIfClassExists(classChoice, classes)){

                //Finner class brukeren har valgt
                const selectedClass = classes.find((c => c.class === classChoice));

                const characterName = prompt("WHAT IS THE NAME OF YOUR " + classChoice + "? : ").toUpperCase();

                //Lager et nytt objekt med class og attributes fra class bruker har valgt
                const newCharacter = {
                    "name": characterName,
                    "race": selectedRace.race,
                    "class": selectedClass.class,
                    "attributes": selectedClass.attributes
                };

                //Omgjør dette til et JSON
                const characterData = JSON.stringify(newCharacter, null, 2);

                //Skriver dette over på filen character.json
                fs.writeFileSync("character.json", characterData);

                break;
            } else {
                console.log("This class do not exists, try again: ");
            }
        } else {
            console.log("This race do not exists, try again: ");
        }
    }*/
}

characterCreation();