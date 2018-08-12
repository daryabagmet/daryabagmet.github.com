var app = new Vue({
    el: '#app',
    data: {
        imgTitle: '',
        visible : false,
        images: [
            {title:'trick', src:'./images/img_1.svg'},
            {title:'trick', src:'./images/img_1.svg'},
            {title:'trick', src:'./images/img_1.svg'},
            {title:'trick', src:'./images/img_1.svg'},
            {title:'trick', src:'./images/img_1.svg'},
            {title:'treat', src:'./images/img_2.svg'},
            {title:'treat', src:'./images/img_3.svg'},
            {title:'treat', src:'./images/img_4.svg'},
            {title:'treat', src:'./images/img_3.svg'},
            {title:'treat', src:'./images/img_2.svg'}
           
        ],
        cauldron : './images/cauldron.png',
        pumpkin : './images/pumpkin.png'

            
    },
    computed:{
        filteredList: function(){
            var imgTitle = this.imgTitle;

            return this.images.filter(function (elem) {
             
                if(imgTitle === '') return true;
                else return elem.title.indexOf(imgTitle) > -1;
            })


        }
    }
});