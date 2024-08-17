const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE;

const getProducts = async (req, res) => {
  const params = {
    TableName: PRODUCTS_TABLE
  };
  const result = await dynamoDb.scan(params).promise();
  res.json(result.Items);
};

const createProduct = async (req, res) => {
  const { id, name, price } = req.body;
  const params = {
    TableName: PRODUCTS_TABLE,
    Item: { id, name, price }
  };

  console.log(id, name, price);
  await dynamoDb.put(params).promise();
  res.status(201).json({ message: 'Product created' });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const params = {
    TableName: PRODUCTS_TABLE,
    Key: { id },
    UpdateExpression: 'set #name = :name, #price = :price',
    ExpressionAttributeNames: {
      '#name': 'name',
      '#price': 'price'
    },
    ExpressionAttributeValues: {
      ':name': name,
      ':price': price
    }
  };
  await dynamoDb.update(params).promise();
  res.json({ message: 'Product updated' });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const params = {
    TableName: PRODUCTS_TABLE,
    Key: { id }
  };
  await dynamoDb.delete(params).promise();
  res.json({ message: 'Product deleted' });
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
