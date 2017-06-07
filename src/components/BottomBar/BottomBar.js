import React, {Component, PropTypes} from 'react'
import './BottomBar.css'

const getInitialState = () => {
    return {
        title: '',
        author: '',
        format: 'epub'
    }
}

export const setAuthor = author => state => {
    state.author = author
    return state
}

export const setTitle = title => state => {
    state.title = title
    return state
}

export class BottomBar extends Component {
    constructor(props) {
        super(props)
        this.state = getInitialState()
    }
    handleAuthorChange (event) {
        this.setState(setAuthor(event.target.value))
    }

    handleTitleChange (event) {
        this.setState(setTitle(event.target.value))
    }

    handleClick () {
        this.props.onFileExport({
            ...this.state
        })
    }

    render() {
        return <div className="BottomBar">
            <input type="text" value={this.state.author} onChange={this.handleAuthorChange.bind(this)}/>
            <input type="text" value={this.state.title} onChange={this.handleTitleChange.bind(this)}/>
            <button onClick={this.handleClick.bind(this)}>Download EPUB</button>
        </div>
    }
}

BottomBar.propTypes = {
    onFileExport: PropTypes.func.isRequired
}

BottomBar.defaultProps = {}
