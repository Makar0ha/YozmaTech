const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
require('dotenv').config()

const app = express();
app.use(bodyParser.json());

AWS.config.update({
    region: process.env.REGION,
    endpoint: process.env.ENDPOINT,
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET
});

const docClient = new AWS.DynamoDB.DocumentClient();
const dynamodb = new AWS.DynamoDB();

const tableName = "Reports";

dynamodb.listTables((err, data) => {
    if (err) {
        console.error("Error listing tables:", err);
    } else {
        if (data.TableNames.includes(tableName)) {
            console.log("Table already exists:", tableName);
        } else {
            const params = {
                TableName: tableName,
                KeySchema: [
                    { AttributeName: "id", KeyType: "HASH" }
                ],
                AttributeDefinitions: [
                    { AttributeName: "id", AttributeType: "S" }
                ],
                ProvisionedThroughput: {
                    ReadCapacityUnits: 999,
                    WriteCapacityUnits: 999
                }
            };

            dynamodb.createTable(params, (err, data) => {
                if (err) {
                    console.error("Error creating table:", err);
                } else {
                    console.log("Table created:", data);
                }
            });
        }
    }
});

app.get("/report/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const params = {
            TableName: "Reports",
            Key: {
                id: id,
            },
        };
        const result = await docClient.get(params).promise();

        if (!result.Item) {
            return res.status(404).json({ message: "Report not found" });
        }

        res.status(200).json(result.Item);
    } catch (error) {
        console.error("Error fetching report:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.put('/report', (req, res) => {
    const { data } = req.body;
    const params = {
        TableName: 'Reports',
        Item: data
    };

    docClient.put(params, (err, data) => {
        if (err) {
            console.error('Error saving report:', err);
            res.status(500).json({ error: 'Error saving report' });
        } else {
            console.log('Report saved successfully');
            res.status(200).json({ message: 'Report saved successfully' });
        }
    });
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});