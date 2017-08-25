Date.prototype.Format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

var app = new Vue({
    el: '#app',
    data: {
        indexItem: 0,
        dateString: '',
        //
        startTime: 1436889600000,
        nowTime: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        days_diff: 0,
        hours_diff: 0,
        minutes_diff: 0,
        seconds_diff: 0,
        //
        hours_all: 0,
        minutes_all: 0,
        seconds_all: 0,
        //
        animateBoy: false,
        animateGirl: false,
    },
    watch: {
        nowTime: function() {
            var date1 = '2015/07/15 00:00:00'; //开始时间  
            var date2 = new Date(this.nowTime); //结束时间  
            var date3 = date2.getTime() - new Date(date1).getTime(); //时间差的毫秒数        

            //------------------------------  

            //计算出相差天数  
            var days = Math.floor(date3 / (24 * 3600 * 1000));

            //计算出小时数  

            var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数  
            var hours = Math.floor(leave1 / (3600 * 1000));
            //计算相差分钟数  
            var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数  
            var minutes = Math.floor(leave2 / (60 * 1000));
            //计算相差秒数  
            var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数  
            var seconds = Math.round(leave3 / 1000);

            this.days_diff = days;
            this.hours_diff = hours;
            this.minutes_diff = minutes;
            this.seconds_diff = seconds;
            this.days = Number(((new Date(this.nowTime.Format('yyyy/MM/dd')).getTime() - this.startTime) / 86400000).toFixed(0)) + 1;
            this.hours_all = Math.floor(date3 / (1000 * 60 * 60));
            this.minutes_all = Math.floor(date3 / (1000 * 60));
            this.seconds_all = Math.floor(date3 / 1000);
            this.dateString = this.nowTime.Format('yyyy-MM-dd  ') + getMyDay(this.nowTime) + this.nowTime.Format('  HH:mm:ss');

            function getMyDay(date) {
                var week;
                if(date.getDay() == 0) week = "周日"
                if(date.getDay() == 1) week = "周一"
                if(date.getDay() == 2) week = "周二"
                if(date.getDay() == 3) week = "周三"
                if(date.getDay() == 4) week = "周四"
                if(date.getDay() == 5) week = "周五"
                if(date.getDay() == 6) week = "周六"
                return week;
            }
        }
    },
    methods: {
        bodyClickAction: function() {
            zjLog('点击body');
            this.indexItem++;
            if(this.indexItem === 6) {
                this.indexItem = 0;
            }
        },
        nameClick: function(index) {
            var self = this;
            zjLog('点击头像' + index);
            if(index === 1) {
                self.animateBoy = true;
                setTimeout(function() {
                    self.animateBoy = false;
                }, 1000);
            } else {
                self.animateGirl = true;
                setTimeout(function() {
                    self.animateGirl = false;
                }, 1000);
            }

        },
    },
    mounted: function() {
        var self = this;
        self.nowTime = new Date();
        setInterval(function() {
            self.nowTime = new Date();
        }, 500);
        zjLog('打开页面');
    }
});