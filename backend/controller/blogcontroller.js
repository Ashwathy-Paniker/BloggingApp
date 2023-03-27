const blogmodel = require('../model/BlogSchema')

const blogcontroller = {

    addblog: (req, res) => {
        console.log(req.body)
        let title = req.body.title;
        let des = req.body.des;
        let tags = req.body.tags;
        let user = req.body.user;
        let myImage = (req.file) ? req.file.filename : null;
        let ins = new blogmodel({ title: title, des: des,tags: tags,user: user, myImage: myImage});
        ins.save((err) => {
            if (err) {
                res.json({ "err": "Something went wrong ! Please Recheck !" })
            }
            else {
                res.json({ "msg": "Blog added successfully" })
            }
        })
    },
    usersblog: async (req, res) => {
        console.log(req.params.email)
        let user = req.params.email;
        await blogmodel.find({user:user }, (err, data) => {
            if (err) {
                res.status(200).json({"err":1, status: 401, "msg": "Something went wrong" })
            }
            else{
                res.status(200).json({ user: data,"err":0, status: 200, "msg": "here are the post!!" })

            }
        })
      },
      usersallblog: async (req, res) => {
        await blogmodel
          .find()
          .then((product) => {
            console.log(product);
            res.json({ user: product });
          });
      },

      editblog: async (req, res) => {
        console.log(req.body)
        try {            
            console.log(req.params.id)
            await blogmodel.findByIdAndUpdate( req.params.id, { $set: req.body })
            res.status(200).json("post updated successfully");
        } catch (error) {
            res.status(500).json("ERROR IN UPDATE");
        }
      },

      searchByQueryType : async (req, res) => {
        const { type, query } = req.body;
        try {
            let products;
            switch (type) {
                case 'text':
                    products = await blogmodel.find({ $text: { $search: query } });
                    break;
            }
            if (!products.length > 0) {
                products = await blogmodel.find({});
            }
            res.json({ products });
        } catch (err) {
            console.log(err, 'filter Controller.searchByQueryType error');
            res.status(500).json({
                errorMessage: 'Please try again later',
            });
        }
    },
    singleblog: (req, res) => {
        try {
            let id = req.params.id
            blogmodel.findOne({ _id: id })
                .populate().exec((err, data) => {
                    if (err) {
                        res.status(200).json({ status: 401, err: 'Somthing went wrong' })
                    }
                    else {
                        res.status(200).json({ status: 200, singleblog: data })
                    }
                })
        }
        catch (err) {
            res.status(500).json({ err: 'Please try again later', });
        }
    },
}
module.exports = blogcontroller
