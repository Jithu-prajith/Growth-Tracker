// Data Science Roadmap for Shri Prajith S
// Structured exactly like the Striver SDE Sheet curriculum
// 70% Phase Lock progression, beginner-friendly estimates, high quality resources.

export const DS_ROADMAP_PHASES = [
  {
    id: 'ds-phase-1',
    phaseNumber: 1,
    title: 'Phase 1: Python for Data Science',
    subtitle: 'Month 1–2: NumPy, pandas, Data Visualization & Wrangling',
    unlockRequirement: null, // Always unlocked
    modules: [
      {
        id: 'ds-p1-m1',
        name: 'Python Foundations & Scientific Libraries',
        resource: 'CS50P + Kaggle Micro-courses (free)',
        resourceUrl: 'https://www.kaggle.com/learn/python',
        topics: [
          { id: 'ds-p1-t1', name: 'Python basics: variables, loops, functions', estTime: '3 hrs', estHours: 3, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p1-t2', name: 'Lists, dicts, sets & data structures', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p1-t3', name: 'File handling (CSV, JSON, text files)', estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p1-t4', name: 'NumPy arrays, vectorization, operations & indexing', estTime: '3 hrs', estHours: 3, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p1-t5', name: 'pandas DataFrames, read_csv, filtering & groupby', estTime: '4 hrs', estHours: 4, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p1-t6', name: 'Matplotlib & Seaborn charts, distributions & heatmaps', estTime: '3 hrs', estHours: 3, completed: false, loggedHours: 0, notes: '' },
        ]
      }
    ]
  },
  {
    id: 'ds-phase-2',
    phaseNumber: 2,
    title: 'Phase 2: Statistics & Math for ML',
    subtitle: 'Month 2–3: Probability, Distributions, Hypothesis Testing & Linear Algebra',
    unlockRequirement: { phaseId: 'ds-phase-1', threshold: 70, description: 'Complete 70% of Phase 1 to unlock' },
    modules: [
      {
        id: 'ds-p2-m1',
        name: 'Statistical Inference & Linear Algebra',
        resource: '3Blue1Brown (YouTube) + StatQuest',
        resourceUrl: 'https://www.youtube.com/@3blue1brown',
        topics: [
          { id: 'ds-p2-t1', name: 'Descriptive statistics (mean, median, IQR, variance, std dev)', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p2-t2', name: 'Probability basics (conditional probability, Bayes theorem)', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p2-t3', name: 'Normal distribution & Central Limit Theorem (CLT)', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p2-t4', name: 'Hypothesis testing, p-values, z-test & t-test', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p2-t5', name: 'Correlation & covariance (Pearson & Spearman)', estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p2-t6', name: 'Linear algebra: vectors, matrices, dot products & eigenvalues', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
        ]
      }
    ]
  },
  {
    id: 'ds-phase-3',
    phaseNumber: 3,
    title: 'Phase 3: Data Cleaning & Exploratory Data Analysis (EDA)',
    subtitle: 'Month 3–4: Real Datasets, Outliers, Feature Engineering',
    unlockRequirement: { phaseId: 'ds-phase-2', threshold: 70, description: 'Complete 70% of Phase 2 to unlock' },
    modules: [
      {
        id: 'ds-p3-m1',
        name: 'Data Preprocessing & Visual Exploration',
        resource: 'Kaggle Datasets & Notebooks',
        resourceUrl: 'https://www.kaggle.com/datasets',
        topics: [
          { id: 'ds-p3-t1', name: 'Handling missing values (imputation strategies)', estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p3-t2', name: 'Outlier detection & removal (IQR, Z-score methods)', estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p3-t3', name: 'Feature engineering basics (encoding, scaling, transformations)', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p3-t4', name: 'EDA on real-world datasets (Titanic, Housing prices)', estTime: '4 hrs', estHours: 4, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p3-t5', name: 'Visual storytelling & report building for EDA', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
        ]
      }
    ]
  },
  {
    id: 'ds-phase-4',
    phaseNumber: 4,
    title: 'Phase 4: Machine Learning Core',
    subtitle: 'Month 4–5: Supervised & Unsupervised Learning with scikit-learn',
    unlockRequirement: { phaseId: 'ds-phase-3', threshold: 70, description: 'Complete 70% of Phase 3 to unlock' },
    modules: [
      {
        id: 'ds-p4-m1',
        name: 'Algorithms & Model Evaluation',
        resource: 'Krish Naik (YouTube) + scikit-learn official docs',
        resourceUrl: 'https://scikit-learn.org/stable/',
        topics: [
          { id: 'ds-p4-t1', name: 'What is Machine Learning & supervised vs unsupervised paradigm', estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p4-t2', name: 'Linear Regression & Cost Function optimization', estTime: '3 hrs', estHours: 3, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p4-t3', name: 'Logistic Regression & Sigmoid classification', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p4-t4', name: 'Decision Trees & Information Gain (Gini, Entropy)', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p4-t5', name: 'Random Forest & Bagging ensemble concepts', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p4-t6', name: 'Support Vector Machines (SVM) & Kernel tricks', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p4-t7', name: 'K-Nearest Neighbors (KNN)', estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p4-t8', name: 'K-Means Clustering & Elbow method', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p4-t9', name: 'Model evaluation metrics (Accuracy, Precision, Recall, F1, ROC-AUC)', estTime: '3 hrs', estHours: 3, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p4-t10', name: 'Cross-validation & Hyperparameter tuning (GridSearchCV, RandomizedSearch)', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p4-t11', name: 'scikit-learn full end-to-end pipeline workflow', estTime: '3 hrs', estHours: 3, completed: false, loggedHours: 0, notes: '' },
        ]
      }
    ]
  },
  {
    id: 'ds-phase-5',
    phaseNumber: 5,
    title: 'Phase 5: Advanced Machine Learning',
    subtitle: 'Month 5–6: Boosting, Dimension Reduction & Production Pipelines',
    unlockRequirement: { phaseId: 'ds-phase-4', threshold: 70, description: 'Complete 70% of Phase 4 to unlock' },
    modules: [
      {
        id: 'ds-p5-m1',
        name: 'Gradient Boosting & Feature Engineering',
        resource: 'CampusX (YouTube, free)',
        resourceUrl: 'https://www.youtube.com/@CampusX-official',
        topics: [
          { id: 'ds-p5-t1', name: 'XGBoost, LightGBM & Gradient Boosting Ensemble methods', estTime: '4 hrs', estHours: 4, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p5-t2', name: 'Principal Component Analysis (PCA) dimensionality reduction', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p5-t3', name: 'scikit-learn ColumnTransformer & Pipelines', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p5-t4', name: 'Feature selection techniques (RFE, variance threshold, mutual info)', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p5-t5', name: 'Handling imbalanced datasets (SMOTE, class weighting)', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
        ]
      }
    ]
  },
  {
    id: 'ds-phase-6',
    phaseNumber: 6,
    title: 'Phase 6: Deep Learning Basics',
    subtitle: 'Month 6–7: Neural Networks, PyTorch/TensorFlow, CNNs & NLP',
    unlockRequirement: { phaseId: 'ds-phase-5', threshold: 70, description: 'Complete 70% of Phase 5 to unlock' },
    modules: [
      {
        id: 'ds-p6-m1',
        name: 'Deep Learning Architectures & Representations',
        resource: 'Andrew Ng Deep Learning Specialization (Coursera, audit free)',
        resourceUrl: 'https://www.coursera.org/specializations/deep-learning',
        topics: [
          { id: 'ds-p6-t1', name: 'Neural networks, perceptron & activation functions (ReLU, Sigmoid, Softmax)', estTime: '3 hrs', estHours: 3, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p6-t2', name: 'Forward propagation, loss computation & backpropagation calculus', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p6-t3', name: 'TensorFlow / Keras practical introduction & training loop', estTime: '3 hrs', estHours: 3, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p6-t4', name: 'Convolutional Neural Networks (CNNs) basics for computer vision', estTime: '3 hrs', estHours: 3, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p6-t5', name: 'NLP basics: tokenization, TF-IDF, Word2Vec & word embeddings', estTime: '3 hrs', estHours: 3, completed: false, loggedHours: 0, notes: '' },
        ]
      }
    ]
  },
  {
    id: 'ds-phase-7',
    phaseNumber: 7,
    title: 'Phase 7: Projects & Production Deployment',
    subtitle: 'Month 7–8: End-to-End Kaggle Capstones, Streamlit & Hugging Face',
    unlockRequirement: { phaseId: 'ds-phase-6', threshold: 70, description: 'Complete 70% of Phase 6 to unlock' },
    modules: [
      {
        id: 'ds-p7-m1',
        name: 'Deployment & Portfolio Production',
        resource: 'Kaggle + GitHub + Streamlit Cloud',
        resourceUrl: 'https://streamlit.io',
        topics: [
          { id: 'ds-p7-t1', name: 'End-to-end Machine Learning project on Kaggle with gold-standard EDA', estTime: '8 hrs', estHours: 8, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p7-t2', name: 'Streamlit interactive web app creation & local testing', estTime: '3 hrs', estHours: 3, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p7-t3', name: 'Hugging Face Spaces & Streamlit Cloud deployment', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p7-t4', name: 'Data Science GitHub portfolio structuring with clean READMEs', estTime: '3 hrs', estHours: 3, completed: false, loggedHours: 0, notes: '' },
          { id: 'ds-p7-t5', name: 'Kaggle competitions participation & model ensembling', estTime: '5 hrs', estHours: 5, completed: false, loggedHours: 0, notes: '' },
        ]
      }
    ]
  }
];
