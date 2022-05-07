<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-card-section class="bg-primary text-white row flex-center">
        <q-img
          :src="client.url"
          spinner-color="white"
          style="height: 45px; max-width: 45px; border-radius: 50px; margin-right:1%; "
          @click="refresh"
        />
        <div class="text-h4 col-10" contenteditable="true" @blur="onChange" v-text="client.name"></div>
        <q-btn color="dark" label="Edit" class="q-ml-sm" @click="editClient"/>
      </q-card-section>
      <q-card-section class="">
        <div class="text-h6">Consulta cliente domicilio</div>
      </q-card-section>
      <q-separator />
      <q-table title="Domicilios" :rows="domicilios" :columns="columns" row-key="name" :filter="filter">
        <template v-slot:top-left>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search" class="col">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:top-right>
          <q-btn color="primary" label="nuevo domicilio" icon="add"  @click="createDomiciio"/>
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th auto-width />
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-btn size="sm" color="primary" round dense @click="editDomicilio(props.row)" icon="edit" />
            </q-td>
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>
    <teleport to="body">
      <q-dialog v-model="modalVisible">
        <domicilio-modal 
        :isEditing="isEditing"
          @close="modalVisible=false"
        />
      </q-dialog>
    </teleport>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import DomicilioModal from '../components/DomicilioModal.vue'
export default {
  name: 'Home',
  components: {DomicilioModal}, 
  setup () {
    const store = useStore()
    const domicilios = computed(()=> store.state.domicilios)
    const columns = computed(()=> store.state.columns)
    const client = computed(()=> store.state.client)
    onMounted(()=>{
      store.dispatch('fetchDomicilios')
      store.dispatch('setClient')
    })
    let isEditing= ref(true)
    let modalVisible = ref(false)

    const editDomicilio = (form) =>{
      isEditing.value = true
      modalVisible.value = true
      store.dispatch('selectDomicilio', form)
    }
    const createDomiciio = () =>{
      isEditing.value = false
      modalVisible.value = true
    }
    const editClient = () =>{
      store.dispatch('editClient',{name: client.name, url: client.url})
    }
    return {
      columns,
      filter: ref(''),
      modalVisible,
      domicilios,
      editDomicilio,
      createDomiciio,
      editClient,
      isEditing,
      client,
      refresh () {
        client.url = 'https://placeimg.com/300/300/people?t=' + Math.random()
      },
      onChange(e){
        client.name = e.target.innerText
      }
    }
  }
}
</script>