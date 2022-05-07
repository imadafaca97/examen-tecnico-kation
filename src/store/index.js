import { createStore } from "vuex";
import axios from "axios"

export default createStore({
  state:{
    client: {},
    domicilios:[],
    columns: [
      {
        name: 'num',
        required: true,
        label: 'Persona no.',
        align: 'left',
        field: row => row.num,
        format: val => `${val}`,
        sortable: true
      },
      { name: 'domicilio', align: 'center', label: 'Domicilio', field: 'domicilio', sortable: true },
      { name: 'calle', label: 'calle', field: 'calle', sortable: true },
      { name: 'numero', label: 'Número', field: 'numero', sortable: true },
      { name: 'sector', label: 'Sector', field: 'sector', sortable: true },
      { name: 'povincia', label: 'Provincia', field: 'provincia', sortable: true },
      { name: 'estado', label: 'Estado', field: 'estado', sortable: true}
    ],
    domicilioSelected:{}
  },
  mutations:{
    setDomicilios(state, payload){
      state.domicilios = payload
    },
    newDomicilio(state, payload){
      state.domicilios.push(payload)
    },
    updateDomicilio(state, payload){
      state.domicilios[payload.id] = payload
    },
    selectDomicilio(state, payload){
      state.domicilioSelected = payload
    },
    setClient(state,payload){
      state.client = payload
    }
  },
  actions:{
    async fetchDomicilios({commit}){
      await axios.get('http://localhost:3000/domicilio').then(res=>{
        commit('setDomicilios',res.data)
      })
    },
    async fetchClient({commit}){
      await axios.get('http://localhost:3000/client').then(res=>{
        commit('setClient',res.data)
      })
    },
    async createDomicilio({commit}, form){
      await axios.post(`http://localhost:3000/domicilio`,form).then(res=>{
        commit('newDomicilio',res.data)
      })
    },
    async updateDomicilio({commit}, form){
      await axios.put(`http://localhost:3000/domicilio/${form.id}`,form).then(res=>{
        commit('updateDomicilio', res.data)
      })
    },
    selectDomicilio({commit}, form){
      commit('selectDomicilio', form)
    },
    async setClient({commit}, form){
      await axios.get(`http://localhost:3000/client`,form).then(res=>{
        commit('setClient',res.data)
      })
    },
    async editClient({commit}, form){
      await axios.put(`http://localhost:3000/client`,form).then(res=>{
        commit('setClient',res.data)
      })
    }
  },
  modules:{

  }
})