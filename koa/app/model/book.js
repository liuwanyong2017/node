//这里是业务表，只是为了存储书籍的收藏数据而存在的。
import sequelize from "../../core/db";
import {Model, Sequelize} from "sequelize";
import util from "util";
import axios from "axios";

class Book extends Model {
    // constructor(id) {
    //     super();
    //     this.id = id;
    // }
    //因为model这里用constructor会出错，源于sequelize的orm的问题。以后不要用constructor！


    async detail(id) {
        const url = util.format(global.config.book.detail, id);
        return (await axios.get(url)).data;
    };

    //因为是整个书类的方法，而不是一本书的。
    static async search(q, start, count, summary = 1) {  //summary是yushu api的参数，可以不加简介，数据量小
        const url = util.format(global.config.book.search, encodeURI(q), start, count, summary);
        // console.log(url, "uuu");  axios的请求，不接受中文，需要encodeURI转码，否则报错！
        return (await axios.get(url)).data;
        // console.log(data);
    }
}

Book.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true    //人为赋值，因为这里是个业务表，只是为了存储fav_nums的。
        //书籍的真的id是从书籍的基础数据库拿到的书籍id。
    },
    fav_nums: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
}, {sequelize, tableName: "book"});

export default Book;