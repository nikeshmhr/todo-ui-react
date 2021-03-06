import React from "react";

const AppHeader = props => {
    return (
        <h2 className="ui header">
            <i className={props.iconClass} />
            <div className="content">{props.appName}</div>
        </h2>
    );
};

export default AppHeader;
