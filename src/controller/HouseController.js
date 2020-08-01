import House from '../models/Houses'

class HouseController {

    async store(req, res) {
        const { filename } = req.file
        const { description, price, address, status } = req.body
        const { user_id } = req.headers

        console.log(req.file)
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

}

export default new HouseController()
