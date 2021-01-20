

module.exports = {
    async store(req, res) {
        const {email, password} = req.body;

        try {
            
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },

}