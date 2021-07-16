const { nanoid } = require("nanoid");
const books = require("./books");

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

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  if (name === undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal menamahkan buku. Mohon isi nama buku",
    });

    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });

    response.code(400);
    return response;
  }

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: "error",
    message: "Buku gagal ditambahkan",
  });

  response.code(500);
  return response;
};

const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  if (name !== undefined) {
    const response = h.response({
      status: "success",
      data: {
        books: books
          .filter((book) =>
            book.name.toLowerCase().includes(name.toLowerCase())
          )
          .map((x) => ({
            id: x.id,
            name: x.name,
            publisher: x.publisher,
          })),
      },
    });

    response.code(200);
    return response;
  }

  if (reading == 0) {
    const response = h.response({
      status: "success",
      data: {
        books: books
          .filter((book) => book.reading === false)
          .map((x) => ({
            id: x.id,
            name: x.name,
            publisher: x.publisher,
          })),
      },
    });

    response.code(200);
    return response;
  } else if (reading == 1) {
    const response = h.response({
      status: "success",
      data: {
        books: books
          .filter((book) => book.reading === true)
          .map((x) => ({
            id: x.id,
            name: x.name,
            publisher: x.publisher,
          })),
      },
    });

    response.code(200);
    return response;
  } else if (reading == 1 || reading == 0) {
    const response = h.response({
      status: "success",
      data: {
        books: books
          .filter((book) => book.reading === true && book.reading === false)
          .map((x) => ({
            id: x.id,
            name: x.name,
            publisher: x.publisher,
          })),
      },
    });

    response.code(200);
    return response;
  }

  if (finished == 0) {
    const response = h.response({
      status: "success",
      data: {
        books: books
          .filter((book) => book.finished === false)
          .map((x) => ({
            id: x.id,
            name: x.name,
            publisher: x.publisher,
          })),
      },
    });

    response.code(200);
    return response;
  } else if (finished == 1) {
    const response = h.response({
      status: "success",
      data: {
        books: books
          .filter((book) => book.finished === true)
          .map((x) => ({
            id: x.id,
            name: x.name,
            publisher: x.publisher,
          })),
      },
    });

    response.code(200);
    return response;
  } else if (finished == 1 || finished == 0) {
    const response = h.response({
      status: "success",
      data: {
        books: books
          .filter((book) => book.finished === true && book.finished === false)
          .map((x) => ({
            id: x.id,
            name: x.name,
            publisher: x.publisher,
          })),
      },
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: "success",
    data: {
      books: books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });

  response.code(200);
  return response;
};

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    return {
      status: "success",
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });

  response.code(404);
  return response;
};

module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler };
