<template>

    <div>
      <b-navbar style="padding: 10px; background-color: #563d7c !important;" toggleable="lg" type="dark" variant="info">
        <b-navbar-brand class="ml-3" href="#">Punto Venta Fácil</b-navbar-brand>

        <!-- <b-navbar-toggle target="nav-collapse"></b-navbar-toggle> -->

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item @click="goToView('cash')" href="#">Caja</b-nav-item>

            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                Productos
              </template>
              <b-dropdown-item @click="goToView('create-product')" href="#">
                <b-icon style="margin-right: 5px;" icon="plus-circle" aria-hidden="true"></b-icon><label>Crear Producto </label>
              </b-dropdown-item>
              <b-dropdown-item @click="goToView('edit-product')" href="#">
                <b-icon style="margin-right: 5px;" icon="pencil-square" aria-hidden="true"></b-icon><label>Editar Producto </label>
              </b-dropdown-item>
              <b-dropdown-item @click="goToView('delete-product')" href="#">
                <b-icon style="margin-right: 5px;" icon="trash" aria-hidden="true"></b-icon><label>Eliminar Producto </label>
              </b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item @click="goToView('configuration')" href="#">
              <b-icon style="margin-right: 5px;" icon="gear-fill" aria-hidden="true"></b-icon>
            </b-nav-item>

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