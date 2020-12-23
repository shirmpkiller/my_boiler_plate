const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middleware');

const router = express.Router();


router.get('/', async (req, res, next) => { // GET /user
  try {
    if (req.user) {
      const fullUserWithoutPassword = await db.User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password']
        }
      })
      res.status(200).json(fullUserWithoutPassword);//시퀄라이저에서 가져온 데이터는 json이 아니라서 json으로 변형
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
   next(error);
  }
});
router.post('/', isNotLoggedIn, async (req, res, next) => { // POST /user/ 회원가입
    try {
      const exUser = await db.User.findOne({
        where: {
         userId: req.body.userId,
        }
      });
      if (exUser) {
        return res.status(403).send('이미 사용 중인 아이디입니다.');
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      await db.User.create({
        email: req.body.email,
        userName: req.body.userName,
        password: hashedPassword,
        userId : req.body.userId,
        tel : req.body.tel,
        gender : req.body.gender,
      });
      res.status(201).send('ok');
    } catch (error) {
      console.error(error);
      next(error); // status 500
    }
  });

router.post('/logout', (req, res) => { // /api/user/logout
    req.logout();
    req.session.destroy();
    res.send('logout 성공');
  });
  
  router.post('/login', (req, res, next) => { // POST /api/user/login
    passport.authenticate('local', (err, user, info) => { //passport를 불러오는 코드 필요
      if (err) {//서벙러라면//err user info 각각 done의 첫 두 세 번째 인자를 받음
        console.error(err);
        return next(err);//next로 서버에러 보내기
      }
      if (info) {//로지상에러라면
        return res.status(401).send(info.reason);
      }
      return req.login(user, async (loginErr) => {//req.login을 하면 서버쪽에 세션,쿠키가 저장//req.login할 때 passport의 serialized가 실행
        try {
          if (loginErr) {
            return next(loginErr);
          }
          const fullUser = await db.User.findOne({
            where: { id: user.id },
           
            attributes: ['id', 'userId'],//사용자 정보는 비밀번호만 빼고 보냄
          });
     //     console.log(fullUser);
          return res.json(fullUser);//사용자정보 보내기
        } catch (e) {
          next(e);
        }
      });
    })(req, res, next);
  });
module.exports = router;
