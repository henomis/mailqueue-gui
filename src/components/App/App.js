import "antd/dist/antd.css";
import AppMenu from "../AppMenu/AppMenu";
import Templates from "../Templates/Templates";
import EditTemplate from "../Templates/EditTemplate";
import Home from "../Home/Home";
import { Layout } from "antd";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function App() {
  const padding = {
    padding: 5,
  };

  const { Header, Content, Footer } = Layout;

  return (
    <Router>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <AppMenu />
        </Header>
        <Content
          style={{
            padding: "50px",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/templates/edit/:id" element={<EditTemplate isEditMode={true}/>} />
            <Route path="/templates/create/new" element={<EditTemplate isEditMode={false}/>} />
          </Routes>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
