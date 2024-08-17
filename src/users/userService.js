const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const USERS_TABLE = process.env.USERS_TABLE;

const getUsers = async (req, res) => {
  console.log('hello from getUsers');
  const params = {
    TableName: USERS_TABLE
  };
  const result = await dynamoDb.scan(params).promise();
  res.json(result.Items);
};

const createUser = async (req, res) => {
  const { id, name } = req.body;
  const params = {
    TableName: USERS_TABLE,
    Item: { id, name }
  };
  await dynamoDb.put(params).promise();
  res.status(201).json({ message: 'User created' });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const params = {
    TableName: USERS_TABLE,
    Key: { id },
    UpdateExpression: 'set #name = :name',
    ExpressionAttributeNames: { '#name': 'name' },
    ExpressionAttributeValues: { ':name': name }
  };
  await dynamoDb.update(params).promise();
  res.json({ message: 'User updated' });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const params = {
    TableName: USERS_TABLE,
    Key: { id }
  };
  await dynamoDb.delete(params).promise();
  res.json({ message: 'User deleted' });
};

module.exports = { getUsers, createUser, updateUser, deleteUser };
