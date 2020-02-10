const db = require('../database');

module.exports = {

    // PRODUCTS

    getAllProducts : (req,res) => {
        let sql = "SELECT * FROM products;"
        db.query(sql, (err, results) => {
            if(err){
                res.status(500).send(err)
            }

            res.status(200).send(results)
        });
    },addProducts :(req,res) => {
        console.log(req.body)
        let sql = `INSERT INTO products set ?`
        db.query(sql, req.body, (err, results) => {
            if(err){
                console.log(err)
                res.status(500).send(err)
            }
            res.status(200).send(results)
        });
    },deleteProducts :(req,res) => {
        console.log(req.body)
        let sql = `DELETE FROM products WHERE id=${req.params.idnya}`
        db.query(sql, (err, results) => {
            if(err){
                console.log(err)
                res.status(500).send(err)
            }
            console.log(results)
            res.status(200).send(results)
        });
    },editProducts :(req,res) => {
        console.log(req.body)
        let sql = `UPDATE products SET ? WHERE id = ${req.params.idnya};`
        db.query(sql, req.body, (err, results) => {
            if(err){
                console.log(err)
                res.status(500).send(err)
            }
            res.status(200).send(results)
        });
    },


    // CATEGORIES

    getAllCategories : (req,res) => {
        let sql = "SELECT * FROM categories;"
        db.query(sql, (err, results) => {
            if(err){
                res.status(500).send(err)
            }

            res.status(200).send(results)
        });
    },getAllCategoriesJoin : (req,res) => {
        let sql = "SELECT c1.id, c1.category, c2.category as parent_category FROM categories c1 LEFT JOIN categories c2 ON c1.parentId = c2.id"
        db.query(sql, (err, results) => {
            if(err){
                res.status(500).send(err)
            }

            res.status(200).send(results)
        });
    },addCategories :(req,res) => {
        let sql = `INSERT INTO categories set ?`
        db.query(sql, req.body, (err, results) => {
            if(err){
                console.log(err)
                res.status(500).send(err)
            }
            res.status(200).send(results)
        });
    },editCategories :(req,res) => {
        console.log(req.body)
        let sql = `UPDATE categories SET ? WHERE id = ${req.params.idnya};`
        db.query(sql, req.body, (err, results) => {
            if(err){
                console.log(err)
                res.status(500).send(err)
            }
            res.status(200).send(results)
        });
    },deleteCategories :(req,res) => {
        console.log(req.body)
        let sql = `DELETE FROM categories WHERE id=${req.params.idnya}`
        db.query(sql, (err, results) => {
            if(err){
                console.log(err)
                res.status(500).send(err)
            }
            console.log(results)
            res.status(200).send(results)
        });
    },
    
    
    
    // PRODUCT CATEGORY
    getAllProductCat : (req,res) => {
        let sql = "SELECT pc.id as id_productcat, p.id as id_produk, p.nama, c.category FROM productcat pc JOIN categories c on pc.categoryId = c.id JOIN products p on pc.productId = p.id;"
        db.query(sql, (err, results) => {
            if(err){
                res.status(500).send(err)
            }

            res.status(200).send(results)
        });
    },
    getChildrenCategories : (req,res) => {
        let sql = "SELECT c1.id, c1.category FROM categories c1 LEFT JOIN categories c2 ON c2.parentId = c1.id WHERE c2.id IS NULL"
        db.query(sql, (err, results) => {
            if(err){
                res.status(500).send(err)
            }

            res.status(200).send(results)
        });
    },addProductCat : (req,res) => {
        console.log(req.body)
        let sql = `SELECT * FROM category_child WHERE id=${req.body.categoryId}`
        db.query(sql, req.body, (err, results) => {
            if(err){
                console.log(err)
                res.status(500).send(err)
            }
            if(results.length == 0){
                res.status(500).send('Category Not Available')
            }else{
                let sql2 = `WITH RECURSIVE category_path (id, category, parentId) AS
                (
                  SELECT id, category, parentId
                    FROM categories
                    WHERE id = ${req.body.categoryId}
                  UNION ALL
                  SELECT c.id, c.category, c.parentId
                    FROM category_path AS cp JOIN categories AS c
                      ON cp.parentId = c.id
                )
                SELECT * FROM category_path;`
                db.query(sql2, req.body, (err,results) =>{
                    if(err){
                        console.log(err)
                        res.status(500).send(err)
                    }
                for(var i=0; i<results.length; i++){
                    let sql2 = `INSERT INTO productcat (id, categoryId, productId) VALUES (null, ${results[i].id}, ${req.body.productId})`
                    db.query(sql2, req.body, (err,results) =>{
                        if(err){
                            console.log(err)
                            res.status(500).send(err)
                        }
                    })
                }
                res.status(200).send(results)
                })
            }
        });
    },deleteProductCat : (req,res) => {
        console.log(req.body)
        let sql = `DELETE FROM productcat WHERE productId=${req.params.idnya}`
        db.query(sql, (err, results) => {
            if(err){
                console.log(err)
                res.status(500).send(err)
            }
            console.log(results)
            res.status(200).send(results)
        });
    }










}