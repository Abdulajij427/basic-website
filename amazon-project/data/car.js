import class Car {
    constructor(brand, model, isTrunkOpen ){
        this.brand  = brand;
        this.model = model;
        this.speed = 0;
        this.isTrunkOpen = isTrunkOpen;
     }
    
    openTrunk(){
        
    }

    closeTrunk(){

    }

    go(){
        this.speed = Math.min(this.speed + 5 , 200);
    } 
    brake(){
       this.speed = Math.max(this.speed - 5 , 0);
    }  
    displayInfo(){
        console.log(`${brand} ${model}, Speed: ${speed} km/h`);
    }
}

const car1 = new car("toyota", "corolla");
const car2 = new car("tesla", "model 3");

console.log(car1);
console.log(car2);

car1.go();
car1.go();
car1.go();
car1.brake();
car1.displayInfo();