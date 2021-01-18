<template>
  <div>
     <CheckboxGroup @on-change="checkboxChangeHandler('color',$event)" :value="color">
       <Checkbox  v-for="(item,index) in allColor" :key="index" :label="item">{{item}}</Checkbox>

     </CheckboxGroup>
     <CheckboxGroup @on-change="checkboxChangeHandler('brand',$event)" :value="brand">
       <Checkbox  v-for="(item,index) in allBrand" :key="index" :label="item">{{item}}</Checkbox>
     </CheckboxGroup>
     <CheckboxGroup @on-change="checkboxChangeHandler('exhaust',$event)" :value="exhaust">
       <Checkbox  v-for="(item,index) in allExhaust" :key="index" :label="item">{{item}}</Checkbox>
     </CheckboxGroup>
     <Row>
       <i-col  :span="2">
         请选择购买日期：
       </i-col>
       <i-col>
        <DatePicker type="daterange" placeholder="请选择购买日期" style="width: 200px"  @on-change="finishHandler"></DatePicker>
       </i-col>
     </Row>
     <Row>
       <i-col :span="2">
         价格范围：
       </i-col>
       <i-col :span="20">
         <Slider v-model="value11" range  :value="price" @on-change="changePriceHandler" :min="0" :max="120"></Slider>
       </i-col>
     </Row>
    <Table :columns="columns1" :data="data1"/>
    <Page :total="total" @on-change="changPage" :current="page"/>

  </div>
</template>

<script>
import axios from 'axios'
import querystring from 'querystring'
export default {
  created () {
    this.loadData()
  },
  components: { },
  name: 'App',
  data () {
    let self = this
    return {
      data1: [],
      total: 0,
      page: 1,
      allColor: ['红', '黄', '蓝', '绿', '黑', '白', '灰'],
      allBrand: ['大众', '奥迪', '宝马', '奔驰', '标志', '丰田', '雪佛兰', '路虎', '日产', '五菱', '特斯拉', 'MINI'],
      allExhaust: ['国一', '国二', '国三', '国四', '国五', '国六'],
      color: [],
      brand: [],
      exhaust: [],
      buydate: ['', ''],
      price: [0, 120],
      value11: [0, 120],
      // marks: {
      //   0: 0,
      //   15: 15,
      //   40: 40,
      //   75: 75,
      //   120: 120
      // },
      columns1: [
        {
          title: '头像',
          render (h, theRowData) {
            // 这里的this指向theRowData
            return h('img', {
              'width': 200 + 'px',
              'attrs': {
                src: `http://aiqianduan.com:56506/images/carimages_small/${self.data1[theRowData.index].id}/view/${self.data1[theRowData.index].img}`
              }
            })
          }
        },
        {
          title: '品牌',
          key: 'brand'
        },
        {
          title: '类型',
          key: 'series'
        },
        {
          title: '颜色',
          key: 'color'
        },
        {
          title: '价格',
          key: 'price'
        },
        {
          title: '公里',
          key: 'km'
        },
        {
          title: '排量',
          key: 'engine'
        },
        {
          title: '购买日期',
          render (h, theRowData) {
            let time = new Date(theRowData.row.buydate)
            let y = time.getFullYear()
            let m = (time.getMonth() + 1).toString().padStart(2, '0')
            let d = time.getDate().toString().padStart(2, '0')
            return h('div', `${y}-${m}-${d}`)
          }
        },
        {
          title: '尾气',
          key: 'exhaust'
        },
        {
          title: '挡类型',
          key: 'gearbox'
        },
        {
          title: '燃油',
          key: 'fuel'
        }

        // {
        //   title: '总分',
        //   // render函数表示要人为干预表格的结果,参数1：h函数，参数2：
        //   // h函数叫做createElement函数,参数1：创建什么标签，参数2：表示标签中的内容，这个函数可以无穷嵌套
        //   render (h, theRowData) {
        //     return h('img', [h('ul', [h('li', 'A'), h('li', 'B')])])
        //   }

        // }
      ]
    }
  },
  methods: {
    loadData () {
      let queryParam = {
        page: this.page,
        price: this.price.join('to')
      }
      if (this.color.length !== 0) {
        queryParam.color = this.color.join('v')
      }
      if (this.brand.length !== 0) {
        queryParam.brand = this.brand.join('v')
      }
      if (this.exhaust.length !== 0) {
        queryParam.exhaust = this.exhaust.join('v')
      }
      if (this.buydate[0] !== '' && this.buydate[1] !== '') {
        queryParam.buydate = this.buydate.join('to')
      }
      axios.get(`http://www.aiqianduan.com:56506/cars?${querystring.stringify(queryParam)}`).then((result) => {
        this.total = result.data.total
        this.data1 = result.data.results
      })
    },
    changPage (e) {
      this.page = e
      this.loadData()
    },
    checkboxChangeHandler (k, v) {
      this.$data[k] = v // 这两个语法一样 this[k]=v
      this.page = 1
      this.loadData()
    },
    finishHandler (e) {
      console.log(e)
      if (e[0] !== '' && e[1] !== '') {
        this.buydate = e.map((item) => {
          return Date.parse(item)
        })
      } else {
        this.buydate = e
      }
      this.page = 1
      this.loadData()
    },
    changePriceHandler (e) {
      this.price = e
      this.loadData()
    }
  }
}
</script>
<style>

</style>
