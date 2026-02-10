const { Document } = require('../models/db');
const moment = require('moment');

// Create and Save a new Document
const create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.user_id || !req.body.file_name || !req.body.data || !req.body.file_path) {
      return res.status(400).send({
        message: "Content can not be empty! Required fields: user_id, file_name, data, file_path"
      });
    }
 
    // Create a Document
    const document = {
      user_id: req.body.user_id,
      file_name: req.body.file_name,
      file_path: req.body.file_path,
      data: Buffer.from(req.body.data, 'base64'), // decode base64 to binary data for storage
      mimeType: req.body.mimeType,
      upload_date: moment().format('YYYY-MM-DD HH:mm:ss') // Use moment to format the current date and time
    };

    // Save Document in the database
    const savedDocument = await Document.create(document);
    res.status(201).send(savedDocument);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Document."
    });
  }
};

// Retrieve all Documents from the database.
const findAll = async (req, res) => {
  const validSortOrders = ["document_id", "file_name", "mimeType", "upload_date"];
  const sortOrder = req.query.sortOrder ? req.query.sortOrder : "document_id"; // sort by id if no sort order provided

  if (!validSortOrders.includes(sortOrder)) {
    return res.status(400).send({
      message: "Invalid sort order value"
    });
  }

  try {
    const documents = await Document.findAll({
      attributes: { exclude: ['data'] }, // Exclude the 'data' field which contains the BLOB
      order: [[sortOrder, 'ASC']]
    });

    // Format the upload_date for each document
    const formattedDocuments = documents.map(doc => ({
      ...doc.toJSON(),
      upload_date: moment(doc.upload_date).format('YYYY-MM-DD HH:mm:ss')
    }));

    res.status(200).send(formattedDocuments);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving documents."
    });
  }
};

// Find a single Document with an id
const findOne = async (req, res) => {
  const id = req.params.id;


  try {
    const document = await Document.findByPk(id, {
      attributes: { exclude: ['data'] } // Exclude the 'data' field which contains the BLOB
    });

    if (!document) {
      return res.status(404).send({
        message: `Document not found with id ${id}.`
      });
    }

    // Format the upload_date
    const formattedDocument = {
      ...document.toJSON(),
      upload_date: moment(document.upload_date).format('YYYY-MM-DD HH:mm:ss')
    };

    res.status(200).send(formattedDocument);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Document with id " + id
    });
  }
};


module.exports = {
  create,
  findAll,
  findOne,
};