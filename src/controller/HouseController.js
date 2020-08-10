import House from '../models/Houses'
import User from '../models/User'

class HouseController {

    async index(req, res) {
        const { status } = req.query

        const houses = await House.find({ status })

        return res.json(houses)
    }

    async store(req, res) {
        const { filename } = req.file
        const { description, price, address, status } = req.body
        const { user_id } = req.headers

        const house = await House.create(
            {
                user: user_id,
                thumbnail: filename,
                description,
                price,
                address,
                status
            }
        )

        return res.json( house )
    }

    async update(req, res) {
        const { house_id } = req.params
        const { filename } = req.file
        const { description, price, address, status } = req.body
        const { user_id } = req.headers

        const user = await User.findById(user_id)

        const houses = await House.findById(house_id)

        if ( String(user._id) !== String(houses.user) ) {
            return res.status(401).json({ error: 'User not allowed.' })
        }

       await House.updateOne({ _id: house_id },
            {
                user: user_id,
                thumbnail: filename,
                description,
                price,
                address,
                status
            }
        )

        return res.send()
    }

    async destroy(req, res) {
        const { house_id } = req.body
        const { user_id } = req.headers

        const user = User.findById(user_id)
        const house = House.findById(house_id)

        if(user._id !== house.user) {
            return res.status(401).json({ error: 'User not allowed.' })
        }

        await House.deleteOne({ _id: house_id })

        return res.json({ message: 'House deleted' })
    }

}

export default new HouseController()
