/**
 * Created by web on 2018/9/20.
 */
  var imga=["img/wsl.jpg","img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg","img/5.jpg","img/6.jpg","img/7.jpg"];
new Vue({
   el:"#ba",
    data:{

        imga
    },
    methods:{
       cha(i){
           return this.imga[i]
       },
       prev(){
           i++;
         return this.imga[i]
       }
    },
    computed:{

    }

});
