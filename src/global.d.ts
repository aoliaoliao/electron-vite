import axios from 'axios'

export { }

declare global {
  interface Window {
    removeLoading: () => void,
    _node_: any
  }
}
declare module 'vue' {
  interface ComponentCustomProperties {
    $api: typeof axios
  }
}