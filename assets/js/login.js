// 注册和登录的盒子都是通过定位实现
// 注册在前，登录在后，所以登录压住注册盒子
// 需求1点击里面的a链接，让对应的盒子显示隐藏

let a1 = document.querySelector('.register a')
let a2 = document.querySelector('.login a')
let register = document.querySelector('.register')
let login = document.querySelector('.login')
// 点击注册，注册隐藏登录显示
a1.onclick=()=>{
    register.style.display='none'
    login.style.display='block'
}
// 点击登录，登录隐藏，注册显示
a2.onclick=()=>{
    register.style.display='block'
    login.style.display='none'
}

// 需求二：用户信息的校验
let input1 = document.querySelector('.register  [name=username]');
let input2 = document.querySelector('.register  [name=password]');
let input3 = document.querySelector('.login  [name=username]');
let input4 = document.querySelector('.login  [name=password]');

// 进行调用
verifyinput(input1, '用户名不能为空', /^[\S]{2,15}$/ , '用户名长度不能小于2位或者超过15位' )
verifyinput(input2, '密码不能为空', /^[\S]{6,15}$/ , '密码长度不能小于6位或者超过15位' )
verifyinput(input3, '用户名不能为空', /^[\S]{2,15}$/ , '用户名长度不能小于2位或者超过15位' )
verifyinput(input4, '密码不能为空', /^[\S]{6,15}$/ , '密码长度不能小于6位或者超过15位' )



// 封装校验input的函数
function verifyinput (ele,txt1,reg,txt2){
    ele.oninput= function(){
        if(ele.value.trim()==''){
            // 错误的提示
            this.nextElementSibling.style.display = 'block';
            this.nextElementSibling.innerHTML =txt1;
            return
    
        }
        else{
            this.nextElementSibling.style.display = 'none';
            this.nextElementSibling.innerHTML =''
    
        }
        // 长度校验 \s代表非空白字符串、
        if(reg.test(this.value.trim())){
            // 校验正确
            this.nextElementSibling.style.display = 'none';
            this.nextElementSibling.innerHTML =''
    
        }
        else{
            this.nextElementSibling.style.display = 'block';
            this.nextElementSibling.innerHTML = txt2;
    
        }
    }
}

// 注册功能
let formReg = document.querySelector('.register form')
formReg.onsubmit=function(e){
    // 去除默认样式
    e.preventDefault()
    // 发送axios请求
    axios({
        url:'/api/register',
        method:'POST',
        // data: `username=${input1.value}&password=${input2.value}`,
        // 简单写法，jquery里面提供一个方法，快速获取form标签数据
        data:$(this).serialize()
    }).then(res=>{
        //成功回调
        console.log(res)
        // if(res.code ==1){
        //     return toaster.warning(res.message)
        // }
        // 成功提示，触发注册模块中的a链接的点击事件，清空form表单
        if(res.data.code==0)
        toastr.success('恭喜您，注册用户成功');
        a1.onclick();
        formReg.reset()
    })

}

// 登录功能
let formLogin = document.querySelector('.login form')
formLogin.onsubmit=function(e){
    e.preventDefault()
    axios({
        url:'/api/login',
        method:'post',
        data: { 
            username:input3.value,
            password:input4.value,

        },

    }).then(res=>{
        //成功回调
        console.log(res)
        if(res.data.code==0){
            toastr.success('恭喜您，登录成功')
            location.href='./index.html'

            localStorage.setItem('myToken',res.data.token)
        }
    })
}