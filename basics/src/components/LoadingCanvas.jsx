import React from 'react';

class LoadingCanvas extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
    }

    shouldDisplay(){
        return this.props.isLoading ? '' : 'hidden';
    }

    render() {
        return (
            <div id="loading-canvas" className={this.shouldDisplay()}>
                <div id="spinner">
                    <span className="glyphicon glyphicon-refresh spinning large" aria-hidden="true"></span>
                    <span className="block">Loading...</span>
                </div>
                <div id="canvas">
                </div>
            </div>
        );
    }

}

export default LoadingCanvas;