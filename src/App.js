import 'antd/dist/antd.css';
// 앤티디는 줄간격이 알아서 생김 줄여줘야함
import './App.css';
import MAinPageComponent from "./main/index";
import { Link, Switch, Route, useHistory } from 'react-router-dom'
import UploadPage from "./upload"
import ProductPage from './product';
import { Button } from "antd"
import { DownloadOutlined } from '@ant-design/icons'

//라우트 컴포넌트가 중복 랜더링 될 컴포넌트를 하나만 렌더링
//path는 경로에 들어갔을 때 메인 페이지를 보여주겠다 ex 마지막에 /해주면 메인페이지
//exact는 ulr경로가 완벽히 일치할 때만 보여줌
function App() {
  const history = useHistory();
  return (
    <div>
      <div id="header">
        <div id="header_area">
          <Link to="/">
            <img src="/images/icons/logo.png" />
          </Link>
          <Link>
            <Button size="large" onClick={function () {
              // 링크 말고 다른 페이지 이동하는 기법
              //다른 경로로 이동하겠다
              history.push('/upload');
            }}
              icon={<DownloadOutlined />}
            >
              상품 업로드
            </Button>
          </Link>
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
