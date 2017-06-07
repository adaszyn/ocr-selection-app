import React, {Component, PropTypes} from 'react'
import './WelcomeView.css'
import {Loader} from "../Loader/Loader";
import {FileInput} from "../FileInput/FileInput";

export class WelcomeView extends Component {
    renderDialog() {
        if (this.props.loading) {
            return <Loader/>
        } else {
            return <div className="NewProjectDialog">
                <h2>Welcome to PDF Document Converter</h2>
                <FileInput onFileLoaded={this.props.onFileLoaded}/>
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
    onFileLoaded: PropTypes.func,
    loading: PropTypes.bool
}

WelcomeView.defaultProps = {
    loading: false
}
