export function isNumber(value){
    if(!isNaN(value)){
        return false;
    }
    return true;
}

export function checkLength(value, max){
    if(value.length <= max){
        return true;
    }
    return false;
}
