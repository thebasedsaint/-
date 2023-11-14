// 首先封装成一个函数
function initstulist(){
    // 发送ajax请求数据
    axios({
        url:'/student/list',
    }).then(({data:res})=>{
        //成功回调 
        if(res.code==0){
            console.log(res)
        }
        renderlist(res.data)
    })
} 
initstulist()

// 渲染到页面
let  renderlist = arr=>{
    document.querySelector('tbody').innerHTML=arr.map(item=>`<tr>
    <th scope="row">${item.id}</th>
    <td>${item.name}</td>
    <td>${item.age}</td>
    <td>${item.sex}</td>
    <td>${item.group}</td>
    <td>${item.phone}</td>
    <td>${item.salary}</td>
    <td>${item.truesalary}</td>
    <td>${item.province}${item.city}${item.county}</td>
    <td>
      <button type="button" class=" update btn btn-primary btn-sm" data-bs-toggle="modal"
        data-bs-target="#updateModal" getid="${item.id}">修改</button>
      <button type="button" class="btn btn-danger btn-sm" getid="${item.id}">删除</button>
    </td>
  </tr>`).join('')

}

// 进行删除事件
let tbody = document.querySelector('tbody')
tbody.onclick=function(e){
    e.preventDefault()
    let id = e.target.getAttribute('getid')
    if(e.target.classList.contains('btn-danger')){
        if(!confirm('确认删除么宝贝？')) return
        axios({
            url:'/student/delete',
            method:'DELETE',
            params: {id}
            
        }).then(res=>{
            //成功回调
            console.log(res)
            if(res.data.code==0){
                toastr.success('删除学员及其所有成绩成功')
                initstulist()
            }
        })
       
    }
}


// 需求3省市区

let addform = document.querySelector('.add-form')
let updateform = document.querySelector('.update-form')
// 调用
initprovince(addform)
initprovince(updateform)
// 封装省

function initprovince(form){
    let select1 = form.querySelector('[name="province"]')
    let select2 = form.querySelector('[name="city"]')
    let select3 = form.querySelector('[name="county"]')
    
axios({
    url:'/geo/province',
    method:'get',
}).then(({data:res})=>{
    //成功回调
    console.log(res)
    // select1.innerHTML+=res.map(item=>`<option value="${item}">${item}</option>`).join('')
    let arr = res.map(item=>`<option value="${item}">${item}</option>`)
    arr.unshift(`<option value="">--省--</option>`)
    select1.innerHTML=arr.join('')
})

// 城市的内容

select1.onchange=function(){
    select3.innerHTML=`<option value="">--县--</option>`
    if(select1.value==''){
        select2.innerHTML=`<option value="">--市--</option>`
        return
    }
    axios({
        url:'/geo/city',
        method:'get',
        params: { pname:this.value}
    }).then(({data:res})=>{
        //成功回调
        console.log(res)
        // select2.innerHTML+=res.map(item=>`<option value="${item}">${item}</option>`).join('')
        let arr = res.map(item=>`<option value="${item}">${item}</option>`)
        arr.unshift(`<option value="">--市--</option>`)
        select2.innerHTML=arr.join('')

    })

    // 县的内容
   
   select2.onchange=function(){
       if(this.value==''){
           select3.innerHTML=`<option value="">--县--</option>`
           return
       }
   axios({
      url:'/geo/county',
      method:'get',
     params: {pname:select1.value,
        cname:select2.value}
    }).then(({data:res})=>{
         //成功回调
         console.log(res)
         let arr = res.map(item=>`<option value="${item}">${item}</option>`)
         arr.unshift(`<option value="">--县--</option>`)
         select3.innerHTML=arr.join('')
     })
    }

  }
}






// 进行添加事件
addform.onsubmit=function(e){
    e.preventDefault()
    // 发送ajax请求
    axios({
        url:'/student/add',
        method:'POST',
        data:$(this).serialize(),
    }).then(({data:res})=>{
        //成功回调
        console.log(res)
        if(res.code==0){
            toastr.success('恭喜您，添加信息成功')
            document.querySelector('#addModal .btn-close').click()
            initstulist()
        }
    })
}

// 需求5点击按钮，发送请求修改
tbody.addEventListener('click',function(e){
    if(!e.target.classList.contains('update')) return
    let id = e.target.getAttribute('getid')
    // console.log(id);
    axios({
        url:'/student/one',
        method:'GET',
        params: {id:id}
    }).then(({data:res})=>{
        //成功回调
        console.log(res)
        if(res.code==0){
            // 姓名年龄电话薪资实际
            updateform.querySelector('[name="name"]').value=res.data.name
            updateform.querySelector('[name="age"]').value=res.data.age
            updateform.querySelector('[name="phone"]').value=res.data.phone
            updateform.querySelector('[name="salary"]').value=res.data.salary
            updateform.querySelector('[name="truesalary"]').value=res.data.truesalary
            // 性别和组号
            let inps = updateform.querySelectorAll('[name="sex"]')
            for(let i = 0;i<inps.length;i++){
                if(inps[i].value==res.data.sex){
                    inps[i].checked =true
                }
                else{
                    inps[i].checked =false

                }
            }
            // updateform.querySelector('[name="group"]').value=res.data.group
            let opts =updateform.querySelectorAll('[name="group"] option')
            for(let i = 0;i<opts.length;i++){
                if(opts[i].value==res.data.group){
                    opts[i].selected =true
                }
                else{
                    opts[i].selected =false

                }
            }

            // 省市
            updateform.querySelector('[name="province"]').value=res.data.province
            // 实际工作要求发送ajax渲染，此处简单实现
            let str1 =`<option selected value="${res.data.city}">${res.data.city}</option>`
            updateform.querySelector('[name="city"]').innerHTML=str1
            let str2 =`<option selected value="${res.data.county}">${res.data.county}</option>`
            updateform.querySelector('[name="county"]').innerHTML=str2
            // 隐藏域处理id修改需要id
            updateform.querySelector('[name="id"]').value=res.data.id

        }
    })
})


// 修改学院信息完成
updateform.onsubmit = function(e){
    e.preventDefault()
    axios({
        url:'/student/update',
        method:'put',
        data: $(this).serialize()
    }).then(({data:res})=>{
        //成功回调
        console.log(res)
        if(res.code==0){
            toastr.success('恭喜修改信息成功')
            document.querySelector('#updateModal .btn-close').click()
            initstulist()
        }
    })
}

