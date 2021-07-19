import './App.css';
import MAinPageComponent from "./main/index";
import { Switch, Route } from 'react-router-dom'
import UploadPage from "./upload"
import ProductPage from './product';
//라우트 컴포넌트가 중복 랜더링 될 컴포넌트를 하나만 렌더링
//path는 경로에 들어갔을 때 메인 페이지를 보여주겠다 ex 마지막에 /해주면 메인페이지
//exact는 ulr경로가 완벽히 일치할 때만 보여줌
function App() {

  return (
    <div>
      <div id="header">
        <div id="header_area">
          <img src="/images/icons/logo.png" />
        </div>
      </div>
      <div id="body">
        <Switch>
          <Route exact={true} path={"/"}>
            <MAinPageComponent />
          </Route >
          <Route exact={true} path={"/products/:id"}>
            <ProductPage />
          </Route>
          <Route exact={true} path={"/upload"}>
            <UploadPage />
          </Route>
        </Switch>
      </div>
      <div id="footer"></div>
    </div>
  )
}

export default App;
