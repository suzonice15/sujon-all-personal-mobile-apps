// ML chapter: Deployment, Monitoring and Ethics.

export default {
  id: 'deploy-ethics',
  title: 'Deploy, Monitor & Ethics',
  description: 'Save models, serve predictions and watch for drift and bias',
  icon: 'cloud-upload',
  lessons: [
    {
      id: 'ml-save-serve',
      title: 'Saving and serving a model',
      blocks: [
        { type: 'text', value: 'A trained model is only useful once other software can call it. Save the whole pipeline, not only the estimator, so the preprocessing travels with the model. Then wrap it in a small web API.' },
        { type: 'code', lang: 'python', tryIt: false, value: `import joblib

# pipeline is the fitted preprocessing + model pipeline from the earlier lessons
joblib.dump(pipeline, "price_model.joblib")
model = joblib.load("price_model.joblib")` },
        { type: 'code', lang: 'python', tryIt: false, value: `from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()
model = joblib.load("price_model.joblib")

class Flat(BaseModel):
    size: float
    rooms: int
    age: float

@app.post("/predict")
def predict(flat: Flat):
    price = model.predict([[flat.size, flat.rooms, flat.age]])[0]
    return {"price": round(float(price))}` },
        { type: 'note', value: 'Validate input with a schema, as FastAPI and Pydantic do. A model given a wrong shape or a text value where it expects a number can return a confident wrong answer.' },
      ],
    },
    {
      id: 'ml-monitoring',
      title: 'Monitoring and drift',
      blocks: [
        { type: 'text', value: 'A model degrades after deployment because the world changes. Data drift means the inputs look different from training. Concept drift means the relationship between inputs and the answer changed. Track both, and retrain when the metrics drop.' },
        { type: 'list', items: [
          'Log inputs, predictions and, when they arrive later, the true outcomes',
          'Compare live feature distributions with the training data',
          'Alert when accuracy or error drops below an agreed level',
          'Keep the previous model so you can roll back quickly',
          'Version the data, the code and the model together',
        ] },
      ],
    },
    {
      id: 'ml-ethics-bias',
      title: 'Fairness and responsibility',
      blocks: [
        { type: 'text', value: 'A model learns from history, and history contains bias. A loan model trained on past approvals can repeat past discrimination. Check performance separately for each group that matters, and decide what a wrong prediction costs each person.' },
        { type: 'list', items: [
          'Measure errors per group, not only overall',
          'Ask whether a feature is a proxy for a protected attribute',
          'Explain predictions to the people they affect',
          'Have a human review for high-stakes decisions',
          'Document the data, the purpose and the known limits',
        ] },
        { type: 'note', value: 'A high accuracy can hide a model that fails badly for a minority. Always look at the breakdown before you call a model good.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'deploy-ethics',
      q: 'Why save the whole pipeline instead of only the model?',
      options: ['It is smaller', 'Preprocessing must be applied the same way at prediction time', 'It runs faster on GPUs', 'It removes labels'],
      answer: 1,
      explain: 'Without the same preprocessing, predictions are silently wrong.',
    },
    {
      chapterId: 'deploy-ethics',
      q: 'What is data drift?',
      options: ['A bug in the code', 'Live inputs look different from the training data', 'A lost file', 'A slow API'],
      answer: 1,
      explain: 'The input distribution has shifted over time.',
    },
    {
      chapterId: 'deploy-ethics',
      q: 'Why check errors per group?',
      options: ['To make charts', 'Overall accuracy can hide poor results for a minority', 'Groups are required by law everywhere', 'It speeds up training'],
      answer: 1,
      explain: 'Averages can hide unfair performance on a subgroup.',
    },
    {
      chapterId: 'deploy-ethics',
      q: 'What should you keep ready when a new model goes live?',
      options: ['Nothing', 'The previous model, so you can roll back', 'Only the test set', 'A new dataset each day'],
      answer: 1,
      explain: 'Rollback limits the damage from a bad release.',
    },
  ],
};
