import { Menu } from "antd";
import { Link } from "react-router-dom";

const AppMenu = () => {
  return (
    <>
      <Menu mode="horizontal" theme="dark"  >
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="templates">
            <Link to="/templates">Templates</Link>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default AppMenu;
