import { useParams, useNavigate, Link } from "react-router-dom";
import { Input, Button, PageHeader, Descriptions, message } from "antd";
import { useState, useEffect } from "react";
import templates from "../../services/templates/templates";

const EditTemplate = (props) => {
  const isEditMode = props.isEditMode;

  const { TextArea } = Input;
  const navigate = useNavigate();
  const params = useParams();
  const [templateData, setTemplateData] = useState("");
  const [templateName, setTemplateName] = useState("");

  useEffect(() => {
    if (isEditMode) {
      fetchTemplate();
    }
  }, []);

  const fetchTemplate = () => {
    templates
      .getTemplate(params.id)
      .then((data) => {
        switch (data.status) {
          case "success":
            setTemplateData(data.data.template);
            setTemplateName(data.data.name);
            break;
          case "fail":
            message.warning("failed to get template");
            break;
          case "error":
            message.error(data.message);
            break;
        }
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const onSave = () => {
    isEditMode
      ? templates
          .updateTemplate(params.id, {
            template: templateData,
            name: templateName,
          })
          .then((data) => {
            switch (data.status) {
              case "success":
                navigate("/templates");
                break;
              case "fail":
                message.warning("failed to update template");
                break;
              case "error":
                message.error(data.message);
                break;
            }
          })
          .catch((error) => {
            message.error(error);
          })
      : templates
          .createTemplate({ template: templateData, name: templateName })
          .then((data) => {
            switch (data.status) {
              case "success":
                navigate("/templates");
                break;
              case "fail":
                message.warning("failed to create template");
                break;
              case "error":
                message.error(data.message);
                break;
            }
          })
          .catch((error) => {
            message.error(error);
          });
  };

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate("/templates")}
        title={isEditMode ? "Edit Template" : "Create Template"}
      />
      <Descriptions column={1} layout={"vertical"}>
        <Descriptions.Item label="Name">
          <Input
            type={"text"}
            placeholder="Name"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Template">
          <TextArea
            autoSize={{ minRows: 10, maxRows: 20 }}
            value={templateData}
            onChange={(e) => setTemplateData(e.target.value)}
          />
        </Descriptions.Item>
      </Descriptions>
      <div align="right">
        <Link to="/templates">
          <Button style={{ margin: "5px" }}>Cancel</Button>
        </Link>
        <Button type="primary" style={{ margin: "5px" }} onClick={onSave}>
          Save
        </Button>
      </div>
    </>
  );
};

export default EditTemplate;
