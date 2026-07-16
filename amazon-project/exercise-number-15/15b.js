export function isSatSun(date) {
    
    
    if(date.day() === 0 || date.day() === 6){
        return true ;
    } else{
        return false;
    }
}

