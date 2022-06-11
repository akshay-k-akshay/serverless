const Sample = require("../db/sample");
const { BadRequestError } = require("../errors");

module.exports = {
  create: async (sampleData) => {
    if (!sampleData.title) {
      throw new BadRequestError("title is empty");
    }
    return await Sample.create(sampleData);
  },

  list: async (limit, page) => {
    return await Sample.list(limit, page, { _id: 1, title: 1 });
  },

  find: async (id) => {
    return await Sample.find(id);
  },

  delete: async (id) => {
    return await Sample.delete(id);
  }
};
