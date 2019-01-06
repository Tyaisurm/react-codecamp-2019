import React, { Component } from "react";
class NoMatch extends Component {
    render() {
        return <div style={{textAlign: 'center'}}>
                    <h1>You've got lost</h1>;
                    <img src={"http://i.imgur.com/qhMbkGi.jpg"} alt={"lost Vincent"} />
                </div>
    }
}

export default NoMatch;
