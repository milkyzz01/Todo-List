<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated :style="{ backgroundColor: '#21BA45' }">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Todo List
        </q-toolbar-title>

        <div>Quasar{{ $q.time }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Todo List Menu
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Dashboard',
    caption: 'Create Todo List',
    icon: 'add',
    link: 'create'
  },
  {
    title: 'Deleted',
    caption: 'Deleted Todo List',
    icon: 'delete',
    link: 'index'
  },
  {
    title: 'Completed',
    caption: 'Completed Todo List',
    icon: 'check',
    link: 'completed'
  },
  
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
