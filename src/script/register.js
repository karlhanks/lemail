!function () {
    let checkcode; //在全局定义验证码
    let part_top = $('.part_top .erro');
    let code = $('#code');
    let sbm = $('#submitBtn');
    let phonenum = $('#loginname');
    let password = $('#password');
    let verifycode = $('#verifycode');
    let logflag = true;
    let passflag = true;
    let vcflag = true;
    function createCode() {
        checkcode = "";
        var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
            'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');//随机数  
        for (var i = 0; i < 4; i++) {//循环操作  
            var index = Math.floor(Math.random() * 36);//取得随机数的索引（0~35）  
            checkcode += random[index];//根据索引取得随机数加到code上  
        }
        code.val(checkcode)
    };
    $(window).on('load', function () {//页面加载完成刷新验证码
        createCode();
    })
    code.on('click',function(){//点击刷新验证码
        createCode();
    });
    phonenum.on('blur', function () {
        let that = this;
        $.ajax({
            type: 'post',
            url: "http://10.31.164.22/lemail/php/user.php",
            data: { phonenum: that.value },
            dataType: 'json'
        }).done(function (d) {
            if (d) {
                if (that.value !== '') {
                    var reg = /^1[3578]\d{9}$/;
                    if (reg.test(that.value)) {
                        part_top.html('输入正确√');

                        part_top.css({ "color": "green" });
                        logflag = true;
                    } else {
                        part_top.html('手机号码格式有误');

                        part_top.css({ "color": "red" });
                        logflag = false;
                    }
                }
                else {
                    part_top.html('！手机号码不能为空');

                    part_top.css({ "color": "red" });
                    logflag = false;

                }
            } else {
                part_top.html('已经被注册');
                logflag = false;
            }
        });

    });
    password.on('focus', function () {
        part_top.html('密码格式为6-16位字母/数字/符号');
        part_top.css({ "color": "red" });
    });
    password.on('blur', function () {
        var reg = /[\u4e00-\u9fa5]/;
        if (this.value == '') {
            part_top.html('密码不能为空');
            part_top.css({ "color": "red" });
            passflag = false;
        }
        if (reg.test(this.value)) {
            part_top.html('密码格式不对');
            part_top.css({ "color": "red" });
            passflag = false;
        }
    });
    password.on('input', function () {
        if (this.value.length >= 6 && this.value.length <= 16) { //满足长度
            var regnum = /\d+/;
            var regupper = /[A-Z]+/;
            var reglower = /[a-z]+/;
            var regother = /[\W\_]+/;
            var result = 0; //计算类别
            if (regnum.test(this.value)) { //一定包含数字
                result++;
            }
            if (regupper.test(this.value)) { //一定包含大写字母
                result++;
            }
            if (reglower.test(this.value)) { //一定包含小写
                result++;
            }
            if (regother.test(this.value)) { //一定包含特殊字符
                result++;
            }
            switch (result) {
                case 1:
                    part_top.html('密码强度：弱');
                    part_top.css({ "color": "red" });
                    passflag = false;
                    break;
                case 2 || 3:
                    part_top.html('密码强度：中');
                    part_top.css({ "color": "yellow" });
                    passflag = true;
                    break;
                case 4:
                    part_top.html('密码强度：强');
                    part_top.css({ "color": "green" });
                    passflag = true;
                    break;
            }
        }
        else {
            part_top.html('密码长度不足');
            part_top.css({ "color": "red" });
            passflag = false;
        }
    });
    
    verifycode.on('blur', function () {
        if (this.value !== code.val()) {
            part_top.html('请输入正确的验证码');
            part_top.css({ "color": "red" });
            vcflag = false;
        } else {
            part_top.html('验证码正确');
            part_top.css({ "color": "green" });
            vcflag = true;
        }
    });
    sbm.on('click', function () {
        if (phonenum.val()== '') {
            part_top.html('信息填写错误');
            part_top.css({ "color": "red" });
            logflag = false;
        }
        if (password.val()== '') {
            part_top.html('信息填写错误');
            part_top.css({ "color": "red" });
            passflag = false;
        }
        if (verifycode.val()== '') {
            part_top.html('信息填写错误');
            part_top.css({ "color": "red" });
            vcflag = false;
        }
        

        if (!logflag || !vcflag || !passflag) {
            part_top.html('信息填写错误');
            part_top.css({ "color": "red" });  
            return false
        }else{
            $.cookie('Name',phonenum.val())
            $.cookie('pass',password.val())
            $.ajax({
                type: 'post',
                url: "http://10.31.164.22/lemail/php/user.php",
                data: { phonenum:  phonenum.val(),
                    password:password.val()
                }
            }).done(function(){
                $('.pop_box').show();
            })
        }
        
    });
}()