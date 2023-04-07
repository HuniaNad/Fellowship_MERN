let stocks = {
    Fruits: ["strawberry", "grapes", "banana", "apple"],
    liquid: ["water", "ice"],
    holder: ["cone", "cup", "stick"],
    toppings: ["chocolate", "peanuts"]
}

let order = (fruit, call_production) => {
    setTimeout(() => {
        console.log(`${stocks.Fruits[fruit]} was selected`)
        call_production()
    }, 2000)
    
}

//callback hell example
let production = () => {
    setTimeout(() => {
        console.log("Production has started")

        setTimeout(()=>{
            console.log("fruit has been chopped")

            setTimeout(() => {
                console.log(`${stocks.liquid[0]} and ${stocks.liquid[1]} have been added`)

                setTimeout(() => {
                    console.log("the machine was started")

                    setTimeout(() => {
                        console.log(`icecream was placed on ${stocks.holder[0]}`)

                        setTimeout(() => {
                            console.log(`${stocks.toppings[0]} was added as toppings`)

                            setTimeout(() => {
                                console.log("serve icecream")
                            }, 2000)
                        }, 3000)


                        
                    }, 2000)
    
    
                    
                }, 1000)


            }, 1000)
        }, 2000)
    }, 0000)
}

order(0, production)
