const uploadDoc = async (req, res) => {
    // console.log(req.files['category'][0].filename,req.files['education'])
    try {

        if (!req.files) throw new Error("file should be there with any of this name : category,education");

        let resObj = {};

        if (req.files['cast']) {
            resObj = { link: req.files['cast'][0].filename, name: "cast" }
        } else if (req.files['income']) {
            resObj = { link: req.files['income'][0].filename, name: "income" }
        } else {
            throw new Error("invalid fileName");
        }

        res.json({ success: true, msg: resObj });

    } catch (e) {
        res.json({ success: false, msg: e.message })
    }

}

module.exports = uploadDoc