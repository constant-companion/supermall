<template>
  <div id="Category">
    <div class="category-nav">
      <nav-bar>
        <div slot="center-nav">分类</div>
      </nav-bar>
    </div>
    <div class="content">
      <category-title class="classifyTitle"
                      @getCategoryContent="getCategoryContent" />
      <category-content class="classifyContent"
                        :content-list="contentList"
                        ref="content" />
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import CategoryTitle from "./childComps/CategoryTitle";
import CategoryContent from "./childComps/CategoryContent";
import {getSubcategory} from '../../network/category'


export default {
  name: "Category",
  data() {
    return {
      contentList: []
    }
  },
  components: {
    NavBar,
    CategoryTitle,
    CategoryContent
  },
  mounted() {
    // getSubcategory(3627).then(res => {
    //     this.contentList = res.data.data.list
    // })
  },
  methods: {
    getCategoryContent(maitKey) {
      getSubcategory(maitKey).then(res => {
        this.contentList = res.data.list;
        this.$refs.content.$emit('backTop');
        console.log(this.contentList)
      })
    }
  }
}
</script>

<style scoped>
.category-nav{
  background-color: #d4237a;
  color: white;
}

.content {
  display: flex;
}

.classifyTitle {
  width: 30%;
}

.classifyContent {
  width: 70%;
}
</style>
