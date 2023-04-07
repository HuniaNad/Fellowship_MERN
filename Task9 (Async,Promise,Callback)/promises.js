let stocks = {
    Fruits: ["strawberry", "grapes", "banana", "apple"],
    liquid: ["water", "ice"],
    holder: ["cone", "cup", "stick"],
    toppings: ["chocolate", "peanuts"]
}

let isShopOpen = false
let order = (time, work) => {
    return new Promise((resolve, reject) => {
        if(isShopOpen){
            setTimeout(() => {
                resolve( work() )
            }, time)
            
        }
        else{
            reject(console.log("our shop is closed"))
        }
    })
}

//relation b/w time and work
order(2000, () => console.log(`${stocks.Fruits[0]} was selected`))

.then(() => {
        return order(0000, () => console.log("production had started"))
    } 
)
.then(() => {
        return order(2000, () => console.log("fruit was chopped"))
    } 
)
.then(() => {
        return order(1000, () => console.log(`${stocks.liquid[0]} and ${stocks.liquid[1]} have been added`))
    } 
)
.then(() => {
        return order(1000, () => console.log("the machine was started"))
    } 
)
.then(() => {
        return order(2000, () => console.log(`icecream was placed on ${stocks.holder[0]}`))
    } 
)
.then(() => {
        return order(3000, () => console.log(`${stocks.toppings[0]} was added as toppings`))
    } 
)
.then(() => {
        return order(2000, () => console.log("serve icecream"))
    } 
)

.catch(() => {
    console.log("Customer has left")
})

.finally(() => {
    console.log("day ended. shop is closed")
})