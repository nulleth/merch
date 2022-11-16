import React from "react";

function ConnectButton(props) {
    return (
        <button>
            {props.wallet}
        </button>
    );
}

export default ConnectButton;