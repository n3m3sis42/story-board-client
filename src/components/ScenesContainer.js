import React, { Component } from 'react';
import ScenesAdapter from '../adapters/ScenesAdapter'
import Scene from './Scene'

export default class ScenesContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      scenes: []
    }
  }

  componentDidMount() {
    ScenesAdapter.index()
      .then(json => this.setState({
              scenes: json
            },
            () => {console.log(this.state.scenes)}
          )
        )
      .catch(error => console.log(error))

  }

  render() {
    return (
      <div className="Scenes-container">
        <div className="Scenes-container header">
          <h3>Scenes</h3>
          <div>
            <button className="Scenes-container btn">
              New Scene
            </button>
          </div>
        </div>
          {this.state.scenes.map((scene) => {
            return (
              <Scene key={scene.id} scene={scene} />
            )
          })}
      </div>
    );
  }
}
