
var vm = new Vue({
    el: '.container',

    data: {
        //书籍列表
        bookList: [],

        book: {
            bookName: "",
            bookAuthor: "",
            bookPrice: ""
        }
    },

    //初始化
    mounted: function () {
        this.$nextTick(function () {

            //获得所有书籍
            this.getAllBook();
        })
    },

    //筛选器
    filters: {
        formatMoney: function (value) {

            if (value != null) {
                return value.toFixed(2) + "元";
            }
        }
    },

    methods: {

        //获得所有书籍
        getAllBook: function () {
            this.$http.get('./data/book.json').then(res => {

                //如果获取到了书籍
                if (res.body.status == 0) {
                    this.bookList = res.body.list;
                }
            });
        },

        //删除书籍
        deleteBook: function (book) {
            //获得书籍在数组中的索引
            var index = this.bookList.indexOf(book);

            //删除书籍
            this.bookList.splice(index, 1);
        },

        //添加书籍
        addBook: function () {

            if (this.book.bookName != "" && this.book.bookAuthor != "" && this.book.bookPrice != "") {

                //将书籍的价格由字符串转换成数字
                this.book.bookPrice = parseInt(this.book.bookPrice);

                if(isNaN(this.book.bookPrice)) {
                    alert("书籍价格的格式不正确");
                    this.book.bookPrice = "";
                    return;
                }

                //将书籍添加到书籍数组中
                this.bookList.push(this.book);

                this.book = "";
            } else {
                alert("请补全输入框")
            }
        }
    }
})