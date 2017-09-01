import {NotificationValues, ADD_SCENE, UPDATE_SCENE, DELETE_SCENE, SET_CURRENT_SCENE} from "../actions/scenes"


const initialState = {
  scenes: [],
  currentScene: null,
  notification: ''
}

function getIndex(id, scenes) {
  return scenes.findIndex(scene => scene.id === id)
}

function scenes (state = [], action) {
  switch (action.type) {
    case ADD_SCENE:
      return [...state, action.scene]
    case UPDATE_SCENE:
      let index = getIndex(state, action.scene.id)
      return (
        index === -1 ? state : [...state.slice(0, index), action.scene, ...state.slice(index + 1)]
      )
    case DELETE_SCENE:
      let index = getIndex(state, action.scene.id)
      return (
        index === -1 ? state : [...state.slice(0, index), ...state.slice(index + 1)]
      )
    default:
      return state
  }
}

function scenesReducer (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_SCENE:
      return Object.assign({}, state, {
        currentScene: action.scene
      })
    case ADD_SCENE:
    case UPDATE_SCENE:
    case DELETE_SCENE:
      return Object.assign({}, state, {
        scenes: scenes(state.scenes, action),
        notification: NotificationValues[action.type],
        currentScene: action.scene
      })
    default:
      return state
  }
}

// NOTE this can be refactored to use combineReducer -- see info here:
// http://redux.js.org/docs/basics/Reducers.html

export default scenesReducer
