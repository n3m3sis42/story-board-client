export const ADD_SCENE = 'ADD_SCENE'
export const UPDATE_SCENE = 'UPDATE_SCENE'
export const DELETE_SCENE = 'DELETE_SCENE'
export const SET_CURRENT_SCENE = 'SET_CURRENT_SCENE'

// NOTE maybe change SET_CURRENT_SCENE to SELECT_SCENE and handle focus? idk

export const NotificationValues = {
  ADD_SCENE: '',
  UPDATE_SCENE: 'All changes saved.',
  DELETE_SCENE: 'Scene deleted successfully.'
}

export function addScene(scene) {
  return { type: ADD_SCENE, scene }
}

export function updateScene(scene) {
  return { type: UPDATE_SCENE, scene }
}

export function deleteScene(id) {
  return { type: DELETE_SCENE, id }
}

export function setCurrentScene(scene) {
  return { type: SET_CURRENT_SCENE, scene }
}
