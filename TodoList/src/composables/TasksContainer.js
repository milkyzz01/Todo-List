import {ref} from 'vue';


let todoContainer = ref([])
let FinishedTasks = ref([])
let DeletedTasks = ref([])
let showtasks = ref(false)


export { todoContainer, FinishedTasks, DeletedTasks, showtasks }