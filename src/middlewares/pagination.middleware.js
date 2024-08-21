const getPaginated = (model) => {
    return async (req, res, next) => {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
  
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
  
      const results = {};
  
      try {
        const totalDocuments = await model.countDocuments();
  
        if (endIndex < totalDocuments) {
          results.next = {
            page: page + 1,
            limit: limit,
          };
        }
  
        if (startIndex > 0) {
          results.previous = {
            page: page - 1,
            limit: limit,
          };
        }
  
        results.total = totalDocuments;
        results.current = page;
        results.pages = Math.ceil(totalDocuments / limit);
  
        results.results = await model.find().limit(limit).skip(startIndex);
        res.paginated = results;
  
        next();
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
  };
  
  export { getPaginated };
  