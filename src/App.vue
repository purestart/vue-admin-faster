<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%;
  min-width: 1200px;
}
ul,ol{
  list-style:none;
  margin:0px;
}
html, body, ul, ol, dl, dd, dt, p, h1, h2, h3, h4, h5, h6, fieldset, legend, img{
  margin:0;
  padding:0;
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
}


*{box-sizing:border-box;}

ul,ol{
  list-style:none;
}

a{
  color: #409EFF;
  &:link,
  &:active,
  &:visited,
  &:hover {
    
    text-decoration: none;
  }
}
</style>
