!function(){
    
    var part_top=$('.part_top .erro');
    var code=$('#code');
    var sbm=$('#submitBtn');
    var phonenum=$('#loginname');
    var password=$('#password');
    var verifycode=$('#verifycode');
    var logflag=true;
    var passflag=true;
    var vcflag=true;
    phonenum.on('blur',function(){
        part_top.html('手机号码格式有误')
        if (this.value !== ''){
            var reg = /^1[3578]\d{9}$/;
        if (reg.test(this.value)) {
            part_top.html('输入正确√');
            
            part_top.css({"color":"green"});
            logflag = true;
        } else {
            part_top.html('手机号码格式有误');
            
            part_top.css({"color":"red"});
            logflag = false;
        }
        }
    else{
        part_top.html('！手机号码不能为空');
        
        part_top.css({"color":"red"});
        logflag = false;
    
    }
    });
    password.on('focus',function(){
        part_top.html('密码格式为6-16位字母/数字/符号');
        part_top.css({"color":"red"});
    });
    password.on('blur',function(){
        var reg = /[\u4e00-\u9fa5]/;
            if (this.value == '') {
                part_top.html('密码不能为空');
                part_top.css({"color":"red"});
                passflag = false;
            }
            if (reg.test(this.value)) {
                part_top.html('密码格式不对');
                part_top.css({"color":"red"});
                passflag = false;
            }
    });
    password.on('input',function(){
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
                    part_top.css({"color":"red"});
                    passflag = false;
                    break;     
                case 2||3:
                    part_top.html('密码强度：中');
                    part_top.css({"color":"yellow"});
                    passflag = true;
                    break;
                case 4:
                    part_top.html('密码强度：强');
                    part_top.css({"color":"green"});
                    passflag = true;
                    break;
            }
        }
        else {
            part_top.html('密码长度不足');
            part_top.css({"color":"red"});
            passflag = false;
        }
    });
    verifycode.on('blur',function(){
        if(this.value!==code.val()){
            part_top.html('请输入正确的验证码');
            part_top.css({"color":"red"});
            vcflag = false;
        }else{
            part_top.html('验证码正确');
            part_top.css({"color":"green"});
            vcflag=true;
        }
    });
    sbm.on('click',function(){
        
        if( !logflag || !vcflag || !passflag){
            alert(2);
            return false
        }
        alert('注册成功');  
    });
}()