const { ref, reactive, readonly, computed } = Vue;
const { useQuasar } = Quasar
const App = {
  setup() {
      const output = ref(null);
    const files = ref(null)
    const file = ref('')
    const change =  (e) => {
        
            const reader = new FileReader();
    reader.readAsDataURL(files.value);
    reader.onload = (e) => {
      file.value = e.target.result;
    };
       
    }
   
     const $q = useQuasar()
    const name = ref('')
    const color = ref("")
    const items = ref([])
    const alert = (title, message, dark = false) => {
        output.value.focus();
        window.getSelection().selectAllChildren(output.value)
        
        document.execCommand('copy');
       $q.dialog({
        dark,
        title,
        message,
      }).onOk(() => {
        // console.log('OK')
      }).onCancel(() => {
        // console.log('Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
 
    
   
    const add = (event) => {
      items.value.push({
        name: name.value,
        color: color.value
      })
      name.value = ''
      color.value = ''
    }
    
    return {
        output,
        change,
        files,
      alert,
      name,
      color,
      add,
      items,
      file,
    }
  }
}


const app = Vue.createApp(App);
app.use(Quasar, { config: {} })
app.mount("#app");