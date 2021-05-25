const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const confing = require('./config/key');

const { User } = require('./models/User');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

// application/json
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(confing.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("MongoDB Conneted..."))
.catch( err => console.log(err));

app.get('/',(req, res) => res.send('Hello World! t'));

app.post('/register', (req, res) => {

    // 회원 가입 할때 필요한 정보를 clien에서 가져오면
    // 그것들을 DB에 넣어준다.
    const user = new User(req.body);

    user.save((err, doc) => {
        if(err) return res.json({ success: false, err})
        return res.status(200).json({success:true})
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));