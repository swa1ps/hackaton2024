import { Layout } from "antd";
import { StyleProvider } from "antd-style";
import { Content } from "antd/es/layout/layout";
import "antd/dist/reset.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DetailPage from "./DetailPage";
import List from "./List";
const router = createBrowserRouter([
  {
    path: "/",
    element: <List />,
  },
  {
    path: "/videos/:id",
    element: <DetailPage />,
  },
]);
const App = () => {
  return (
    <StyleProvider>
      <Layout>
        <Content style={{ padding: 20, minHeight: "100vh" }}>
          <RouterProvider router={router} />
        </Content>
      </Layout>
    </StyleProvider>
  );
};

export default App;
