import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import imgSmall from "images/testSmall.png"; // start-path is 'images' because we have an alias 'images' in webpack.common.js
import imgCamera from "images/camera.svg";
import { Component, StrictMode } from "react";
import ReactDom from "react-dom";
import { WUPFormElement, WUPTextControl } from "web-ui-pack";
import style from "./styles/main.module.css";
import someTypeScript from "./someTypeScript";

!(WUPFormElement && WUPTextControl) && console.warn("err");

interface AppProps {
  nothing: boolean;
}

interface AppState {
  title: string;
}

class AppContainer extends Component<AppProps, AppState> {
  // ["constructor"]: typeof AppContainer;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      title: someTypeScript("Test-block for css-modules"),
    };
    // test class-dead-code
    const goExlcude = true;
    if (!goExlcude) {
      console.warn("class-dead-code doesn't work", props.nothing);
    }
  }

  render() {
    return (
      <StrictMode>
        <div className="test-block">
          <h2 className={style.mainTitle}>{this.state.title}</h2>
        </div>
        <div className={["test-block", style.background].join(" ")}>
          <h2>Test-block for assets-module (previous url-loader)</h2>
          <img src={imgSmall} alt="smallImage" />
        </div>
        {/*  or it can be
          <img src='/src/images/testSmall.png' alt="smallImage"></img>
        */}
        <div className={["test-block", style.svgBackground].join(" ")}>
          <h2>Test-block for assets-module (svg-url-loader)</h2>
          <img src={imgCamera} alt="small_SVG_Image" />
        </div>

        <wup-form class={style.form}>
          <wup-text name="TextControl" />
          <button type="submit">Submit</button>
        </wup-form>
      </StrictMode>
    );
  }
}

ReactDom.render(<AppContainer nothing={false} />, document.getElementById("app"));
