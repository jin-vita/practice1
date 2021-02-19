const http = require('http')
const express = require('express')
const path = require('path')


// express 모듈 사용
const app = express()

// 외부에서 서버에 접근하면 public 폴더에 있는 것만 쓸 수 있게 함
app.use('/', express.static(path.join(__dirname, 'public')))

// POST 방식으로 변수를 정상적으로 받기 위함
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ejs 파일을 사용하기 위함
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// 라우팅 함수 aaa
const router = express.Router()
app.use('/', router)

// list로 get 요청이 오면 실행
router.route('/list').get(async (req, res) => {
    const params = req.query
    // ejs 파일에 data를 보내고 html파일로 변환해 클라이언트에 응답
    req.app.render('list', { data: result }, (err, html) => {
        if(err) {
            console.error(`view 렌더링 오류 - ${err}`)
            return
        }
        res.end(html)
    })
})

// 요청 타입 별로 라우팅
// JSON 형식 응답
router.route('/search').get((req, res) => {
    // get방식 parameter를 얻는 방법
    const params = req.query
    res.writeHead(200, {
        'Content-Type': 'application/json;charset=utf-8'
    })
    res.end(JSON.stringify({
        code: 200,
        type: 'get',
        data: params
    }))
}).post((req, res) => {
    // post 방식 parameter를 얻는 방법
    const params = req.body
    res.writeHead(200, {
        'Content-Type': 'application/json;charset=utf-8'
    })
    res.end(JSON.stringify({
        code: 200,
        type: 'post',
        data: params
    }))
})


http.createServer(app).listen(process.env.PORT||6001, 'localhost', () => {
    console.log('서버 시작 : Port - 6001, Hostname - localhost')
})