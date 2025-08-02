export const fetchLocalData = async (dataType) => {
  try {
    const data = await import(`./${dataType}.json`);
    return data;
  } catch (error) {
    console.error(`Error fetching ${dataType} data:`, error);
    return { data: [] };
  }
};

export const getItemById = async (dataType, id) => {
  try {
    const { data } = await fetchLocalData(dataType);
    return { data: data.find((item) => item.id === parseInt(id)) };
  } catch (error) {
    console.error(`Error fetching ${dataType} item:`, error);
    return { data: null };
  }
};

export const updateItem = async (dataType, id, newData) => {
  try {
    const data = await fetchLocalData(dataType);
    const index = data.data.findIndex((item) => item.id === parseInt(id));
    if (index !== -1) {
      data.data[index] = { ...data.data[index], ...newData };
    }
    return { data: data.data[index] };
  } catch (error) {
    console.error(`Error updating ${dataType} item:`, error);
    return { data: null };
  }
};

export const createItem = async (dataType, newData) => {
  try {
    const data = await fetchLocalData(dataType);
    const newId = Math.max(...data.data.map((item) => item.id)) + 1;
    const newItem = {
      id: newId,
      ...newData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    data.data.push(newItem);
    return { data: newItem };
  } catch (error) {
    console.error(`Error creating ${dataType} item:`, error);
    return { data: null };
  }
};

export const deleteItem = async (dataType, id) => {
  try {
    const data = await fetchLocalData(dataType);
    const index = data.data.findIndex((item) => item.id === parseInt(id));
    if (index !== -1) {
      data.data.splice(index, 1);
    }
    return { success: true };
  } catch (error) {
    console.error(`Error deleting ${dataType} item:`, error);
    return { success: false };
  }
};
