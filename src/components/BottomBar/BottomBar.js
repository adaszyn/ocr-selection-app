import React, {Component, PropTypes} from 'react'
import './BottomBar.css'
import {Input} from "../Input/Input";
import {Button} from "../Button/Button";

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

    handleAuthorChange(event) {
        this.setState(setAuthor(event.target.value))
    }

    handleTitleChange(event) {
        this.setState(setTitle(event.target.value))
    }

    handleClick() {
        this.props.onFileExport({
            author: this.state.author,
            title: this.state.title,
            format: this.state.format
        })
    }

    render() {
        return <div className="BottomBar">
            <div>
                <label htmlFor="author-input" className="Label">AUTHOR</label>
                <Input id="author-input" type="text" value={this.state.author}
                       onChange={this.handleAuthorChange.bind(this)}/>
            </div>
            <div className="titleInputContainer">
                <label htmlFor="title-input" className="Label">TITLE</label>
                <Input id="title-input" type="text" value={this.state.title}
                       onChange={this.handleTitleChange.bind(this)}/>
            </div>
            <Button onClick={this.handleClick.bind(this)}>Download EPUB</Button>
        </div>
    }
}

BottomBar.propTypes = {
    onFileExport: PropTypes.func.isRequired
}

BottomBar.defaultProps = {}
