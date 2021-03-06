import Router from "koa-router";
import TokenValidator from "../../validators/token";
import LoginType from "../../../core/enum";
import User from "../../model/user";
import HttpException from "../../../core/http-exception";
import {generateToken} from "../../../core/util";
import Auth from "../../../middlewares/auth";
import Wx from "../../services/wx";


const router = new Router({
    prefix: "/v1/token"
});


const emailLogin = async (account, password) =>
    await User.verifyEmailPassword(account, password);


//业务逻辑
// 写在 API model 层 ，最好放model层，业务分层！api不写业务逻辑！
//业务分层：model 里，如果很复杂：就分 model service logic等层！
//细化业务逻辑，分开更多层。

router.post("/user", async (ctx) => {  //为了账号安全，POST而不是get
    const v = await new TokenValidator().validate(ctx);
    let token;
    console.log(v,555);
    switch (v.get("body.type")) {
        case LoginType.user_email:
            const user =
                await emailLogin(v.get("body.account"), v.get("body.password"));
            token = generateToken(user.id, Auth.USER);  //scope 参数换为User.USER，根据路由，是/user，就是User.USER
            //scope参数是为了分级用户，值为数值，跟路由的等级的数值对比，可以划分用户的权限。
            break;


        case LoginType.user_mini_program:   //小程序登录
            token = await Wx.codeToToken(v.get("body.account"));
            break;


        default:
            throw new HttpException("无法支持的登陆方式！", 10003, 404);
    }
    ctx.body = {token};
});


export default router;