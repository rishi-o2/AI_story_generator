import React from "react";
import App from "./App";
import StoryList from "./App2"
import { Routes, Route } from 'react-router-dom';

const Routing = () => {
  return (
    <Routes>
      <Route exact path="/" Component={App} />
      <Route exact path = "/StoryList" Component={StoryList}/>
    </Routes>
  );
}

export default Routing;
