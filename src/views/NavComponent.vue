<template>

    <div>
      <b-navbar style="padding: 10px;" toggleable="lg" type="dark" variant="info">
        <b-navbar-brand class="ml-3" href="#">Punto Venta Facil</b-navbar-brand>

        <!-- <b-navbar-toggle target="nav-collapse"></b-navbar-toggle> -->

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item @click="goToView('cash')" href="#">Caja</b-nav-item>

            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                Products
              </template>
              <b-dropdown-item @click="goToView('create-product')" href="#">Crear Producto</b-dropdown-item>
              <b-dropdown-item @click="goToView('edit-product')" href="#">Editar Producto</b-dropdown-item>
              <b-dropdown-item href="#">Eliminar Producto</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
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
    goToView(view) {
      console.log('se selecciono', view)
      this.$emit('goToView', view);
    },
    goToCash() {
      /* this.$router.push({ name: 'cash'}) */
      this.$emit('goToCash')
    },
    goToCreateProduct() {
      /* this.$router.push({ name: 'cash'}) */
      this.$emit('goToCreateProduct')
    },
  }
}
</script>