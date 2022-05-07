<template>
  <q-card class="card">
    <q-card-section class="row items-center q-pb-none bg-primary text-white">
      <div class="text-h6">{{isEditing? 'Editar domicilio':'Nuevo domicilio'}}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup @click="$emit('close')" />
    </q-card-section>

    <q-form @submit="onSubmit" class="q-gutter-md form">
      <q-input filled v-model="form.num" label="Num" lazy-rules type="number"
        :rules="[ val => val && val.length > 0 || 'Please type something']" />

      <q-input filled v-model="form.domicilio" label="Domicilio" lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']" />

      <q-input filled v-model="form.calle" label="Calle" lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']" />

      <q-input filled v-model="form.numero" label="Número" lazy-rules type="number"
        :rules="[ val => val && val.length > 0 || 'Please type something']" />

      <q-input filled v-model="form.sector" label="Sector" lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']" />

      <q-input filled v-model="form.provincia" label="Provincia" lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']" />
      <q-toggle v-model="isActive" :label="isActive? 'activo':'inactivo'" color="primary"/>

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
  </q-card>
</template>
<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
props:{
  isEditing: Boolean
},
  setup (props, {emit}) {
    const store = useStore()
    const isActive= ref(true)
    let form = ref([])
    if(props.isEditing){
      form = computed(()=>store.state.domicilioSelected)
    }
    return {
      form,
      isActive,

      onSubmit () {
        if(props.isEditing){
          store.dispatch('updateDomicilio',{...form._value, estado: isActive.value ? 'activo': 'inactivo'} )
        }else{
          store.dispatch('createDomicilio',{...form._value, estado: isActive.value ? 'activo': 'inactivo'})
        }
        emit('close')
      }
    }
  }
}
</script>
<style scoped>
.card{
  width: 40%;
}
.form{
  padding: 2%;
}
</style>

