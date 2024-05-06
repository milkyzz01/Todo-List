<template>
  <q-page>
    <div class="main-container">
    <h6 class="q-my-none q-mt-lg title-create q-pa-md">Create Tasks</h6>
    <div class="task-wrapper">
    <q-input
         dense
         outlined
         label="What's your todo?"
         lazy-rules
         class="input-task"
         v-model="text"
         />
    <q-btn
        glossy
        class="createButton"
        :label="!selectedTodo ? 'Create' : 'Update'"
        type="submit"
        @click="!selectedTodo ? addtodo() : updateTodo()"
        />
    </div>
    
    <div class="todo-wrapper q-mt-lg" v-if="showtasks">
        <h6 class="q-my-none q-mt-sm list">Tasks List</h6>
        <q-card class="todoList" v-for="row in todoContainer" :key="row.id">
           <q-card-section class="text-black todos" >
                <div class="text-bold q-pl-lg item-todo" @click="selectRow(row)">{{ row.todo }}</div>
                     <div>
                       <q-btn @click="removeTodo(row)" flat icon="delete_outline" color="red"/>
                       <q-btn @click="completeTasks(row)" flat icon="check_circle_outline" color="green"/>
                    </div>
            </q-card-section>
         </q-card>
      </div>
      </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { ref } from 'vue';
import { todoContainer, FinishedTasks, DeletedTasks, showtasks } from './../composables/TasksContainer';
import { onMounted } from 'vue';


export default defineComponent({
  name: 'createPage',

  setup(){
     const text = ref(null);
     const todoID = ref(null);
     const addtodo = () =>{
        if (text.value !== null){
            todoContainer.value.push({id: todoID.value++, todo: text.value});
            showtasks.value = true;
            console.log(todoContainer.value[0].todo);
            console.log(todoContainer.value);
        } else {
            console.log("there is no inputed text")
        }
        text.value = null;
     };
     //delete todo
     const removeTodo = (todo) => {
      const index = todoContainer.value.findIndex(item => item.id === todo.id);
      if (index !== -1) {
          DeletedTasks.value.push(todoContainer.value[index]);
          todoContainer.value.splice(index, 1);
          console.log(DeletedTasks.value)
          if(todoContainer.value.length === 0){
            showtasks.value = false
          }
      }
     };
      // check when mounted if the value of containertodo is not null
     onMounted(() => {
       showtasks.value = todoContainer.value.length > 0; 
     });

     //Completed tasks function
     const completeTasks = (completeTodo) =>{
       const completedIndex = todoContainer.value.findIndex(item => item.id === completeTodo.id);
       if(completedIndex !== -1){
          FinishedTasks.value.push(todoContainer.value[completedIndex]);
          todoContainer.value.splice(completedIndex, 1);
          if(todoContainer.value.length === 0){
            showtasks.value = false;
          }
       }
     };

     const selectedTodo = ref(null);
     const selectRow = (row) =>{
         selectedTodo.value = row;
         text.value = row.todo;
     }

     const updateTodo = () =>{
        const updateIndex = todoContainer.value.findIndex(item => item.id === selectedTodo.value.id);
        if(updateIndex !== -1){
            todoContainer.value[updateIndex].todo = text.value;
            console.log("update function clicked")
            text.value = null;
            selectedTodo.value = null;
        }
     }


     return {
        text,
        todoContainer,
        addtodo,
        showtasks,
        removeTodo,
        completeTasks,
        selectRow,
        updateTodo,
        selectedTodo
     };
     
  }
  
})
</script>
<style scoped>
.main-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.task-wrapper{
    display: flex;
    justify-content: center;
    margin-top: 2%;
    gap: 20px;
    background-color: rgb(239, 245, 245);
    padding: 40px;
    border-radius: 40px;
    
    width: 80%;

}
.createButton{
    width: 100px;
    color: black;
}
.input-task{
    width: 500px;
}
.todo-wrapper{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(112, 228, 228);
    gap: 10px;
    width: 80%;
    padding: 30px;
    margin-bottom: 5%;
    border-radius: 20px;
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
}
.todoList{
    width: 100%;
    height: 40px;
    display: flex;
}
.todos{
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
}
.title-create{
    background-color: rgb(159, 173, 173);
    width: 80%;
    border-radius: 20px;
    text-align: center;
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
    
}
.list{
    width: 100%;
}
.item-todo{
    cursor: pointer;
}
</style>