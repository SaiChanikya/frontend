import { useHistory } from "react-router-dom";
import { UserOutlined, HomeOutlined } from '@ant-design/icons';

import '../Layout/Layout.css';

import ApiUrls from '../../ApiUrls';
import ApiService from "../../Api.Service";
import { Input, Layout, Menu } from "antd";

const { Header } = Layout;

export const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    window.location.replace(window.location.origin)
};

export const menuItems = (user: any, history: any) => [
    {
        label: user?.firstName,
        key: 'SubMenu',
        icon: <UserOutlined style={{ fontSize: "15px" }} />,
        children: [
            {
                label: <p onClick={() => history.push("/profile")} style={{ fontWeight: 600, fontSize: 'medium', }}>
                    Profile
                </p>,
                key: 'name',
            },
            {
                label: "Logout",
                key: 'logout',
                style: { marginTop: '-16px',  },
                onClick: () => { logout() }
            }
        ],
    }];

function AppMainHeader(props: any) {
    const history = useHistory();
    console.log(props.user)

    return (
        <Header className={"header"}>
            <div style={{ "fontSize": "30px", fontWeight: "600" }}>
                <HomeOutlined onClick={() => history.push("/home")} />&nbsp;
                Travel Advisor
            </div>

            <Menu className="border-bottom-0" theme="light" mode="horizontal"
                items={[]}
            />

            <Menu className="border-bottom-0" theme="light" id="logout-menu" mode="horizontal" items={menuItems(props.user, history)} />
        </Header>
    );
}

export default AppMainHeader;
