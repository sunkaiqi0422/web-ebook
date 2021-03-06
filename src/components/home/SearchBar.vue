<template>
  <div>
    <div class="search-bar" :class="{'hide-title' : !titleVisible, 'hide-shadow' : !shadowVisible}">
      <transition name="title-move">
        <div class="search-bar-title-wrapper" v-show="titleVisible">
          <div class="title-text-wrapper">
            <span class="title-text title">{{$t('home.title')}}</span>
          </div>
          <div class="title-icon-shake-wrapper" @click="showFlapCard">
            <span class="icon-shake icon"></span>
          </div>
        </div>
      </transition>
      <div class="title-icon-back-wrapper" :class="{'hide-title' : !titleVisible}">
        <span class="icon-back icon" @click="back"></span>
      </div>
      <div class="search-bar-input-wrapper" :class="{'hide-title' : !titleVisible}">
        <div class="search-bar-blank" :class="{'hide-title' : !titleVisible}"></div>
        <div class="search-bar-input">
          <span class="icon-search icon"></span>
          <input
            type="text"
            class="input"
            :placeholder="$t('home.hint')"
            v-model="searchText"
            @click="showHotSearch"
            @keyup.enter="search"
          />
        </div>
      </div>
    </div>
    <hot-search-list v-show="hotSearchVisible" ref="hotSearch"></hot-search-list>
  </div>
</template>
<script>
import { storeHomeMixin } from '@/utils/mixin'
import HotSearchList from './HotSearchList'
export default {
  mixins: [storeHomeMixin],
  data() {
    return {
      searchText: '',
      titleVisible: true,
      shadowVisible: false,
      hotSearchVisible: false,
    }
  },
  components: {
    HotSearchList,
  },
  watch: {
    offsetY(offsetY) {
      if (offsetY > 0) {
        this.hideTitle()
        this.showShadow()
      } else {
        this.showTitle()
        this.hideShadow()
      }
    },
    // 搜索页 滚动距离判断是否显示阴影
    hotSearchOffsetY(offsetY) {
      if (offsetY > 0) {
        this.showShadow()
      } else {
        this.hideShadow()
      }
    },
  },
  methods: {
    // 搜索
    search() {
      if (!this.searchText) {
        return
      }
      this.$router.push({
        path: '/store/list',
        query: {
          keyword: this.searchText,
        },
      })
    },
    // 点击 shark 按钮 随机推荐
    showFlapCard() {
      this.setFlapCardVisible(true)
    },
    // 点击 < 返回 隐藏搜索页
    back() {
      if (this.offsetY > 0) {
        this.showShadow()
      } else {
        this.hideShadow()
      }
      if (this.hotSearchVisible) {
        this.hideHotSearch()
      } else {
        this.$router.push('/store/shelf')
      }
    },
    // 是否显示搜索页
    hideHotSearch() {
      this.hotSearchVisible = false
      if (this.offsetY > 0) {
        this.hideTitle()
        this.showShadow()
      } else {
        this.showTitle()
      }
    },
    showHotSearch() {
      // 显示搜索页 隐藏顶部title和阴影
      this.hideTitle()
      this.hideShadow()
      this.hotSearchVisible = true
      this.$nextTick(() => {
        this.$refs.hotSearch.reset()
      })
    },
    // 是否影藏顶部title
    hideTitle() {
      this.titleVisible = false
    },
    showTitle() {
      this.titleVisible = true
    },
    // 阴影控制
    hideShadow() {
      this.shadowVisible = false
    },
    showShadow() {
      this.shadowVisible = true
    },
  },
}
</script>
<style scoped lang='scss'>
@import '@/assets/styles/css/global';
.search-bar {
  position: relative;
  width: 100%;
  height: px2rem(94);
  z-index: 150;
  box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, 0.1);
  &.hide-title {
    height: px2rem(52);
  }
  &.hide-shadow {
    box-shadow: none;
  }
  .search-bar-title-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(42);
    .title-text-wrapper {
      width: 100%;
      height: px2rem(42);
      @include center;
    }
    .title-icon-shake-wrapper {
      position: absolute;
      right: px2rem(15);
      top: 0;
      height: px2rem(42);
      @include center;
    }
  }
  .title-icon-back-wrapper {
    position: absolute;
    left: px2rem(15);
    top: 0;
    height: px2rem(42);
    z-index: 160;
    @include center;
    transition: height $animationTime $animationType;
    &.hide-title {
      height: px2rem(52);
    }
  }
  .search-bar-input-wrapper {
    position: absolute;
    right: 0;
    top: px2rem(42);
    width: 100%;
    height: px2rem(52);
    padding: px2rem(10) px2rem(15);
    display: flex;
    box-sizing: border-box;
    transition: top $animationTime $animationType;
    &.hide-title {
      top: 0;
    }
    .search-bar-blank {
      flex: 0 0 0;
      width: 0;
      transition: all $animationTime $animationType;
      &.hide-title {
        flex: 0 0 px2rem(31);
        width: px2rem(31);
      }
    }
    .search-bar-input {
      flex: 1;
      width: 100%;
      background: #f4f4f4;
      border-radius: px2rem(20);
      padding: px2rem(5) px2rem(15);
      box-sizing: border-box;
      border: px2rem(1) solid #eee;
      @include left;
      .icon-search {
        color: #999;
      }
      .input {
        width: 100%;
        height: px2rem(22);
        border: none;
        background: transparent;
        margin-left: px2rem(10);
        font-size: px2rem(12);
        color: #666;
        &:focus {
          outline: none;
        }
        &::-webkit-input-placeholder {
          color: #ccc;
        }
      }
    }
  }
}
</style>