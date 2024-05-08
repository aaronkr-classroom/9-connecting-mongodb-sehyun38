// main2.js
"use strict";

const port = 3000,
  express = require("express"),
  layouts = require("express-ejs-layouts"),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  Subscriber = require("./models/subscriber"),
  app = express();

/**
 * @TODO: Listing 14.1 (p. 205)
 * Mongoose를 사용한 MongoDB 연결
 */
const mongoose = require("mongoose"),
  dbURL ="mongodb+srv://user:XAKChOtj4OIqYKyQ@ut-node.z2zjfig.mongodb.net/?retryWrites=true&w=majority&appName=ut-node", //Atlas에서
  dbName ="user";

mongoose.connect(
  dbURL + "/" +dbName, //URL +dbName
  {useNewUrlParser: true}
);

const db = mongoose.connection;

/**
 * @TODO: Listing 14.2 (p. 206)
 * 데이터베이스 연결 이벤트 처리
 */

db.once("open", ()=>{
  console.log("DB Connetion!");
});

/**
 * Listing 14.4 (p. 207)
 * 생성과 저장 구문
 */

//version1
let sub1 = new Subscriber({
  name: "qwer",
  email: "qwe@weq.com",
  phone: 123567,
  newSletter: true
});

sub1.save()
  .then(saveDoc =>{
    console.log(saveDoc);
  })
  .catch(error => {
    console.log(error);
  });

  // version2
Subscriber.create({
    name: "Tom hiddleston",
    eamil: "qweqwe@awe.com",
    phone: 123123,
    newSletter: false
  })
  .then(saveDoc =>{
    console.log(saveDoc);
  })
  .catch(error => {
    console.log(error);
  });


// (선택) DB find() after 14.5
let tom = Subscriber
  .findOne({name:"Tom hiddleston"})
  .where(
    "email",
    /qweqwe/
  );

/**
 * @TODO: Listing 14.6 (p. 208)
 * 데이터베이스에서 데이터 검색
 */
var quary = Subscriber.findOne({
  name: "qwer"
}).where('email',/qwe/);

quary.exec()
  .then((error,data)=>{
    if(data) console.log(data.name);
  });

app.set("port", process.env.PORT || port);
app.set("view engine", "ejs");

app.use(layouts);
app.use(express.static("public"));

app.get("/", homeController.getHomePage);
app.get("/name/:myName", homeController.respondWithName2);

/**
 * Listing 11.4 (p. 169)
 * 사용자 정의 메시지를 통한 에러와 없는 라우트 처리
 */
app.use(errorController.logErrors);
app.use(errorController.resNotFound); // main.js에 에러 처리 미들웨어 추가
app.use(errorController.resInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
