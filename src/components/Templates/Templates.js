import { Table, Button, Space, Pagination, Spin, Affix, PageHeader, message } from "antd";
import { useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import templates from "../../services/templates/templates";
import support from "./support";

const Templates = () => {
  const [dataSource, setDataSource] = useState([]);
  const [amountTemplates, setAmountTemplates] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const defaultCurrent = 1;
  const defaultPageSize = 10;

  useEffect(() => {
    getData(defaultCurrent, defaultPageSize);
  }, []);

  const onDelete = (id) => {
    templates.deleteTemplate(id).then(() => {
      getData(defaultCurrent, defaultPageSize);
    });
  };

  const getData = (currentPage, pageSize) => {
    setIsLoading(true);
    templates
      .getAllTemplates(currentPage, pageSize)
      .then((data) => {
        switch (data.status) {
          case "success":
            setDataSource(support.formatTemplates(data.data.templates));
            setAmountTemplates(data.data.count);
            break;
          case "fail":
            setDataSource([]);
            setAmountTemplates(0);
            message.warning("failed to get templates");
            break;
          case "error":
            message.error(data.message);
            break;
        }
        setIsLoading(false);
      })
      .catch((error) => {
        message.error(error);
        setIsLoading(false);
      });
  };

  const onPaginationChange = (paginatorCurrentPage, paginatorPageSize) => {
    getData(paginatorCurrentPage, paginatorPageSize);
  };

  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Templates"
      />
      <Spin size="large" spinning={isLoading}>
        <Table dataSource={dataSource} pagination={false}>
          <Table.Column title="Name" dataIndex="name" key="name" />
          <Table.Column title="Template" dataIndex="template" key="template" ellipsis={true} />
          <Table.Column
            title="Modify"
            dataIndex="id"
            key="id"
            render={(id) => (
              <>
                <Link to={`/templates/edit/${id}`}>
                  <Button
                    style={{ margin: "2px" }}
                    type="primary"
                    key={"edit" + id}
                  >
                    <EditOutlined />
                  </Button>
                </Link>
                <Button
                  danger
                  style={{ margin: "2px" }}
                  type="primary"
                  key={"delete" + id}
                  onClick={() => onDelete(id)}
                >
                  <DeleteOutlined />
                </Button>
              </>
            )}
          />
        </Table>
        <Space
          direction="horizontal"
          style={{ width: "100%", justifyContent: "center" }}
        >
          <Pagination
            style={{
              padding: "20px",
            }}
            showSizeChanger
            total={amountTemplates}
            onChange={onPaginationChange}
          />
        </Space>
      </Spin>
      <Affix offsetBottom={20} align="right" style={{ margin: "20px" }}>
        <Link to="/templates/create/new">
          <Button
            type="primary"
            shape="circle"
            style={{ width: "60px", height: "60px" }}
          >
            <PlusOutlined />
          </Button>
        </Link>
      </Affix>
    </>
  );
};

export default Templates;
