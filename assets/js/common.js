axios.defaults.baseURL = 'http://www.itcbc.com:8000'
// 设置全部请求路径，全部添加token认证
// axios.defaults.headers.common['Authorization']=localStorage.getItem('myToken')

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(config.url.indexOf('/api/') == -1){
        config.headers.Authorization =localStorage.getItem('myToken')

    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });



// 响应拦截器，进行报错处理
axios.interceptors.response.use(function(response){
    // 判断响应逻辑代码值
    if(response.data.code==1){
        toastr.warning(response.data.message)
    }
    // 响应信息，无论如何处理得返回
    return response

},function(error){
    console.log(error);
    // 1.未登录2.token失效
    if(error.response.data.message =='身份认证失败'){
        // 只有index.html这个页面的ajax出现身份认证失败，直接跳转到登录页
        // 相看到error得取消跳转
        if(location.href.indexOf('index.html')!= -1){
            location.href='./login.html'

        }else{
            // 其他的页面，要求父页面跳转到登录页(iframe标签)
            // 出现ajax身份认证失败，应该让他们的父页面跳转
            window.parent.location.href='./login.html'

        }
        
        localStorage.removeItem('myToken')
    }
    else{
        // 普通的响应错误，直接错误输出，如果是身份认证失败，那么就跳转登录页
        toastr.error(error.response.data.message)
    }
    return Promise.reject(error)
    // console.log(Promise.reject(error));
})