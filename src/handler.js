const { nanoid } = require("nanoid");

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const finished = readPage === pageCount ? true : false;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
};

module.exports = { addBookHandler };
