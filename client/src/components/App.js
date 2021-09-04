import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import { Spin } from 'antd';
import LandingPage from "./LandingPage/LandingPage.js";
import NavBar from "./NavBar/NavBar";
import UploadVideoPage from "./UploadVideoPage/UploadVideoPage";
import DetailedVideoPage from "./DetailedVideoPage/DetailedVideoPage";

const App = () => {
  return (
    <Suspense fallback={(<Spin size="large" />)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh)', backgroundColor: 'rgb(24,24,24)' }}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/video/upload" component={UploadVideoPage} />
          <Route exact path="/video/:videoId" component={DetailedVideoPage} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
