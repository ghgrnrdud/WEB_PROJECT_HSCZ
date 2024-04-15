from fastapi import FastAPI
import uvicorn
from pydantic import BaseModel
from starlette.responses import JSONResponse

import pickle
import numpy as np
import pandas as pd

# Model 생성

class Item(BaseModel) :
    description: str

# app 개발
app = FastAPI()

with open('lsvc_tfidf_0322_ssh.pkl','rb') as tfidf :
    vectorizer = pickle.load(tfidf)

with open('label_mapping.pkl','rb') as label_mapping :
    label_mapping = pickle.load(label_mapping)

with open('lsvc_0322_ssh.pkl','rb') as lsvc :
    model_lsvc = pickle.load(lsvc)

@app.post(path="/", status_code=201)
def myhscode(item : Item) :
    description = item.description
    # 상품 설명을 벡터화
    description_vectorized = vectorizer.transform([description])
    # 두 번째 모델로 예측
    predicted_hscode = model_lsvc.predict(description_vectorized)
    result = {"predicted_hscode": predicted_hscode[0]}

    return JSONResponse(result)



if __name__ == '__main__' :
    uvicorn.run(app, host="127.0.0.1", port=8555)
