const express = require('express');
const fileUpload = require('express-fileupload');

const Article = require('../models/article');
const { verifyToken } = require('../middlewares/authentication');

const app = express();
app.use(fileUpload());

app.post('/article', verifyToken, (req, res) => {

    let body = req.body;
    // console.log(req.user);
    let article = new Article({
        artName: body.artName,
        artContent: body.artContent,
        artAut: req.user._id, //token:{{token}} // token required
    });

    if(!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No files selected'
            }
        });
    }

    let fileArray = req.files.imag;
    let imgArray = [];

    const imgAdd = add => new Promise(() => {
        imgArray.push(add);
    });

    fileArray.forEach( async( x) => {

        let file = x;
        let cutName = file.name.split('.');
        let extension = cutName[cutName.length - 1];

        let validExtensions = ['png', 'jpg', 'gif', 'jpge'];

        if (validExtensions.indexOf(extension) < 0) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Allowed extensions are ' + validExtensions.join(', '),
                    ext: extension
                }
            })
        }

        let fileName = `${new Date().getTime()}${new Date().getMilliseconds()}.${extension}`;

        file.mv(`uploads/imgArts/${fileName}`, (err, res) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
        });
        imgAdd(fileName);
    });

    article.imag = imgArray;

    article.save((err, articleSave) => {
        res.json({
            ok: true,
            art: articleSave,
        });
    });
});


module.exports = app;
