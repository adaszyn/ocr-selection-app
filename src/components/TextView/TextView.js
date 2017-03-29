import React, {PropTypes, Component} from 'react'
import './TextView.css'

export class TextView extends Component {
  mapKeyToPreviewComponent (key) {
    return <div key={key}>
      {this.props.results[key].text}
    </div>
  }
  render () {
    const keys = Object.keys(this.props.results)
    return <div className='TextView'>
      {keys.map(this.mapKeyToPreviewComponent.bind(this))}
    </div>
  }
}

TextView.propTypes = {
  results: PropTypes.any
}