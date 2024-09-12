from matplotlib import pyplot as plt, rcParams
import base64
import io
import os
import pandas as pd
import numpy as np
import matplotlib
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import  confusion_matrix


matplotlib.use('Agg')


def display_results(operation_type, y_test=None, y_pred=None, model=None, features=None, df=None):
    if operation_type.upper() == "PREDICTION":
        plt.figure(figsize=(10, 6))
        plt.scatter(y_test, y_pred)
        plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()])
        plt.xlabel('Measured')
        plt.ylabel('Predicted')
        plt.title('Actual vs Predicted Values')
    elif operation_type.upper() == "CLASSIFICATION":
        cm = confusion_matrix(y_test, y_pred)
        sns.heatmap(cm, cmap='Blues')
        plt.xlabel('Predicted')
        plt.ylabel('Actual')
        plt.title('Confusion Matrix')
    elif operation_type.upper() == "CLUSTERING":
        if len(features) >= 2:
            plt.figure(figsize=(10, 6))
            sns.scatterplot(data=pd.DataFrame(df), x=features[0], y=features[1], hue='Class', palette='viridis')
            plt.scatter(model.cluster_centers_[:, 0], model.cluster_centers_[:, 1],c='red', label='Centroids')
            plt.title('Clustering Results')
            plt.legend(title="Cluster")

    buffer = io.BytesIO()
    plt.savefig(buffer, format='png')
    url = os.path.join(os.path.dirname(__file__), f"../graph/graph_.png")
    plt.savefig(url, format='png')
    buffer.seek(0)
    plot_data = base64.b64encode(buffer.getvalue()).decode('utf-8')
    plt.close()
    return plot_data