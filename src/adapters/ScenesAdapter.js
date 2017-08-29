const baseUrl = 'http://localhost:3000/api/v1/scenes'

export default class ScenesAdapter {

  static index() {
    return (
      fetch(`${baseUrl}`)
        .then(resp => resp.json())
    )    
  }
}
