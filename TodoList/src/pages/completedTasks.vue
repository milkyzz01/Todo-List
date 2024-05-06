<template>
  <div class="flex justify-center">
    <div class="full-width q-pa-xl">
      <h6 class="q-my-none q-mb-lg title-complete q-pa-md">Completed Tasks</h6>
      <div class="completedTodo-container q-pa-lg">
        <q-card v-for="row in FinishedTasks" :key="row.id" class="q-mt-sm">
          <q-card-section class="bg-white text-black q-pa-none">
            <div class="text-bold q-pa-md">{{ row.todo }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { FinishedTasks } from "../composables/TasksContainer";
export default defineComponent({
  name: 'completedPage',

  setup(){
    return{
      FinishedTasks
    }
  }
})
</script>
<style scoped>
.completedTodo-container{
  background-color: rgb(112, 228, 228);
  border-radius: 20px;
  box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
}
.title-complete{
  background-color: rgb(159, 173, 173);
  border-radius: 20px;
  text-align: center;
  box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
}
</style>