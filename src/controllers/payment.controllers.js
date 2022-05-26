import { stripe } from "../server"
import { errorResponse, successResponse } from "../utils/response"

export const createIntentControllers = async (req, res) => {
    try {
        const { price } = req.body
        const amount = price * 100
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            payment_method_types: ['card']
        })
        return res.status(200).json(successResponse({ clientSecret: paymentIntent.client_secret }))

    } catch (err) {
        return res.status(500).json(errorResponse(err))
    }
}