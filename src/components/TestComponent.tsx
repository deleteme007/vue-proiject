import { defineComponent, ref, computed, watch, onMounted } from 'vue'
import styles from './TestComponent.module.css'
import { useCounterStore } from '@/stores/counter'
import RegularVueComponent from './HelloWorld.vue'

export default defineComponent({
  name: 'TestComponent',
  props: {
    initialCount: {
      type: Number,
      default: 0
    }
  },
  emits: ['countChanged'],
  setup(props, { emit }) {
    // Reactive state
    const count = ref(props.initialCount)
    const message = ref('Hello from TSX!')
    const doubledCount = computed(() => count.value * 2)
    
    // Pinia store
    const counterStore = useCounterStore()
    
    // Watcher
    watch(count, (newVal, oldVal) => {
      console.log(`Count changed from ${oldVal} to ${newVal}`)
      emit('countChanged', newVal)
    })
    
    // Lifecycle hook
    onMounted(() => {
      console.log('Component mounted')
    })
    
    // Methods
    const increment = () => {
      count.value++
      counterStore.increment()
    }
    
    return () => (
      <div class={styles.testComponent}>
        <h1 class={styles.title}>{message.value}</h1>
        
        <div class={styles.counters}>
          <p class={styles.counterItem}>
            <span class={styles.label}>Local Count:</span>
            <span class={styles.value}>{count.value}</span>
          </p>
          <p class={styles.counterItem}>
            <span class={styles.label}>Doubled Count:</span>
            <span class={styles.value}>{doubledCount.value}</span>
          </p>
          <p class={styles.counterItem}>
            <span class={styles.label}>Store Count:</span>
            <span class={styles.value}>{counterStore.count}</span>
          </p>
        </div>
        
        <button class={styles.incrementBtn} onClick={increment}>
          Increment
        </button>
        
        <div class={styles.regularComponent}>
          <RegularVueComponent msg="Mixing TSX and SFC" />
        </div>
      </div>
    )
  }
})
