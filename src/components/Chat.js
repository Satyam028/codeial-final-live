import React, { Component } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import "../chat.css";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: [],
      typedMessage: "",
    };
    this.socket = io.connect("http://54.237.158.65:5000");
    this.userEmail = props.user.email;
    //   console.log("Props", props);

    if (this.userEmail) {
      this.setupConnections();
    }
  }

  setupConnections = () => {
    const socketConnection = this.socket;
    const self = this;

    //Establishing the connection
    socketConnection.on("connect", function () {
      console.log("CONNECTION ESTABLISHED");

      socketConnection.emit("Join_room", {
        user_email: this.userEmail,
        chatroom: "codeial",
      });

      //here we are listening whether user join the chatroom or not
      socketConnection.on("user_joined", function (data) {
        console.log("data", data);
      });
    });

    //here we will receive the messages when user send it to
    this.socket.on("receive_message", function (data) {
      //add message to state
      const { message, typedMessage } = self.state;
      const messageObject = {};
      messageObject.content = data.message;

      if (data.user_email === self.userEmail) {
        messageObject.self = true;
      }
      self.setState({
        message: [...message, messageObject],
        typedMessage,
      });
    });
  };

  handleSubmit = () => {
    const { typedMessage } = this.state;
    if (typedMessage && this.userEmail) {
      this.socket.emit("send_message", {
        message: typedMessage,
        user_email: this.userEmail,
        chatroom: "codeial",
      });
    }
  };

  render() {
    const { message, typedMessage } = this.state;
    return (
      <div className="chat-container">
        <div className="chat-header">
          Chat
          <img
            src="https://www.iconsbd/icons/preview/white/minus-5-xxl.png"
            alt=""
            height={17}
          />
        </div>
        <div className="chat-messages">
          {message.map((message) => (
            <div
              className={
                message.self
                  ? "chat-bubble self-chat"
                  : "chat-bubble other-chat"
              }
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={typedMessage}
            onChange={(e) => this.setState({ typedMessage: e.target.value })}
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}

export default connect(mapStateToProps)(Chat);
