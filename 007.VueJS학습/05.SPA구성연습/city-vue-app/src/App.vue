<!-- 1. 템플릿 구역 -->
<template>
  <div class="app">
    <TopArea />
  </div>
</template>

<!-- 2. 스트립트 구역 -->
<script>
  import TopArea from './components/TopArea.vue';
  
  export default {
    // 내보낼 컴포넌트 등록
  components: { TopArea },
    name: 'App'
  }
</script>

<!-- 3. 스타일 구역 : scoped 키워드 없으면 전역 -->
<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
