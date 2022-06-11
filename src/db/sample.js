const { Sample } = require("../models/sample");

module.exports = {
  create: async (sampleData) => {
    const sample = new Sample({
      title: sampleData.title
    });

    return await sample.save();
  },

  list: async (limit, page, projection) => {
    let results = await Sample.aggregate([
      { $match: {} },
      { $project: projection },
      {
        $facet: {
          data: [{ $skip: limit * (page - 1) }, { $limit: limit }],
          pagination: [{ $count: "total" }]
        }
      }
    ]);
    results = results[0];

    return {
      data: results.data,
      meta: {
        total: results.pagination[0].total,
        limit,
        page
      }
    };
  },

  find: async (id) => {
    return await Sample.findOne({ _id: id });
  },

  delete: async (id) => {
    return await Sample.deleteOne({ _id: id });
  }
};
