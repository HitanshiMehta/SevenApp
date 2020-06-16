import React from "react";

import UserInputButton from "./UserInpuButton";
import { common } from "../../../Common/AppConfig.jsx";

class UserChoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: 0
    };
    // ref will refer to span of userinputbutton
    // (to change background color on selection)
    // forwrding ref
    this.sevenDownRef = React.createRef();
    this.sevenRef = React.createRef();
    this.sevenUpRef = React.createRef();
  }
  handleUserInput = (userInput) => {
    this.setState(
      {
        userInput,
      },
      () => {
        // passing user choice to parent component(Home)
        this.props.onUserChoice(this.state.userInput);
      }
    );
  };
  render() {
    return (
      <>
        {/* passing ref of other span to change backround color(to original)
        on selection of current component(span) */}
        {/* indicator 6 = 7 down  */}
        <UserInputButton
          text={common.sevenDown}
          onUserInput={this.handleUserInput}
          indicator={6}
          currentRef={this.sevenDownRef}
          sevenRef={this.sevenRef}
          sevenUpRef={this.sevenUpRef}
          price={this.props.sevenDownPrice}
        />
        {/* indicator 7 = 7 */}
        <UserInputButton
          text={common.seven}
          onUserInput={this.handleUserInput}
          indicator={7}
          currentRef={this.sevenRef}
          sevenDownRef={this.sevenDownRef}
          sevenUpRef={this.sevenUpRef}
          price={this.props.sevenPrice}
        />
        {/* indicator 8 = 7 up */}
        <UserInputButton
          text={common.sevenUp}
          onUserInput={this.handleUserInput}
          indicator={8}
          currentRef={this.sevenUpRef}
          sevenRef={this.sevenRef}
          sevenDownRef={this.sevenDownRef}
          price={this.props.sevenUpPrice}
        />
      </>
    );
  }
}
export default UserChoice;
