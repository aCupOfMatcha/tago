import { Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

interface BreadCrumbItems {
  path: string,
  text: string
}

const App: React.FC = () => {
  const location = useLocation();
  const [breadcrumbItems, setBreadcrumbItems] = useState<BreadCrumbItems[]>([]);

  useEffect(() => {
    const pathSnippets = location.pathname.split('/').filter((i) => i); // filter out empty items
    const items: BreadCrumbItems[] = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return {
        path: url,
        text: pathSnippets[index]
      }
    });
    setBreadcrumbItems(items);
  }, [location.pathname]);


  return (
    <Breadcrumb>
      { breadcrumbItems.map((item, index) => (
        <Breadcrumb.Item key={index}>
          { index !== breadcrumbItems.length - 1 ? <Link to={item.path}>{item.text}</Link> : item.text }
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
};

export default App;