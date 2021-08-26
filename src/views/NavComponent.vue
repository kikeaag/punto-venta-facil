<template>
  <div>
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">PUNTO VENTA FACIL</a>
  </div>
</nav>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'NavComponent',
  components: {
    //
  },
  methods: {
    goToCash() {
      this.$router.push({ name: 'cash'})
    }
  }
}
</script>