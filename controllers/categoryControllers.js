const {validateSchema} = require('../validators');
const Categories = require('../models/categories');

exports.createCategories = async (req,res) =>{
    try {
        const {error} = validateSchema(req.body);
            if (error) {
                res.json(error.details[0].message)
            }
        const category = new Categories({
            name: req.body.name,
            description: req.body.description
        }) 
        const new_data = await category.save()
        res.json(new_data)
    } catch (error) {
        console.log({message:error.message});
        
    }
}

exports.getAllCategories = async (req, res) => {
const category = await Categories.find()
res.json(category)
}

