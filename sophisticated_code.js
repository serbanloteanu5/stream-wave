/* 
   filename: sophisticated_code.js
   content: This code performs a deep learning neural network training using the MNIST dataset.
*/

// Import required libraries
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

// Define model architecture
const model = tf.sequential();
model.add(tf.layers.conv2d({ filters: 32, kernelSize: 3, activation: 'relu', inputShape: [28, 28, 1] }));
model.add(tf.layers.maxPooling2d({ poolSize: 2 }));
model.add(tf.layers.flatten());
model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
model.add(tf.layers.dense({ units: 10, activation: 'softmax' }));

// Load training and testing data
const trainData = JSON.parse(fs.readFileSync('trainData.json'));
const testData = JSON.parse(fs.readFileSync('testData.json'));

// Preprocess data
const trainImages = tf.tensor(trainData.images);
const trainLabels = tf.tensor(trainData.labels);
const testImages = tf.tensor(testData.images);
const testLabels = tf.tensor(testData.labels);

// Compile model
model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['accuracy'] });

// Train model
const batchSize = 64;
const epochs = 10;
const history = await model.fit(trainImages, trainLabels, { batchSize, epochs });

// Evaluate model
const evaluation = await model.evaluate(testImages, testLabels);
console.log(`Test Loss: ${evaluation[0]}, Test Accuracy: ${evaluation[1]}`);

// Save trained model
const savePath = 'trained_model/model.json';
await model.save(savePath);
console.log(`Model saved at: ${savePath}`);

// Perform inference
const sampleImage = tf.tensor(testData.images[0]);
const prediction = model.predict(sampleImage.reshape([1, 28, 28, 1])).argMax(1).dataSync();
console.log(`Prediction for sample image: ${prediction}`);

// Clean up
trainImages.dispose();
trainLabels.dispose();
testImages.dispose();
testLabels.dispose();
sampleImage.dispose();