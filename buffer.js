//Buffer node的对象，专门把JS的数据转换为二进制数据的对象
//不需要引入就可以用

const a = Buffer.alloc(10)

console.log(a);
//<Buffer 00 00 00 00 00 00 00 00 00 00>  16进制

const b = Buffer.alloc(10,3)

console.log(b);

//<Buffer 03 03 03 03 03 03 03 03 03 03>,参数可初始化配置


const c = Buffer.allocUnsafe(10)

console.log(c);

//<Buffer 12 00 00 00 90 03 00 00 f9 b3>脏数据初始化，不推荐


const d = Buffer.from("刘万永")

console.log(d);

//<Buffer e5 88 98 e4 b8 87 e6 b0 b8>  常用

console.log(d.toString());  //刘万永

console.log(Buffer.from([1, 3, 5, 6]));  //<Buffer 01 03 05 06>

console.log(Buffer.from(["s", 2]));  //<Buffer 00 02>  数组中只能是数字，字符串不行


//初始化，填充数据fill
const e = Buffer.alloc(4)
console.log(e);
//<Buffer 00 00 00 00>
e.fill(1)
console.log(e);
// <Buffer 01 01 01 01>
e.fill(3,2)
console.log(e);  //<Buffer 01 01 03 03>


//写入数据write  ,writeInt8

e.write("刘",0,3,'utf-8')
console.log(e);
// <Buffer e5 88 98 03>

e.write("万",3,3,'utf-8')
console.log(e);
//<Buffer e5 88 98 03>   说明长度限制了，写入失败
e.writeInt8(10,3)
console.log(e)

//<Buffer e5 88 98 0a>

const f = Buffer.alloc(10)
f.write("刘",0,3,'utf-8')
f.write("万",3,3,'utf-8')
f.write("永",6,3,'utf-8')
console.log(f);
//<Buffer e5 88 98 e4 b8 87 e6 b0 b8 00>
console.log(f.toString());  //刘万永 

f.writeInt8(23,1)
console.log(f);
//<Buffer e5 17 98 e4 b8 87 e6 b0 b8 00>

console.log(f.readInt8(1));   //23

console.log(Buffer.isBuffer(f));  //true

console.log(f.length);   //10
console.log(f.byteLength);   //10