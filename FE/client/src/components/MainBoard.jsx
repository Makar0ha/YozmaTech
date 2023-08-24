import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, Image, Spin, Empty } from 'antd';
import {
    TableOutlined,
    PieChartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import Dashboard from "./Dashboard/Dashboard";
import ReportsTable from "./ReportsTable";
import Profile from "./Profile";
import { getAllReports } from "../common/client";
import { errorNotification } from "../common/nottification";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, onClick, children) {
    return {
        key,
        icon,
        children,
        label,
        onClick
    };
}

const MainBoard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [choice, setChoice] = useState(1);
    const [reports, setReports] = useState([]);
    const navigate = useNavigate();

    const fetchReports = () =>
        getAllReports()
            .then(res => res.json())
            .then(data => {
                setReports(data);
            })
            .catch(err => {
                    errorNotification("There was an issue", `${err.message} [${err.status}] [${err}]`);
            })
            .finally(() => {
                setFetching(false);
            });

    useEffect(() => {
         fetchReports();

    }, [])

    const items = [
        getItem('Dashboard', '1', <PieChartOutlined />, () => handleDashboardClick(1, '/dashboard')),
        getItem('Table', '2', <TableOutlined />, () => handleDashboardClick(2, '/table')),
        getItem('User', '3', <UserOutlined />, () => handleDashboardClick(3, '/profile')),

    ];
    const handleDashboardClick = (chosen, path) => {
        setChoice(chosen);
        navigate(path);
    };

    const renderReports = () => {
        if (fetching) {
            return <Spin size="large" />
        }
        if (reports.length <= 0) {
            return <>
                <Empty />
            </>
        }
        return <>
            {choice === 1 && <Dashboard reports={reports}/>}
            {choice === 2 && <ReportsTable reports={reports} />}
            {choice === 3 && <Profile />}
        </>
    }

    return <Layout
        style={{
            minHeight: '100vh',
        }}
    >
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
        <Layout className="site-layout">
            <Header
                className="site-layout-background"
                style={{
                    padding: 0,
                }}
            />
            <Content
                style={{
                    margin: '0 16px',
                }}
            >

                <div
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        minHeight: 360,
                    }}
                >
                    {renderReports()}
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                <Image
                    width={75}
                    src="https://user-images.githubusercontent.com/77810752/205652652-d1239b3b-75b3-4b8f-8656-b20765b3e9f9.png"
                />
                <div>Makar0ha </div>
            </Footer>
        </Layout>
    </Layout>
}

export default MainBoard;
