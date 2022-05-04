function solve(lostFigths, helmetPrice, swordPrice, shieldPrice, armorPrice){
    result = 0

    for (let i = 1; i <= lostFigths; i++){
        if (i % 2 == 0){
            result += helmetPrice
        }
        if (i % 3 == 0){
            result += swordPrice
        }

        if (i % 6 == 0){
            result += shieldPrice
        }
        if (i % 12 == 0){
            result += armorPrice
        }

    }

    console.log(`Gladiator expenses: ${result.toFixed(2)} aureus`)
}

solve(23,
    12.50,
    21.50,
    40,
    200
    
    )