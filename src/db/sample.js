
const fs = require("fs");
const path = require("path");

module.exports = {
  create: async (sampleData) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "../../resources/db.json")));
    sampleData.id = data.length + 1;
    data.push(sampleData);
    fs.writeFileSync(path.join(__dirname, "../../resources/db.json"), JSON.stringify(data));
    return sampleData;
  },

  list: async (limit, skip) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "../../resources/db.json")));
    return {
      data: data.slice(skip, skip + limit),
      meta: {
        total: data.length,
        limit
      }
    };
  },

  find: async (id) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "../../resources/db.json")));
    return data.find((sample) => sample.id === id);
  },

  delete: async (id) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "../../resources/db.json")));
    const index = data.findIndex((sample) => sample.id === id);
    data.splice(index, 1);
    fs.writeFileSync(path.join(__dirname, "../../resources/db.json"), JSON.stringify(data));
  }
};

