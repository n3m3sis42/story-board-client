import React, { Component } from 'react';
import ScenesAdapter from '../adapters/ScenesAdapter'
import Scene from './Scene'
import SceneForm from './SceneForm'

const data = {
  scene: {
    title: '',
    notes: ''
  }
}

export default class ScenesContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      scenes: [],
      currentSceneId: null,
      notification: ''
    }
  }

  componentDidMount() {
    ScenesAdapter.index()
      .then(json => this.setState({
              scenes: json
            },
            () => {console.log(this.state.scenes)})
      )
  }

  addNewScene = () => {
    ScenesAdapter.create(data)
      .then(json => this.setState({
                      scenes: [json, ...this.state.scenes],
                      currentSceneId: json.id,
                      notification: ''
                    })
      )
  }

  getSceneIndex = (id) => {
    return this.state.scenes.findIndex(scene => scene.id === id)
  }

  updateScene = (data) => {
    ScenesAdapter.update(this.state.currentSceneId, data)
      .then(json => {
                      let index = this.getSceneIndex(json.id)
                      this.setState({
                        scenes: [...this.state.scenes.slice(0, index), json, ...this.state.scenes.slice(index + 1)],
                        currentSceneId: json.id,
                        notification: 'All changes saved.'
                      },
                        () => {console.log(this.state.scenes)}
                      )
      })
  }

  resetNotification = () => {
    this.setState({
      notification: ''
    })
  }

  enableEditing = (id) => {
    this.setState({
      currentSceneId: id
    }, () => { this.title.focus() })
  }

  deleteScene = (id) => {
    ScenesAdapter.delete(id)
      .then(resp => {
                      let index = this.getSceneIndex(id)
                      if (resp.status === 204) {
                          this.setState({
                            scenes: [...this.state.scenes.slice(0, index), ...this.state.scenes.slice(index + 1)],
                            currentSceneId: '',
                            notification: 'Scene deleted successfully.'
                          },
                            () => {console.log(this.state.scenes)}
                          )
                      } else {
                        this.setState({
                          currentSceneId: '',
                          notification: 'Unable to delete scene.'
                        },
                          () => {console.log(resp.status, resp.statusText)}
                        )

                      }
      })
  }

  render() {
    return (
      <div className="Scenes-container">
        <div className="Scenes-container header">
          <h3>Scenes</h3>
        </div>
        <div className="Scenes-container controls">
          <button className="Scenes-container btn" onClick={this.addNewScene} >
            +
          </button>
          <span className="Scenes-container notification">
            {this.state.notification}
          </span>
        </div>
        <div className="Scenes-container body">
          {this.state.scenes.map((scene) => {
            return (
              (this.state.currentSceneId === scene.id) ?
              <SceneForm key={scene.id} scene={scene} resetNotification={this.resetNotification} titleRef={input => this.title = input} updateScene={this.updateScene} /> :
              <Scene key={scene.id} scene={scene} onClick={this.enableEditing} onDelete={this.deleteScene}/>
            )
          })}
        </div>
      </div>
    );
  }
}
