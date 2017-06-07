import React, {Component, PropTypes} from 'react'
import './DropDown.css'

export class DropDown extends Component {
    handleChange ({target: {value}}) {
        this.props.onChange(value)
    }
    render() {
        return <select className="DropDown" onChange={this.handleChange.bind(this)} defaultValue={this.props.selected}>
            {this.props.values.map(({value, id}) => <option value={id} key={id}>{value}</option>)}
        </select>
    }
}

DropDown.propTypes = {
    values: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        id: PropTypes.string
    })),
    onChange: PropTypes.func,
    selected: PropTypes.string
}

