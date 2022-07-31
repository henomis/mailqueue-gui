import axios from "axios";
const baseUrl = "http://localhost:8080/api/v1/templates";

const getAllTemplates = async (currentPage, pageSize) => {
  const { limit, skip } = formatLimitSkip(currentPage, pageSize);
  const request = axios.get(`${baseUrl}?limit=${limit}&skip=${skip}`);
  const response = await request;
  return response.data;
};

const getTemplate = async (id) => {
    const request = axios.get(`${baseUrl}/${id}`);
    const response = await request;
    return response.data;
}


const createTemplate = async (template) => {
  const request = axios.post(baseUrl, template);
  const response = await request;
  return response.data;
};

const updateTemplate = async (id, template) => {
  const request = axios.put(`${baseUrl}/${id}`, template);
  const response = await request;
  return response.data;
};

const deleteTemplate = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  const response = await request;
  return response.data;
};

const formatLimitSkip = (currentPage, pageSize) => {
  const limit = pageSize;
  const skip = (currentPage - 1) * pageSize;
  return { limit, skip };
};

export default {
  getAllTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
};
