import React, {Component, PropTypes} from 'react'
import './WelcomeView.css'
import {Loader} from "../Loader/Loader";

export class WelcomeView extends Component {
    renderDialog() {
        if (this.props.loading) {
            return <Loader/>
        } else {
            return <div className="NewProjectDialog">
                <h2>Welcome to PDF Document Converter</h2>
                <button className="Button" onClick={this.props.onNewProjectSelected}>New Project</button>
            </div>
        }
    }

    render() {
        return <div className='container WelcomeView'>
            <div className="FakeTextView">
                <div className="TextViewBox"></div>
                <div className="TextViewBox"></div>
                <div className="TextViewBox"></div>
                <div className="TextViewBox"></div>
            </div>
            <div className="FakePdfView"/>
            <div className="DialogBackground">
                {this.renderDialog()}
            </div>
        </div>
    }
}

WelcomeView.propTypes = {
    onNewProjectSelected: PropTypes.func,
    loading: PropTypes.bool
}

WelcomeView.defaultProps = {
    loading: false
}
