/**
 * 侧边导航关闭折叠控制
 */

function toggleSlide() {
  $('.nav > li > a').on('click', function () {
    let childMenu = $(this).next('ul');
    childMenu.slideToggle(400);
    let icon = childMenu.prev().find('.toggle');
    if (icon.hasClass('open')) {
      icon.removeClass('open').addClass('close');
    } else {
      icon.removeClass('close').addClass('open');
    }
  })

  // 默认第一个菜单展开
  $('.nav > li > a').eq(0).trigger('click');

  // 所有子菜单切换时加背景色
  $('.nav ul a').on('click', function () {
    $(this).addClass('active')
    $('.nav ul a').not($(this)).removeClass('active');
  })

}

toggleSlide();

// 需求1：退出
let logout = document.querySelector('.logout')
logout.onclick = function(){
  if(confirm('确定要退出登录么')){
    location.href='./login.html'
    localStorage.removeItem('myToken')
  }
}

// 需求2初始化数据
let init = document.querySelector('.init')
init.onclick= function(){
  axios({
    url:'/init/data',
    // headers: {
    //   Authorization:localStorage.getItem('myToken')
    // }
  }).then(res=>{
    //成功回调
    console.log(res)
    if(res.data.code==0){
      toastr.success('恭喜你,初始化数据成功')
      // 刷新页面
      location.reload()
    }
  })
}

