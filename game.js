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

const raceSelector = (races) => {

    while(true){

        const raceChoice = prompt("WHAT RACE DO YOU WANT TO PLAY? (ORC)/(ELF)/(HUMAN): ").toUpperCase();

        if(checkIfRaceExists(raceChoice, races)){
            //Finne race brukeren har valgt
            const selectedRace = races.find((r) => r.race === raceChoice);
            return selectedRace;
        } else {
            console.log("This race do not exists, try again: ");
        }
    }
}

const classSelector = (classes) => {

    while(true){

        const classChoice = prompt("WHAT CLASS DO YOU WANT TO PLAY U FUCK? (WARRIOR)/(MAGE)/(ROGUE): ").toUpperCase();

        if(checkIfClassExists(classChoice, classes)){
            //Finner class brukeren har valgt
            const selectedClass = classes.find((c => c.class === classChoice));
            return selectedClass;
        } else {
            console.log("This class do not exists, try again: ");
        }
    }
}

const levelUp = (character) => {
    let newCharacter = {    
        "name": character.name,
        "race": character.race,
        "class": character.class,
        "experience": character.experience, 
        "attributes": {
            "HP": character.attributes.HP + 100,
            "STRENGTH": character.attributes.STRENGTH + 100,
            "MAGIC": character.attributes.MAGIC + 100,
            "STEALTH": character.attributes.STEALTH + 100,
            "LUCK": character.attributes.LUCK 
            }
    }
    const characterLevelUp = JSON.stringify(newCharacter, null, 2);
    //Skriver til filen
    fs.writeFileSync(filepathToCharacter, characterLevelUp);
}

//Bare for min del
const resetCharacterToDefault = () => {

        let resetCharacter = {
            "name": "",
            "race": "",
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

        //la i en enkel variabel her. Fordi når jeg prøvde å ha raceSelector(races).attributes.HP osv i newCharacter måtte man gjennom consolen hver gang
        let recieveRace = raceSelector(races);
        let recieveClass = classSelector(classes);
        
        const characterName = prompt("TELL ME HERO, WHAT IS THE NAME YOU HAVE CHOSEN?: ").toUpperCase();

        //Lager en ny character med de forskjellige verdiene, adderer verdiene fra race og class
        let newCharacter = {    
            "name": characterName,
            "race": recieveRace.race,
            "class": recieveClass.class,
            "experience": 0,
            "attributes": {
                "HP": recieveRace.attributes.HP + recieveClass.attributes.HP,
                "STRENGTH": recieveRace.attributes.STRENGTH + recieveClass.attributes.STRENGTH,
                "MAGIC": recieveRace.attributes.MAGIC + recieveClass.attributes.MAGIC,
                "STEALTH": recieveRace.attributes.STEALTH + recieveClass.attributes.STEALTH,
                "LUCK": recieveRace.attributes.LUCK + recieveClass.attributes.LUCK
                }
        }

        //Gjør det om til en JSON string
        const createANewCharacter = JSON.stringify(newCharacter, null, 2);
        //Skriver til filen
        fs.writeFileSync(filepathToCharacter, createANewCharacter);
        break;    
    }
}

const attack = () => {

}


const game = () => {

    characterCreation();

}

//game();

