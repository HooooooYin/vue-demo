<template>
  <div>
    <h1>my.data</h1>
    <h5>{{ name }}</h5>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: ''
    }
  },
  mounted () {
    let user = sessionStorage.getItem('user')

    if (user) {
      user = JSON.parse(user)

      this.name = user.name
    }
  }
}
</script>
