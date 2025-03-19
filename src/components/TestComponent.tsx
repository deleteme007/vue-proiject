import { defineComponent, ref, computed, watch, onMounted } from 'vue'
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
      <div class="test-component">
        <h1 class="title">{message.value}</h1>
        
        <div class="counters">
          <p class="counter-item">
            <span class="label">Local Count:</span>
            <span class="value">{count.value}</span>
          </p>
          <p class="counter-item">
            <span class="label">Doubled Count:</span>
            <span class="value">{doubledCount.value}</span>
          </p>
          <p class="counter-item">
            <span class="label">Store Count:</span>
            <span class="value">{counterStore.count}</span>
          </p>
        </div>
        
        <button class="increment-btn" onClick={increment}>
          Increment
        </button>
        
        <div class="regular-component">
          <RegularVueComponent msg="Mixing TSX and SFC" />
        </div>
        
        {/*
          CSS-in-JS styles
        */}
        <style jsx>{`
          .test-component {
            padding: 2rem;
            border: 1px solid #e2e8f0;
            border-radius: 0.5rem;
            background-color: #f8fafc;
            max-width: 600px;
            margin: 0 auto;
          }
          
          .title {
            color: #1e293b;
            text-align: center;
            margin-bottom: 1.5rem;
          }
          
          .counters {
            margin-bottom: 1.5rem;
          }
          
          .counter-item {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 0;
            border-bottom: 1px solid #e2e8f0;
          }
          
          .label {
            color: #64748b;
          }
          
          .value {
            color: #1e293b;
            font-weight: 500;
          }
          
          .increment-btn {
            display: block;
            width: 100%;
            padding: 0.75rem;
            background-color: #3b82f6;
            color: white;
            border: none;
            border-radius: 0.25rem;
            cursor: pointer;
            transition: background-color 0.2s;
          }
          
          .increment-btn:hover {
            background-color: #2563eb;
          }
          
          .regular-component {
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid #e2e8f0;
          }
          
          @media (max-width: 480px) {
            .test-component {
              padding: 1rem;
            }
            
            .title {
              font-size: 1.5rem;
            }
          }
        `}</style>
      </div>
    )
  }
})
