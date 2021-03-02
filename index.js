const express = require('express')
const path = require('path')


// express 모듈 사용
const app = express()
const port = process.env.PORT || 6001

app.get('/', (req, res) => res.send('asdfsadf World!'))

// 외부에서 서버에 접근하면 public 폴더에 있는 것만 쓸 수 있게 함
app.use('/', express.static(path.join(__dirname, 'public')))

// POST 방식으로 변수를 정상적으로 받기 위함
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ejs 파일을 사용하기 위함
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')



app.listen(port, () => {
    console.log('서버 시작 : Port - 6001, Hostname - localhost')
})

// const express = require('express')
// const app = express();
// const port = process.env.PORT || 3000;

// app.get('/', (req, res) => res.send('asdfsadf World!'))

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))