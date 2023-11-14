// 封装一个渲染函数
function renderScore(){
    axios({
        url:'/score/list',
        method:'get',
    }).then(({data:res})=>{
        //成功回调
        console.log(res)
        if(res.code==0){
            // 自己定义数组
            let arr =[]
            // 这次遍历的是对象
            for(let key in res.data){
                arr.push(`
                <tr>
                  <th scope="row">${key}</th>
                  <td>${res.data[key].name}</td>
                  <td getid="${key}" data-batch="1" class="score">${res.data[key].score[0]}</td>
                  <td getid="${key}" data-batch="2" class="score">${res.data[key].score[1]}</td>
                  <td getid="${key}" data-batch="3" class="score">${res.data[key].score[2]}</td>
                  <td getid="${key}" data-batch="4" class="score">${res.data[key].score[3]}</td>
                  <td getid="${key}" data-batch="5" class="score">${res.data[key].score[4]}</td>
                </tr>`)
               
            }
            // 赋值写在for循环外面
            document.querySelector('tbody').innerHTML=arr.join('')
        }
   
    
    })
}
// 调用
renderScore()

// 需求2:修改学生成绩，事件委托
document.querySelector('tbody').onclick =function(e){
    if(!e.target.classList.contains('score')) return
    // 创建一个新的input
    let input =document.createElement('input')
    input.value=e.target.innerHTML //保存值
    e.target.innerHTML=''//清空值
    e.target.appendChild(input)
    // 需求3，失去焦点恢复值

    let num = input.value
    input.onblur = function(){
        e.target.innerHTML=num //失去焦点恢复原值
    }
    input.focus()
    // 需求4修改成绩
    input.onkeydown = function(e){
        if(e.key != 'Enter') return
        axios({
            url:'/score/entry',
            method:'post',
            data: { 
                "stu_id": this.parentNode.getAttribute('getid'), 
                "batch": this.parentNode.getAttribute('data-batch'),  
                "score": this.value 
            },
    
        }).then(({data:res})=>{
            //成功回调
            console.log(res)
            if(res.code==0){
                toastr.success('恭喜您，修改用户信息成功')
                renderScore()

            }
        })
    }
}