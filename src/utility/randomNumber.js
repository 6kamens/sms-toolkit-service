

module.exports.generateRandomNumber = (digit) => { 

    var digits = '0123456789'; 
    let number = ''; 
    for (let i = 0; i < digit; i++ ) { 
        number += digits[Math.floor(Math.random() * 10)]; 
    } 
    return number; 
} 