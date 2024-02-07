require('dotenv').config()

const express= require('express')
const app = express();
app.use(express.json())
app.use(express.static('public'))

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const storeItems = new Map([
    ['4ezRkfPEz8oOD43W6fcnEJ', { priceInCents: 500, name: "Traditional Beaded bracelets"}],
    ['5nKv8luacAlaNwa0kfgc28', { priceInCents: 500, name: "Purple Jade bracelet"}],
    ['2EMQ1w61Zubqj9AAHQqHJa', { priceInCents: 500, name: "Orange Themed waistbead"}],
    ['vqs8wXQepCHEbqj1VCx7e', { priceInCents: 500, name: "Moon Phase Crystal bracelet"}],
    ['11PqxTLcwMIyxlgSy66FIA', { priceInCents: 500, name: "Clear Glass Rondelle bracelet"}]
    
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