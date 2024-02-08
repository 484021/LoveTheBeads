require('dotenv').config()

const express= require('express')
const app = express();
app.use(express.json())
app.use(express.static('public'))

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)


 const storeItems = new Map([
    //  ['2NKRgoOCUbWbOdrJ8NjoDc', { priceInCents: 300, name: "Traditional Beaded bracelets"}],
    //  ['5nKv8luacAlaNwa0kfgc28', { priceInCents: 500, name: "Purple Jade bracelet"}],
    //  ['2EMQ1w61Zubqj9AAHQqHJa', { priceInCents: 500, name: "Orange Themed waistbead"}],
    //  ['vqs8wXQepCHEbqj1VCx7e', { priceInCents: 500, name: "Moon Phase Crystal bracelet"}],
    //  ['11PqxTLcwMIyxlgSy66FIA', { priceInCents: 500, name: "Clear Glass Rondelle bracelet"}],
        ['2NKRgoOCUbWbOdrJ8NjoDc', { priceInCents: 300, name: "African waistbead 3"}],
        ['2EMQ1w61Zubqj9AAHQqHJa', { priceInCents: 500, name: "African waistbead 2"}],
        ['3bRvlBfZNLU7WjQFfNvTBG', { priceInCents: 500, name: "Crystal Bracelets 2"}],
        ['6khuT1lFzmyHRPIZmxWaiZ', { priceInCents: 500, name: "Crystal Bracelets 1"}],
        ['WBv2pElqx5IM8xUpA2xLB', { priceInCents: 300, name: "African waistbead 4"}],
        ['1Df7iDQK1DOIxEycdW7kYb', { priceInCents: 300, name: "African waistbead 3"}],
        ['65puk449TVb55Wd3xSYOyw', { priceInCents: 300, name: "African waistbead 2"}],
        ['7zHjPtQBNCvaJ7OY6A7mvk', { priceInCents: 300, name: "African waistbead 1"}],
        ['167NsMCy9Lqxr8xfm5JnLU', { priceInCents: 300, name: "African waist bead"}],
        ['1APcz0Ay69roTKJoy2jIne', { priceInCents: 400, name: "African waistbead"}],
        ['662MVaDhsf0oeH2KOt58Ck', { priceInCents: 300, name: "African waistbead"}],
        ['6trpOwT7CEN0Dw4GGADpOC', { priceInCents: 300, name: "Clear waistbead"}],
        ['1aeDvJYEJjZ5eihB6hmjs5', { priceInCents: 300, name: "Glow in the dark waistbead"}],
        ['1NPHvOb9F9EUPL0i0OXjEB', { priceInCents: 300, name: "Gold waistbead"}],
        ['7J70btkG1ytuSkbSpOtFVb', { priceInCents: 500, name: "Pink themed phonecharm strap"}],
        ['7MTrljttOOflT5icNZn3E5', { priceInCents: 300, name: "Black waistbead"}],
        ['5y1lVucBpNw3LJJbdwTSzj', { priceInCents: 300, name: "Blue waistbead"}],
        ['4hPnGmk85DrIWHSvvBI7MT', { priceInCents: 700, name: "Pearl Necklace(Big)"}],
        ['1pwUgD1GbTUL1VSwVe8qXb', { priceInCents: 700, name: "Pearl Necklace(small)"}],
        ['1UbUlowuhVcHytl9FrIn1T', { priceInCents: 500, name: "Blue themed phonecharm strap"}],
        ['11PqxTLcwMIyxlgSy66FIA', { priceInCents: 400, name: "Clear Glass Rondelle bracelet"}],
        ['54FH6hGXCRkRkmqam6DRWU', { priceInCents: 400, name: "Pearl Bracelet"}],
        ['3BDn9zBEQyq2Fe50kL66Z', { priceInCents: 500, name: "Crystal Bracelets"}],
        ['6MKehJ58Vj5B8mC63TXfG2', { priceInCents: 600, name: "Glow in the dark waistbeads"}],
        ['4ezRkfPEz8oOD43W6fcnEJ', { priceInCents: 500, name: "Traditional Beaded Anklet"}],
        ['5nKv8luacAlaNwa0kfgc28', { priceInCents: 500, name: "Purple Jade bracelet"}],
        ['vqs8wXQepCHEbqj1VCx7e', { priceInCents: 500, name: "Moon Phase Crystal bracelet"}]
 ])
app.post("/create-checkout-session", async (req, res) => {
    try{
        const session = await stripe.checkout.sessions.create({
            
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.map(item => {
                const storeItem = storeItems.get(item.id)
                return {
                    price_data: {
                        currency: 'cad',
                        product_data: {
                            name: storeItem.name // Corrected storeItems.title to storeItem.name
                        },
                        unit_amount: storeItem.priceInCents // Corrected storeItems.priceInCents to storeItem.priceInCents
                    },
                    quantity: item.amount
                }
            }),
            success_url: `${process.env.SERVER_URL}`,
            cancel_url: `${process.env.SERVER_URL}`
        })
        res.json({ url : session.url })
    } catch (e){
        res.status(500).json({ error: e.message })
    }
})
app.listen(3000);