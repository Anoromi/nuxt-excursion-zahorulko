import { Ref } from 'vue'

export async function useAsyncState<T>(
  key: string,
  init: () => T,
  loader: (store: T) => Promise<void>,
): Promise<Ref<T>> {
  const state = useState(key, () => {
    return {
      _initialized_: false,
      ...init(),
    }
  })

  if (!state.value._initialized_) {
    await loader(state.value)
    state.value._initialized_ = true
  }
  return state
}
