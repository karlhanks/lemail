!function(){
    class denglu{
        constructor(){
            this.phone=$('#phonenum');
            this.pass=$('#password');
            this.btn=$('.regi_btn');
        }
    init(){
        let that=this;
        this.btn.on('click',function(){
            that.btnclick();
        })
    }
    btnclick(){

        let that=this;
        $.ajax({
            type: 'post',
            url: "http://10.31.164.22/lemail/php/user.php",
            data: { phone:  that.phone.val(),
                pass:that.pass.val()
            },
            dataType:'json'
        }).done(function(d){
            if(d){
                $('.cuo').html('用户名或密码错误')
            }else{
                $('.cuo').html('登录成功')
                $.cookie('Name',that.phone.val());
                $.cookie('pass',that.pass.val());
                window.location.assign('index.html');
            }
        })
    }
}
new denglu().init()
}()