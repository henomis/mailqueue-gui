const formatTemplates = (data) => {
  const items = data.map((item) => {
    return {
      ...item,
      key: item.id,
    };
  });

  return items;
};



export default {formatTemplates};
