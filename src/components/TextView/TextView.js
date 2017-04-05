import React, {PropTypes, Component} from 'react'
import './TextView.css'
import { TextViewBox } from '../TextViewBox/TextViewBox'

const DEFAULT_PLACEHOLDER_TEXT = '...'

export class TextView extends Component {
  mapKeyToPreviewComponent (key) {
    const result = this.props.results[key]
    const text = result.result
      ? this.props.results[key].result.text
      : DEFAULT_PLACEHOLDER_TEXT

    const loading = this.props.results[key].loading

    return <TextViewBox key={key} text={text} loading={loading}/>
  }
  render () {
    console.log(this.props.results);
    const keys = Object.keys(this.props.results)
    return <div className='TextView'>
      {keys.map(this.mapKeyToPreviewComponent.bind(this))}
    </div>
  }
}

TextView.propTypes = {
  results: PropTypes.any
}